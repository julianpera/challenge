import { useState, useEffect } from 'react'
import { Schema } from '../@types'
import PersonService from '../services/person.service'

let cachedSchema: Schema | undefined

export const usePersonSchema = () => {
	const [schema, setSchema] = useState<Schema>()
	const [error, setError] = useState()

	const revalidate = async () => {
		setError(undefined)
		try {
			const data = await PersonService.schema()
			cachedSchema = data
			setSchema(data)
		} catch (err: any) {
			setError(err.message)
		}
	}

	useEffect(() => {
		if (cachedSchema !== undefined) {
			setSchema(cachedSchema)
		} else {
			revalidate()
		}
	}, [])

	return { schema, error, revalidate }
}
