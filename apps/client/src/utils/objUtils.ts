import _keyBy from "lodash/keyBy";
import _isEqual from "lodash/isEqual";
import _isEmpty from "lodash/isEmpty";
import _isNil from "lodash/isNil";
import _isUndefined from "lodash/isUndefined";
import _size from "lodash/size";
import _xorWith from "lodash/xorWith";

function arrayToObj<TDataItem extends any>(
  array: TDataItem[],
  key: string = "id"
) {
  return _keyBy(array, key);
}

function isEqual(a: object | any, b: object | any): boolean {
  return _isEqual(a, b);
}

function isEmpty(a: object | any): boolean {
  return _isEmpty(a);
}

function isNil(a: object | any): boolean {
  return _isNil(a);
}

function isUndefined(a: object | any): boolean {
  return _isUndefined(a);
}

function isArrayEqual<T>(x: T[], y: T[]) {
  const isSameSize = _size(x) === _size(y);
  return isSameSize && _isEmpty(_xorWith(x, y, isEqual));
}

export const objUtils = {
  arrayToObj,
  isEqual,
  isArrayEqual,
  isEmpty,
  isNil,
  isUndefined,
};
