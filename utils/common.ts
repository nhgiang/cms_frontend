import { isArray } from 'lodash-es';

export const trimData = (data: any) => {
  if (typeof data === 'object' && !isArray(data)) {
    Object.keys(data).forEach(k => {
      if (typeof data[k] === 'string') {
        data[k] = data[k] && data[k].trim();
      }
      if (typeof data[k] === 'object') {
        trimData(data[k]);
      }
    });
  }
  if (isArray(data)) {
    data.forEach(e => {
      return trimData(e);
    });
  }
  if (typeof data === 'string') { data.trim() };
  return data;
};
