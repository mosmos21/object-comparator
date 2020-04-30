export enum ObjectType {
  Array,
  Bigint,
  Boolean,
  Class,
  Function,
  Number,
  Null,
  Object,
  String,
  Symbol,
  Undefined,
}

export type Equal = { equal: true }

export type NotEqual = { equal: false }

export type Result = Equal | NotEqual

export type CompareOption = {
  classTypeComparator?: (cls1: Object, cls2: Object) => Result,
  functionTypeComparator?: (fun1: Function, fun2: Function, option?: CompareOption) => Result,
}

const EQUAL: Equal = { equal: true }
const NOT_EQUAL: NotEqual = { equal: false }

export const typeOf = (obj: any): ObjectType => {
  switch (typeof obj) {
    case 'bigint':
      return ObjectType.Bigint
    case 'boolean':
      return ObjectType.Boolean
    case 'function':
      return ObjectType.Function
    case 'number':
      return ObjectType.Number
    case 'string':
      return ObjectType.String
    case 'symbol':
      return ObjectType.Symbol
    case 'undefined':
      return ObjectType.Undefined
  }

  if (obj === null) {
    return ObjectType.Null
  }
  if (Array.isArray(obj)) {
    return ObjectType.Array
  }
  if (obj.constructor.name !== 'Object') {
    return ObjectType.Class
  }

  return ObjectType.Object
}

export const compareFunction = (fun1: Function, fun2: Function, option?: CompareOption): Result => {
  if (option?.functionTypeComparator) {
    return option.functionTypeComparator(fun1, fun2)
  }
  return fun1.name === fun2.name ? EQUAL : NOT_EQUAL
}

export const compareClass = (cls1: Object, cls2: Object, option?: CompareOption): Result => {
  if (option?.classTypeComparator) {
    return option.classTypeComparator(cls1, cls2)
  }
  return cls1.constructor.name === cls2.constructor.name ? EQUAL : NOT_EQUAL
}

export const compareArray = (arr1: any[], arr2: any[], option?: CompareOption): Result => {
  if (arr1.length !== arr2.length) {
    return NOT_EQUAL
  }

  const dupArr1 = [...arr1].sort(), dupArr2 = [...arr2].sort()

  return [...new Array(arr1.length).keys()]
    .map(idx => [dupArr1[idx], dupArr2[idx]])
    .every(([obj1, obj2]) => compareObject(obj1, obj2, option))
      ? EQUAL
      : NOT_EQUAL
}

export const compareObject = (obj1: any, obj2: any, option?: CompareOption): Result => {
  const obj1Type = typeOf(obj1)
  const obj2Type = typeOf(obj2)

  if (obj1Type != obj2Type) {
    return NOT_EQUAL
  }

  switch (obj1Type) {
    case ObjectType.Bigint:
    case ObjectType.Boolean:
    case ObjectType.Number:
    case ObjectType.String:
    case ObjectType.Symbol:
      return obj1 === obj2 ? EQUAL : NOT_EQUAL
    case ObjectType.Null:
    case ObjectType.Undefined:
      return EQUAL
    case ObjectType.Function:
      return compareFunction(obj1, obj2, option)
    case ObjectType.Class:
      return compareClass(obj1, obj2, option)
    case ObjectType.Array:
      return compareArray(obj1, obj2, option)
  }

  const obj1Keys = Object.keys(obj1)
  if (obj1Keys.length < Object.keys(obj2).length) {
    return NOT_EQUAL
  }
  if (obj1Keys.length === 0) {
    return EQUAL
  }

  return obj1Keys.every(key => compareObject(obj1[key], obj2[key], option).equal)
    ? EQUAL
    : NOT_EQUAL
}