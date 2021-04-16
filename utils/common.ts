export const trimData = (data: any) => {
  Object.keys(data).forEach(k => data[k] = data[k] && data[k].trim());
  return data;
};
