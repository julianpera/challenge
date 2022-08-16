import { Entity, Schema } from '../@types'
import ApiService from './api.service'

export const find = async (filter = {}): Promise<Entity[]> => {
	return await ApiService.get<Entity[]>('/v1/persons', filter)
}

export const schema = async (): Promise<Schema> => {
	return await ApiService.get<Schema>('/v1/persons/schema')
}

export const create = async (entity: Entity): Promise<Entity> => {
	return await ApiService.post<Entity>('/v1/persons', entity)
}

export default {
	find,
	schema,
	create,
}
