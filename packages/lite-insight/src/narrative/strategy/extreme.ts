
import { PhrasesBuilder } from '../utils/phrases-builder';
import { PointPatternInfo, Language } from '../../interface';
/**
 * @template ``
 * @example There are 4 outliers in total, which are (Afghanistan, 7.0685), (Rwanda, 5.9169), (Nigeria, 5.322) and (Kenya, 4.959).
 */
export function extremeStrategy(variableMaps: PointPatternInfo[], lang:Language) {
    console.log('extremeStrategy', variableMaps)
    var measures = variableMaps.measures;
    var dimensions = variableMaps.dimensions;
    var values = variableMaps.values;
    var phrases = new PhrasesBuilder(lang);
    // var total = variableMaps.length;
    // There are ${outliers.length} outliers in total, which are ${outliersPositionsString}.
    if (lang === 'en-US') {
        phrases.add(variableMaps[0].x, 'metric_name');
        phrases.add('has minimum');
        phrases.add(variableMaps[0].measure, 'metric_name')
        phrases.add(variableMaps[0].y, 'metric_value');
        phrases.addSymbol('punctuation_comma');
        phrases.add(variableMaps[1].x, 'metric_name');
        phrases.add('has maximum');
        phrases.add(variableMaps[1].measure, 'metric_name')
        phrases.add(variableMaps[1].y, 'metric_value');
       
    }
    //  总共有${outliers.length}个异常值，分别是${outliersPositionsString}。
    if (lang === 'zh-CN') {
        phrases.add(variableMaps[0].x, 'metric_name');
        phrases.add('拥有最少');
        phrases.add(variableMaps[0].measure, 'metric_name')
        phrases.add(variableMaps[0].y, 'metric_value');
        phrases.addSymbol('punctuation_comma');
        phrases.add(variableMaps[1].x, 'metric_name');
        phrases.add('拥有最多');
        phrases.add(variableMaps[1].measure, 'metric_name')
        phrases.add(variableMaps[1].y, 'metric_value');
    }
    phrases.addSymbol('punctuation_stop');
    return phrases;
}
