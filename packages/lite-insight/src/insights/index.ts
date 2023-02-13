import { extractor as categoryOutlierExtractor } from './extractors/categoryOutlier';
import { extractor as trendExtractor } from './extractors/trend';
import { extractor as ChangePointExtractor } from './extractors/changePoint';
import { extractor as timeSeriesOutlierExtractor } from './extractors/timeSeriesOutlier';
import { extractor as majorityExtractor } from './extractors/majority';
import { extractor as lowVarianceExtractor } from './extractors/lowVariance';
import { extractor as correlationExtractor } from './extractors/correlation';
import { extractor as extremeExtractor } from './extractors/extreme';
import { extractor as  distributionRangeExtractor} from './extractors/distributionRange';

export const insightExtractors = {
  category_outlier: categoryOutlierExtractor,
  trend: trendExtractor,
  change_point: ChangePointExtractor,
  time_series_outlier: timeSeriesOutlierExtractor,
  majority: majorityExtractor,
  low_variance: lowVarianceExtractor,
  correlation: correlationExtractor,
  extreme: extremeExtractor,
    distribution_range: distributionRangeExtractor,
};

export * from './checkers';
