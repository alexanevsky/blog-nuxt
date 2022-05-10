import blockContent     from './converters/blockContent';
import convertDatetime  from './converters/convertDatetime';
import modifyDatetime   from './converters/modifyDatetime';

export default {
  blockContent:   blockContent,
  datetime:       convertDatetime,
  date:           (d) => convertDatetime(d, false),
  datetimeModify: modifyDatetime
};
