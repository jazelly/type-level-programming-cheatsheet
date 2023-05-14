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