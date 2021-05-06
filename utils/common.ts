export const trimData = (data: any) => {
  Object.keys(data).forEach(k => {
    if (typeof data[k] === 'string') {
      data[k] = data[k] && data[k].trim();
    }
  });
  return data;
};
