import {
  ObjectType,
  typeOf,
} from '~/index'

describe('typeOf', () => {
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