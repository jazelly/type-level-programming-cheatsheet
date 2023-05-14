import { Equal, Expect } from '../utils'

// ----------------------------------------------------------

/**
 * ReplaceAll
 */
type ReplaceAll<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer First}${From}${infer Rest}`
    ? `${First}${To}${ReplaceAll<Rest, From, To>}`
    : S

type TestReplaceAll = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]

// ----------------------------------------------------------

/**
 * Permutation of a union
 */
type Permutation<T, C = T> = [T] extends [never]
  ? []
  : C extends infer U
    ? [U, ...Permutation<Exclude<T, U>>]
    : []

type TestPermutation = [
  Expect<Equal<Permutation<1 | 2>, [1, 2] | [2, 1]>>,
]

// ----------------------------------------------------------

/**
 * Check if P exists in T[]
 * The equal here will allow you check if unknown and any is the same
 */
type CheckExist<T extends any[], P> = T extends [infer First, ...infer Rest]
  ? Equal<First, P> extends true
    ? true
    : CheckExist<Rest, P>
  : false

/**
 * Distinct T[]
 */
type Unique<T extends any[], U extends any[] = []> = T extends [infer First, ...infer Rest]
? CheckExist<U, First> extends true
  ? Unique<Rest, U>
  : Unique<Rest, [...U, First]>
: U

// ----------------------------------------------------------

/**
 * Merge 2 Objects
 */
type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K]
    : K extends keyof F
    ? F[K]
    : never;
};

/**
 * Flip key-value to value-key in Object
 */
type Flip<T extends Record<string, string | number | boolean>> = {
  [P in keyof T as `${T[P]}`]: P
}
