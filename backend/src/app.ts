import express, { Router, Request, Response, NextFunction } from 'express'
import { json } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import { AbstractController } from './@types'
import { HttpError } from './helpers/httpError'
import { Error } from 'mongoose'

export class Application {
	private controllers: Array<{ path: string; controller: AbstractController }>

	constructor() {
		this.controllers = []
	}

	addController(path: string, controller: AbstractController): void {
		this.controllers.push({ path, controller })
	}

	async start(port: number): Promise<void> {
		const app = express()

		app.use(json())
		app.use(morgan('tiny'))
		app.use(helmet())
		app.use(cors())

		this.controllers.forEach(({ path, controller }) => {
			const router = Router()
			controller.configureRoutes(router)
			app.use(path, router)
		})

		app.use((req: Request, res: Response, next: NextFunction) => {
			next(new HttpError(404, 'Not found'))
		})

		app.use((err: any, req: Request, res: Response, next: NextFunction) => {
			console.error(err)
			if (err instanceof Error.ValidationError) {
				return res.status(400).json({
					message: 'Validation error',
				})
			}
			if (err instanceof HttpError) {
				return res.status(err.code).json({
					message: err.message,
					path: req.path
				})
			}
			return res.status(500).json({
				message: 'Internal server error',
			})
		})

		return new Promise((resolve) => {
			app.listen(port, resolve)
		})
	}
}
