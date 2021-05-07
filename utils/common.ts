export const trimData = (data: any) => {
  Object.keys(data).forEach(k => {
    if (typeof data[k] === 'string') {
      data[k] = data[k] && data[k].trim();
    }
    if (typeof data[k] === 'object') {
      trimData(data[k]);
    }
  });
  return data;
};
