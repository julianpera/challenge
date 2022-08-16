import { Form, message } from 'antd'
import { FC, useState } from 'react'
import SchemaForm from '../../components/SchemaForm'
import { usePersonSchema } from '../../hooks/usePersonSchema'
import personService from '../../services/person.service'

const PersonNewRoute: FC = () => {
	const { schema, error, revalidate } = usePersonSchema()
	const [loading, setLoading] = useState(false)
	const [form] = Form.useForm()

	const handleSubmit = (values: any) => {
		setLoading(true)
		personService
			.create(values)
			.then(() => {
				message.info('Person created succesfully!')
				form.resetFields()
			})
			.catch((err) => {
				message.error(err.message)
				revalidate()
			})
			.finally(() => setLoading(false))
	}

	return (
		<>
			<h1>New Person</h1>
			{error ? (
				<div>Oops! Something went wrong...</div>
			) : !schema ? (
				<div>Loading...</div>
			) : (
				<SchemaForm schema={schema} onSubmit={handleSubmit} loading={loading} form={form} />
			)}
		</>
	)
}

export default PersonNewRoute
