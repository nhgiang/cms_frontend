import { cloneDeep, isArray } from 'lodash-es';

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

export const bytesToSize = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) {
    return '0 Byte';
  }
  // tslint:disable-next-line: radix
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};

export const isValidValue = (data) => {
  if (typeof data === 'object') {
    // tslint:disable-next-line: forin
    for (const key in data) {
      if (typeof data[key] === 'object') {
        isValidValue(data[key]);
      } else if (!data[key]) {
        delete data[key];
      }
    }
    console.log(data);

    return data;
  } else {
    return data || null;
  }
};
