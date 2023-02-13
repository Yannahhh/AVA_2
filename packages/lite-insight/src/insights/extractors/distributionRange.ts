import { Datum, Measure, DistributionRangeInfo } from '../../interface';

import _sortBy from 'lodash/sortBy';
import { ascending } from '../../algorithms/base/compare';
import { statistics } from '@antv/data-wizard';
import { IQR, getQuartilePercentValue } from '../../algorithms';
import { SignificanceBenchmark } from '../../constant';
import { calculatePValue } from '../util';

export const findDistributionRange = (values: number): number[] => {
    var sorted = values.slice().sort(ascending);
    var q25 = getQuartilePercentValue(sorted, 0.25);
    var q75 = getQuartilePercentValue(sorted, 0.75);
    var results = [sorted[0], q25, q75, sorted[sorted.length-1]]
    return results;
};

export const extractor = (data: Datum[], dimensions: string[], measures: Measure[]): DistributionRangeInfo => {
    var dimension = dimensions[0];
    var measure = measures[0].field;
    if (!data || data.length === 0)
        return [];
    var values = data.map(function (item) { return item === null || item === void 0 ? void 0 : item[measure]; });
    if (statistics.distinct(values) === 1)
        return [];
    var distributionRange = findDistributionRange(values).map(function (item) {
        // var index = item.index, significance = item.significance;
        // console.log('item', item)
        significance = 1 - (item[2]-item[1])/(item[3]-item[0])
        return {
            type: 'distributionRange',
            dimension: dimension,
            measure: measure,
            significance: significance,
            min: item[0],
            q25: item[1],
            q75: item[2],
            max: item[3]
        };
    });
    return distributionRange;
};