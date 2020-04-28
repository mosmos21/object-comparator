export declare enum ObjectType {
    Array = 0,
    Bigint = 1,
    Boolean = 2,
    Class = 3,
    Function = 4,
    Number = 5,
    Null = 6,
    Object = 7,
    String = 8,
    Symbol = 9,
    Undefined = 10
}
export declare type Equal = {
    equal: true;
};
export declare type NotEqual = {
    equal: false;
};
export declare type Result = Equal | NotEqual;
export declare const typeOf: (obj: any) => ObjectType;
export declare const compareArray: (arr1: any[], arr2: any[]) => Result;
export declare const compareObject: (obj1: any, obj2: any) => Result;
