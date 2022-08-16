import { useState, useEffect } from 'react'
import { Entity } from '../@types'
import PersonService from '../services/person.service'

export const usePersonList = (filter: any) => {
	const [personList, setPersonList] = useState<Entity[]>()
	const [error, setError] = useState()

	useEffect(() => {
		setError(undefined)
		PersonService.find(filter)
			.then(setPersonList)
			.catch((err: any) => {
				setError(err.message)
			})
	}, [filter])

	return { personList, error }
}
