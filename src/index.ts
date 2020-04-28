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

export const compareArray = (arr1: any[], arr2: any[]): Result => {
  if (arr1.length !== arr2.length) {
    return NOT_EQUAL
  }

  const dupArr1 = [...arr1].sort(), dupArr2 = [...arr2].sort()

  return [...new Array(arr1.length).keys()]
    .map(idx => [dupArr1[idx], dupArr2[idx]])
    .every(([obj1, obj2]) => compareObject(obj1, obj2))
      ? EQUAL
      : NOT_EQUAL
}

export const compareObject = (obj1: any, obj2: any): Result => {
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
      return obj1.name === obj2.name ? EQUAL : NOT_EQUAL
    case ObjectType.Class:
      return obj1.constructor.name === obj2.constructor.name ? EQUAL : NOT_EQUAL
    case ObjectType.Array:
      return compareArray(obj1, obj2)
  }

  const obj1Keys = Object.keys(obj1)
  if (obj1Keys.length !== Object.keys(obj2).length) {
    return NOT_EQUAL
  }
  if (obj1Keys.length === 0) {
    return EQUAL
  }

  return obj1Keys.every(key => compareObject(obj1[key], obj2[key]).equal)
    ? EQUAL
    : NOT_EQUAL
}