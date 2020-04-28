javascript object comparator
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

```javascript
import { compareObject } from 'object-comparator'

const obj1 = { name: 'foo', value: 1 }
const obj2 = { name: 'bar', value: 2 }
const obj3 = { name: 'bar', value: 2 }
 
// The return value of the function is { equal: true } or { equal: false }
const result1 = compareObject(obj1, obj2)
console.log(result1.equal) // false

const result2 = compareObject(obj2, obj3)
console.log(result2.equal) // true
```