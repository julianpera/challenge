import { FC, useState } from 'react'
import SchemaFilter from '../../components/SchemaFilter'
import SchemaTable from '../../components/SchemaTable'
import { usePersonList } from '../../hooks/usePersonList'
import { usePersonSchema } from '../../hooks/usePersonSchema'

const PersonListRoute: FC = () => {
	const [filter, setFilter] = useState({})

	const { schema, error: schemaError, revalidate } = usePersonSchema()
	const { personList, error: personError } = usePersonList(filter)

	const handleChange = (values: any) => {
		setFilter(values)
	}

	return (
		<>
			<h1>List of Persons</h1>
			{schemaError || personError ? (
				<div>Oops! Something went wrong...</div>
			) : !schema || !personList ? (
				<div>Loading...</div>
			) : (
				<>
					<SchemaFilter schema={schema} onChange={handleChange} />
					<SchemaTable schema={schema} entities={personList} />
				</>
			)}
		</>
	)
}

export default PersonListRoute
