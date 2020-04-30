Object Comparator
===

This package provides functions for comparing objects.


## Installation

```bash
# use npm
$ npm install --save object-comparator
# use yarn
$ yarn add object-comparator
```

## Usage

```typescript
import { compareObject } from 'object-comparator'

const obj1 = { name: 'foo', value: 1 }
const obj2 = { name: 'bar', value: 2 }
const obj3 = { name: 'bar', value: 2 }
 
const result1 = compareObject(obj1, obj2)
console.log(result1.equal) // false

const result2 = compareObject(obj2, obj3)
console.log(result2.equal) // true
```

## API

Commonly, the comparison functions have a Result type return value defined as follows.

```typescript
type Equal = { 
  equal: true
}

type NotEqual = {
  equal: false
}

type Result = Equal | NotEqual
```

#### typeOf: (obj: any) => ObjectType
Classify the value of the argument into one of the following

- ObjectType.Array
- ObjectType.Bigint
- ObjectType.Boolean
- ObjectType.Class
- ObjectType.Function
- ObjectType.Number
- ObjectType.ull
- ObjectType.Object
- ObjectType.String
- ObjectType.Symbol
- ObjectType.Undefined


#### compareFunction: (fun1: Function, fun2: Function, option?: CompareOption) => Result

Compare the values of ObjectType.Function. If an optional comparison operator is given(`option.functionTypeComparator`), use it to compare, otherwise use `fun.name` to compare.


#### compareClass: (cls1: Object, cls2: Object, option?: CompareOption) => Result

Comparing values that are ObjectType. If an optional comparison operator is given(`option.classTypeComparator`), use it to compare, otherwise use `fun.constructor.name` to compare.


#### compareArray: (arr1: any[], arr2: any[], option?: CompareOption) => Result

Compare values in an ObjectType.Array. The array is sorted and compared. Each element of the array is further compared according to the result of the typeOf function.


#### compareObject: (obj1: any, obj2: any, option?: CompareOption) => Result**

Takes an argument of any type, and if it is ObjectType.Object, it checks if the key/value pair is an exact match.

## CompareOption

```typescript
type CompareOption = Partial<{
  
  // If the option is not passed, 
  // the comparison is performed as implemented by the compareClass function.
  classTypeComparator: (cls1: Object, cls2: Object) => Result;

  // If the option is not passed, 
  // the comparison is performed as implemented by the compareFunction function.
  functionTypeComparator: (fun1: Function, fun2: Function, option?: CompareOption) => Result;
}>
```