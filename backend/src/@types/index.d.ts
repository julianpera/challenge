import { Router } from 'express'
import { FilterQuery } from 'mongoose'

export interface AbstractController {
	configureRoutes: (app: Router) => void
}

export interface AbstractRepository<T> {
	find: (filter: FilterQuery<T>) => Promise<T[]>
	create: (entity: T) => Promise<T>
}

export interface Schema {
	[key: string]: {
		type: 'string' | 'date'
		displayText: string
		filterable: boolean
		required: boolean
	}
}

type RequiredKeys<T extends Schema> = {
	[K in keyof T]: T[K]['required'] extends true ? K : never
}[keyof T]

type OptionalKeys<T extends Schema> = {
	[K in keyof T]: T[K]['required'] extends false ? K : never
}[keyof T]

type KeyType<T extends Schema[string]['type']> = T extends 'string'
	? string
	: T extends 'date'
	? Date
	: unknown

export type TypeFromSchema<T extends Schema> = {
	[K in RequiredKeys<T>]: KeyType<T[K]['type']>
} & {
	[K in OptionalKeys<T>]?: KeyType<T[K]['type']>
} extends infer O
	? { [K in keyof O]: O[K] }
	: never
