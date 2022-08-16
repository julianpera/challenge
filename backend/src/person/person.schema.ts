import { TypeFromSchema } from '../@types'
import { buildSchema } from '../helpers/schema'

export const PersonSchema = buildSchema({
	firstName: {
		type: 'string',
		displayText: 'First Name',
		filterable: false,
		required: true,
	},
	lastName: {
		type: 'string',
		displayText: 'Last Name',
		filterable: false,
		required: true,
	},
	dateOfBirth: {
		type: 'date',
		displayText: 'Date of Birth',
		filterable: true,
		required: true,
	},
	country: {
		type: 'string',
		displayText: 'Country',
		filterable: true,
		required: true,
	},
	email: {
		type: 'string',
		displayText: 'Email',
		filterable: false,
		required: true,
	},
})

export type Person = TypeFromSchema<typeof PersonSchema>
