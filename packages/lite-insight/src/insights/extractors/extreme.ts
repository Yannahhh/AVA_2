import { PointPatternInfo, Language, ExtremeInfo } from '../../interface';

import _sortBy from 'lodash/sortBy';
import { statistics } from '@antv/data-wizard';
import { IQR } from '../../algorithms';
import { SignificanceBenchmark } from '../../letant';
import { calculatePValue } from '../util';


type ExtremeItem = {
  index: number;
  significance: number;
  value: number;
};

export const findExtreme =  (values:number []): ExtremeItem[] => {
    let minValue = Infinity
    let maxValue = -1 * Infinity
    let minIndex = 0
    let maxIndex = 0
    for (let i = 0; i < (values === null || values === void 0 ? void 0 : values.length); i += 1) {
        if (values[i] > maxValue) {
            maxValue = values[i];
            maxIndex = i;
        }
        if (values[i] < minValue) {
            minValue = values[i];
            minIndex = i;
        }
    }
    let upper = {
        index: minIndex,
        value: minValue,
        significance: 0,
    };
    let lower = {
        index: maxIndex,
        value: maxValue,
        significance: 0,
    }
    let results = [];
    results.push(upper);
    results.push(lower);
    return results;
};
export const extractor = (data: Datum[], dimensions: string[], measures: Measure[]): ExtremeInfo[] => {
    let dimension = dimensions[0];
    let measure = measures[0].field;
    if (!data || data.length === 0)
        return [];
    let values = data.map(function (item) { return item === null || item === void 0 ? void 0 : item[measure]; });
    if (statistics.distinct(values) === 1)
        return [];
    let extreme = findExtreme(values).map(function (item) {
        let index = item.index, significance = item.significance;
        console.log('item', item)
        return {
            type: 'extreme',
            dimension: dimension,
            measure: measure,
            significance: significance,
            index: index,
            x: data[index][dimension],
            y: data[index][measure],
        };
    });
    return extreme;
};
