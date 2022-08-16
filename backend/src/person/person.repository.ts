import { FilterQuery, SchemaDefinition, model, Schema } from 'mongoose'
import { AbstractRepository } from '../@types'
import { Person, PersonSchema } from './person.schema'

let personSchema: SchemaDefinition = {}
Object.entries(PersonSchema).forEach(([key, value]) => {
	personSchema = {
		...personSchema,
		[key]: {
			type: value.type,
			required: value.required,
		},
	}
})
const PersonModel = model<Person>('Person', new Schema(personSchema))

export class PersonRepository implements AbstractRepository<Person> {
	find = async (filter: FilterQuery<Person>): Promise<Person[]> => {
		return await PersonModel.find(filter)
	}

	create = async (entity: Person): Promise<Person> => {
		return await PersonModel.create(entity)
	}
}
