import { Router, Request, Response, NextFunction } from 'express'
import { FilterQuery } from 'mongoose'
import { AbstractController, AbstractRepository, Schema } from '../@types'
import { HttpError } from '../helpers/httpError'
import { Person, PersonSchema } from './person.schema'

const buildPersonFilter = (req: Request): FilterQuery<Person> => {
	let filter: FilterQuery<Person> = {}
	Object.entries(PersonSchema).forEach(([key, value]) => {
		const input = req.query[key]
		if (input && value.filterable) {
			if (typeof input !== 'string') throw new HttpError(400, `Query param '${key}' must be a string`)
			switch (value.type) {
				case 'date':
					filter = {
						...filter,
						[key]: {
							$gte: new Date(`${input}-01-01T00:00:00`),
							$lt: new Date(`${input}-12-31T23:59:59`),
						},
					}
					break
				case 'string':
					filter = {
						...filter,
						[key]: new RegExp(`^${input}`, 'i'),
					}
					break
			}
		}
	})
	return filter
}

export class PersonController implements AbstractController {
	constructor(private personRepository: AbstractRepository<Person>) {}

	find = async (req: Request, res: Response<Person[]>, next: NextFunction) => {
		try {
			const filter = buildPersonFilter(req)
			const persons = await this.personRepository.find(filter)
			return res.status(200).json(persons)
		} catch (err) {
			next(err)
		}
	}

	schema = async (req: Request, res: Response<Schema>, next: NextFunction) => {
		return res.status(200).json(PersonSchema)
	}

	create = async (req: Request, res: Response<Person>, next: NextFunction) => {
		try {
			const createdPerson = await this.personRepository.create(req.body)
			return res.status(200).json(createdPerson)
		} catch (err) {
			next(err)
		}
	}

	configureRoutes(app: Router): void {
		app.get('/', this.find)
		app.get('/schema', this.schema)
		app.post('/', this.create)
	}
}
