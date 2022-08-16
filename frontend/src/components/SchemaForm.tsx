import { Form, DatePicker, Input, Button } from 'antd'
import { FC } from 'react'
import { SchemaFormProps } from '../@types'

const SchemaForm: FC<SchemaFormProps> = ({ schema, loading, form, onSubmit }) => {
	const formItems = Object.entries(schema).map(([key, value]) => {
		return (
			<Form.Item
				key={key}
				name={key}
				label={value.displayText}
				rules={[{ required: value.required, message: `'${value.displayText}' is required` }]}
			>
				{value.type === 'date' ? <DatePicker /> : value.type === 'string' ? <Input /> : null}
			</Form.Item>
		)
	})

	return (
		<Form onFinish={onSubmit} form={form} layout="horizontal" style={{ maxWidth: '600px' }}>
			{formItems}
			<Form.Item>
				<Button type="primary" htmlType="submit" loading={loading}>
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}

export default SchemaForm
