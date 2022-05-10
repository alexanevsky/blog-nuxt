import convertDatetime  from './converters/convertDatetime';
import modifyDatetime   from './converters/modifyDatetime';

export default {
  datetime:       convertDatetime,
  date:           (d) => convertDatetime(d, false),
  datetimeModify: modifyDatetime
};
