import './helpers/env'

import { Application } from './app'
import mongoose from 'mongoose'
import { PersonController } from './person/person.controller'
import { PersonRepository } from './person/person.repository'
import { DocsController } from './docs/docs.controller'

async function bootstrap() {
	const app = new Application()

	const personController = new PersonController(new PersonRepository())
	app.addController('/v1/persons', personController)

	const docsController = new DocsController()
	app.addController('/v1/docs', docsController)

	await mongoose.connect(process.env.DATABASE_URI)
	console.log('Connected to database...')

	await app.start(process.env.PORT)
	console.log(`Server running on http://localhost:${process.env.PORT}...`)
}
bootstrap()

