// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Curried<A extends any[], R> = <P extends Partial<A>>(
  ...args: P
) => P extends A
  ? R
  : A extends [...SameLength<P>, ...infer S]
  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
    S extends any[]
    ? Curried<S, R>
    : never
  : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SameLength<T extends any[]> = Extract<{ [K in keyof T]: any }, any[]>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function curry<A extends any[], R>(
  fn: (...args: A) => R
): Curried<A, R> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]): any =>
    args.length >= fn.length
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fn(...(args as any))
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        curry((fn as any).bind(undefined, ...args));
}

export const id = <I>(x: I): I => x;

export type UnaryFunction<A, B> = (i: A) => B;

type BoxMethods<I, R> = {
  map: (fn: UnaryFunction<I, R>) => BoxMethods<R, R>;
  fold: (fn: UnaryFunction<I, R>) => R;
};

/**
 * Box, apply a function sequentially to the given value.
 *
 * @example
 * Multiply the given value with the specified number
 * ```
 * const thirty = Box(5)
 *   .map(n => n * 2)  // 10
 *   .map(n => n * 3)  // 30
 *   .fold(n => n)     // returns value 30
 * ```
 *
 */
export const Box = <I, R>(value: I): BoxMethods<I, R> => ({
  map: (fn) => Box(fn(value)),
  fold: (fn) => fn(value),
});
