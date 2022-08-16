import { FormInstance } from 'antd'

export interface Schema {
	[key: string]: {
		type: 'string' | 'date'
		displayText: string
		filterable: boolean
		required: boolean
	}
}

export interface Entity {
	[key: string]: any
}

export interface SchemaFilterProps {
	schema: Schema
	onChange: (values: { [key: string]: string }) => void
}

export interface SchemaTableProps {
	schema: Schema
	entities: Entity[]
}

export interface SchemaFormProps {
	schema: Schema
	loading: boolean
	form: FormInstance
	onSubmit: (values: any) => void
}
