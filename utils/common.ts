import { isArray } from 'lodash-es';

export const trimData = (data: any) => {
  if (typeof data === 'object' && !isArray(data)) {
    Object.keys(data).forEach((k) => {
      if (typeof data[k] === 'string') {
        data[k] = data[k] && data[k].trim();
      }
      if (typeof data[k] === 'object' && data[k]) {
        trimData(data[k]);
      }
    });
  }
  if (isArray(data)) {
    data.forEach((e) => {
      return trimData(e);
    });
  }
  if (typeof data === 'string') {
    data.trim();
  }
  return data;
};

export const toFixed = (x: any) => {
  if (Math.abs(x) < 1.0) {
    // tslint:disable-next-line: radix
    const e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = '0.' + new Array(e).join('0') + x.toString().substring(2);
    }
  } else {
    // tslint:disable-next-line: radix
    let e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join('0');
    }
  }
  return x;
};

export const download = (data: Blob, contentType: string, name?: string) => {
  const blob = new Blob([data], { type: contentType });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.setAttribute('download', name);
  anchor.setAttribute('href', url);
  anchor.setAttribute('target', '_blank');
  anchor.click();
};
