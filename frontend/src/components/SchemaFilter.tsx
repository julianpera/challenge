import { Form, DatePicker, Input } from 'antd'
import dateFormat from 'dateformat'
import { FC } from 'react'
import { SchemaFilterProps } from '../@types'

const SchemaFilter: FC<SchemaFilterProps> = ({ schema, onChange }) => {
	const formItems = Object.entries(schema).map(([key, value]) => {
		return (
			value.filterable && (
				<Form.Item key={key} name={key} label={value.displayText}>
					{value.type === 'date' ? <DatePicker picker="year" /> : value.type === 'string' ? <Input /> : null}
				</Form.Item>
			)
		)
	})

	const sanitazeChange = (changedValues: any, values: any) => {
		let returnValue = {}
		Object.entries(values).forEach(([key, value]) => {
			if (value) {
				returnValue = {
					...returnValue,
					[key]:
						schema[key].type === 'date'
							? dateFormat(value as string, 'yyyy')
							: schema[key].type === 'string'
							? value
							: undefined,
				}
			}
		})
		onChange(returnValue)
	}

	return (
		<Form onValuesChange={sanitazeChange} layout="inline" style={{ marginBottom: '20px' }}>
			{formItems}
		</Form>
	)
}

export default SchemaFilter
