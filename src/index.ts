export enum ObjectType {
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

export const typeOf = (obj: any): ObjectType => {
  switch(typeof obj) {
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
  if (obj.constructor.name !== 'Object') {
    return ObjectType.Class
  }
  
  return ObjectType.Object
}