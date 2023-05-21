import CS from '../lib/cheatsheet'
import { Equal, Expect } from '../utils'

type Cases = [
  Expect<Equal<CS.GetPrimitive<123>, number>>,
  Expect<Equal<CS.GetPrimitive<'123'>, string>>,
  Expect<Equal<CS.GetPrimitive<true>, boolean>>,
  Expect<Equal<CS.GetPrimitive2<123>, number>>,
  Expect<Equal<CS.GetPrimitive2<'123'>, string>>,
  Expect<Equal<CS.GetPrimitive2<true>, boolean>>,
  Expect<Equal<CS.GetPrimitive3<123>, number>>,
  Expect<Equal<CS.GetPrimitive3<'123'>, string>>,
  Expect<Equal<CS.GetPrimitive3<true>, boolean>>,

  Expect<Equal<CS.MyExclude<1 | 2 | 3, 1 | 2>, 3>>,
  
  Expect<Equal<CS.StringToTuple<'123'>, ['1', '2', '3']>>,
  Expect<Equal<CS.ReverseString<'123'>, '321'>>,
  
  Expect<Equal<CS.TupleToUnion<[1, 2, 3]>, 1 | 2 | 3>>,
  Expect<Equal<CS.TupleToString<['foo', 'bar']>, 'foobar'>>,
  Expect<Equal<CS.ReverseTuple<[1, 2, 3]>, [3, 2, 1]>>,

  Expect<Equal<CS.IterateSet<1 | 2 | 3>, {
    1: 1,
    2: 2,
    3: 3,
  }>>,
  Expect<Equal<CS.MyOptional<{
    foo: number,
    bar: string,
  }>, {
    foo?: number | undefined,
    bar?: string | undefined,
  }>>,

  Expect<Equal<CS.ObjectToTuple<{1: 2, 3: 4}>, [1, 2] | [3, 4]>>,
  Expect<Equal<CS.Merge<{a: 1, b: 2}, {b: 3}>, {a: 1, b: 3}>>,

  Expect<Equal<CS.CheckEmptyUnion<1 | 2>, false>>,
  Expect<Equal<CS.CheckEmptyUnion<Exclude<1 | 2, 1 | 2>>, true>>,
  
  Expect<Equal<CS.FlipArguments<(a: number, b: string) => void>, (args_0: string, args_1: number) => void>>,

]