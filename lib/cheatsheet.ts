import { Equal, Expect } from '../utils'

//--------------------Foundation-------------------------

/**
 * Get Primitive type from a generic type
 * This unitilizes primitive values always have `valueOf` function
 */
export type GetPrimitive<T> = T extends { valueOf: () => infer R } ? R : T

// or this way
export type GetPrimitive2<T extends string | number | boolean> = T['valueOf'] extends (...args: any) => infer R ? R : any

// or this way, which is the same, because 
// type ReturnType = T extends (...args: any) => infer R ? R : any;
export type GetPrimitive3<T extends string | number | boolean> = ReturnType<T['valueOf']>


/**
 * readonly tuple vs tuple vs Array
 * TL;DR tuple inherits both readonly tuple and Array
 * there is no assignability between readonly tuple and Array
 */
type ReadonlyTupleAssignabilityCheck = readonly [1, 2] extends unknown[] ? true : false
// a tuple is a subset of array
type ReadonlyTupleAssignabilityCheck2 = [1, 2] extends Array<number> ? true : false

/**
 * Variable assignment by assigning T to U, so that you can use U for extra operations
 * This can be used on the RHS of extends (doesn't have to be immediate)
 */
export type VAssignment<T extends unknown[]> = T extends infer U extends any[]
  ? U : never

/**
 * Distribute over union
 * This may look like a no-op, but it's not. It's a way to distribute over a union
 * The extends will distributively do the check for each key in the union, or set
 * After all is done, it will combine them back as a union
 */
export type DistributeUnion<T> = T extends infer U ? U : never

// One real example is Exclude
export type MyExclude<T, U> = T extends U ? never : T

// ----------------------String Manipulation------------------------------------

export type StringToTuple<S extends string> = S extends `${infer First}${infer Rest}`
  ? [First, ...StringToTuple<Rest>]
  : []


export type ReverseString<T extends string> = T extends `${infer F}${infer R}`
  ? `${ReverseString<R>}${F}`
  : ''


// ----------------------Number Manipulation------------------------------------
/**
 * Notice how this strips unnecessary decimal part
 */
export type CastNumberToString<T extends number> = `${T}`

/**
 * If T's value is an integer, return the integer form, otherwise never
 */
export type Integer<T extends number> = `${T}` extends `${bigint}` ? T : never

// --------------------Tuple Manipulation------------------------

/**
 * Tuple to union, see
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types
 */
export type TupleToUnion<T extends readonly unknown[]> = T[number]

export type TupleToString<T extends string[]> = T extends [infer First extends string, ...infer Rest extends string[]]
  ? `${First}${TupleToString<Rest>}`
  : ``


export type ReverseTuple<T extends any[]> = T extends [...infer Rest, infer Last]
  ? [Last, ...ReverseTuple<Rest>]
  : []
  
// --------------------Map(Object) or Set Manipulation---------------------

/**
 * Iterate keys
 * In this example, we just map a same value of key
 */
export type IterateSet<T extends string | number | symbol> = { 
  [P in T]: P
}

/**
 * The conjunction of 2 elements or 2 sets will tend to return lower level type
 * e.g. more specific type
 */

type ConjunctionSet = [
  Expect<Equal<2 & number, 2>>,
  Expect<Equal<2 & (number | string), 2>>,
]

// Similarly, we can do this for a map
type IterateMap<T> = {
  [P in keyof T]: T[P]
}

// You can then manipulate the key/value in the map
// e.g. make them all optional
export type MyOptional<T> = {
  [P in keyof T]?: T[P]
}

/**
 * Object to union of tuples
 * {1: 2, 3: 4} ==> [1, 2] | [3, 4]
 */
export type ObjectToTuple<T extends Object, U extends any[] = [], _K extends keyof T = keyof T> = keyof T extends [never]
  ? U
  : _K extends _K
    ? [...U, _K, T[_K]]
    : []

/**
 * Merge two objects
 * Make use of the fact that keyof objects are set, so you can union them
 * For values, simply do conditional check to get the kind of value you want 
 */
export type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K]
    : K extends keyof F
      ? F[K]
      : never;
}

/**
 * Drop readonly from object keys
 */
export type DropReadonly<T> = {
  -readonly [P in keyof T]: T[P]
}

/**
 * Similarly, you can drop "?"
 */
export type DropOptional<T> = {
  [P in keyof T]-?: T[P]
}

/**
 * Check empty union
 */
export type CheckEmptyUnion<T> = [T] extends [never] ? true : false
// Why not T extends never?
// As it will return never when CheckEmptyUnion<Exclude<1 | 2, 1 | 2>>
// See more in test by searchig this function name

// ----------------------Function Manipulation--------------------

/**
 * (arg1: number, arg2: string) => void ===> (arg_1: string, arg_2: number) => void
 */
export type FlipArguments<T extends Function> = T extends (...args: infer R) => infer RT
  ? (...args: ReverseTuple<R>) => RT
  : any


export * as default from './cheatsheet'