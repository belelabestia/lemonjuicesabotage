/** get the flattened, readable notation of any type */
export type Flat<T> = T extends any ? { [K in keyof T]: T[K] } & {} : never;
