/**
 * Variable assignment by assigning T to U, so that you can use U for extra operations
 */
type VAssignment<T extends unknown[]> = T extends infer U extends any[]
  ? U : never

// [1, 2, 3]
type VAssignmentTest = VAssignment<[1, 2, 3]>

//----------------------------------------------------------

/**
 * Iterate over a tuple by storing it to a supplementary tuple
 */
type IterateTuple<T extends readonly unknown[], U extends unknown[]= []> = T extends [infer First, ...infer Rest]
  ? Rest['length'] extends 0
    ? [...U, First]
    : IterateTuple<Rest, [...U, First]>
  : never

// [1, 2, 3]
type TestInterateTuple = IterateTuple<[1, 2, 3]>

//----------------------------------------------------------

/**
 * Tuple to union, see
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types
 */
type TupleToUnion<T extends readonly unknown[]> = T[number]

// 3 | 1 | 2
type TestTupleToUnion = TupleToUnion<[1, 2, 3]>

// ----------------------------------------------------------

/**
 * Distribute over union
 * This may look like a no-op, but it's not. It's a way to distribute over a union
 * The extends will distributively do the check for each key in the union, or set
 * After all is done, it will combine them back as a union
 */
type DistributeUnion<T> = T extends infer U ? U : never

// 1 | 2
type TestDistributeUnion = DistributeUnion<1 | 2>

// ----------------------------------------------------------

/**
 * String to tuple
 */
type StringToTuple<S extends string> = S extends `${infer First}${infer Rest}`
  ? [First, ...StringToTuple<Rest>]
  : []

// ["1", "2", "3", "1", "2", "3"]
type TestStringToTuple = StringToTuple<'123123'>

/**
 * Tuple to string
 */
type TupleToString<T extends string[]> = T extends [infer First extends string, ...infer Rest extends string[]]
  ? `${First}${TupleToString<Rest>}`
  : ``

// 'foobar'
type TestTupleToString = TupleToString<['foo', 'bar']>

// ----------------------------------------------------------

/**
 * Check empty union
 */
type CheckEmptyUnion<T> = [T] extends [never] ? true : false

type TestCheckEmptyUnion = CheckEmptyUnion<1 | 2>
type TestCheckEmptyUnion2 = CheckEmptyUnion<Exclude<1 | 2, 1 | 2>>

// ----------------------------------------------------------

