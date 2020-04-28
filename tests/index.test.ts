import {
  ObjectType,
  typeOf,
  compareObject
} from '~/index'

describe('typeOf', () => {
  test('Verification of a array type.', () => {
    expect(typeOf([])).toEqual(ObjectType.Array)
  })

  test('Verification of a bigint type.', () => {
    expect(typeOf(BigInt(0))).toEqual(ObjectType.Bigint)
  })

  test('Verification of a boolean type.', () => {
    expect(typeOf(false)).toEqual(ObjectType.Boolean)
  })

  test('Verification of a class.', () => {
    class Clazz {}
    expect(typeOf(new Clazz())).toEqual(ObjectType.Class)
  })

  test('Verification of a function.', () => {
    expect(typeOf(() => {})).toEqual(ObjectType.Function)
  })

  test('Verification of a number type.', () => {
    expect(typeOf(0)).toEqual(ObjectType.Number)
  })

  test('Verification of a null.', () => {
    expect(typeOf(null)).toEqual(ObjectType.Null)
  })

  test('Verification of a object type.', () => {
    expect(typeOf({})).toEqual(ObjectType.Object)
  })

  test('Verification of a string type.', () => {
    expect(typeOf('foo bar baz')).toEqual(ObjectType.String)
  })

  test('Verification of a symbol.', () => {
    expect(typeOf(Symbol('foo'))).toEqual(ObjectType.Symbol)
  })

  test('Verificationn of a undefined.', () => {
    expect(typeOf(undefined)).toEqual(ObjectType.Undefined)
  })
})

describe('compareObject', () => {
  describe('When different object type.', () => {
    test('Return value equals false', () => {
      expect(compareObject({ key: 'value' }, 'foo bar baz')).toEqual({ equal: false })
    })
  })

  describe('when same object type.', () => {
    describe('When the Array type.', () => {
      test('Return type equal true if blank array.', () => {
        expect(compareObject([], [])).toEqual({ equal: true })
      })

      test('Return type equal false if arrays of dirrefent length.', () => {
        expect(compareObject([], [{ foo: 'bar' }])).toEqual({ equal: false })
      })

      test('Return type equal true of same array.', () => {
        expect(compareObject([{ foo: 'bar' }, { baz: 'qux' }, 1], [1, { foo: 'bar' }, { baz: 'qux'}])).toEqual({ equal: true })
      })
    })

    describe('When the BigInt type.', () => {
      test('Return type equal true.', () => {
        expect(compareObject(BigInt(1), BigInt(1))).toEqual({ equal: true })
      })

      test('Return type equal false.', () => {
        expect(compareObject(BigInt(1), BigInt(2))).toEqual({ equal: false })
      })
    })

    describe('When the Boolean type.', () => {
      test('Return type equal true.', () => {
        expect(compareObject(false, false)).toEqual({ equal: true })
      })

      test('Return type equal false.', () => {
        expect(compareObject(true, false)).toEqual({ equal: false })
      }) 
    })

    describe('When then Class type.', () => {
      class Foo {}
      class Bar {}

      test('Return type equal true.', () => {
        expect(compareObject(new Foo(), new Foo())).toEqual({ equal: true })
      })

      test('Return type equal false.', () => {
        expect(compareObject(new Foo(), new Bar())).toEqual({ equal: false })
      })
    })

    describe('When the Function type.', () => {
      const fn1 = () => {}
      
      test('Return type equal true.', () => {
        expect(compareObject(fn1, fn1)).toEqual({ equal: true })
      })

      test('Return type equal false.', () => {
        expect(compareObject(fn1, () => {})).toEqual({ equal: false })
      })
    })

    describe('when then Number type.', () => {
      test('Return type equal true.', () => {
        expect(compareObject(1, 1)).toEqual({ equal: true})
      })

      test('Return type equal false.', () => {
        expect(compareObject(1, 2)).toEqual({ equal: false })
      })
    })

    describe('When the Null type.', () => {
      test('Return type equal true.', () => {
        expect(compareObject(null, null)).toEqual({ equal: true })
      })
    })

    describe('When the Object type.', () => {
      test('Return type equal true if blank object.', () => {
        expect(compareObject({}, {})).toEqual({ equal: true })
      })

      test('Return type Equal true if same objects.', () => {
        expect(compareObject({ foo: 'bar', baz: 'qux', key: 1 }, { baz: 'qux', key: 1, foo: 'bar' })).toEqual({ equal: true })
      })

      test('Return type equal false if objects of dirrefent key size.', () => {
        expect(compareObject({}, { foo: 'bar' })).toEqual({ equal: false })
      })

      test('Return type equal false if objects of different key.', () => {
        expect(compareObject({ foo: 'baz' }, { bar: 'baz' })).toEqual({ equal: false })
      })

      test('Return type equal false if objects of different value.', () => {
        expect(compareObject({ foo: 'bar' }, { foo: 'baz' })).toEqual({ equal: false })
      })
    })

    describe('When the String type', () => {
      test('Return type equal true.', () => {
        expect(compareObject('foo', 'foo')).toEqual({ equal: true })
      })

      test('Return type equal false.', () => {
        expect(compareObject('foo', 'bar')).toEqual({ equal: false })
      })
    })

    describe('When the Symbol type.', () => {
      const obj1 = Symbol('obj1')
      
      test('Return type equal true', () => {
        expect(compareObject(obj1, obj1)).toEqual({ equal: true })
      })

      test('Return type equal false', () => {
        expect(compareObject(obj1, Symbol('obj1'))).toEqual({ equal: false })
      })
    })

    describe('When the Undefined type.', () => {
      test('Return type equals true.', () => {
        expect(compareObject(undefined, undefined)).toEqual({ equal: true })
      })
    })
  })
})