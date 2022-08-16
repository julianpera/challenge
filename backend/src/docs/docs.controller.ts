import { Router } from 'express'
import { AbstractController } from '../@types'
import SwaggerUI from 'swagger-ui-express'
import DocumentationFile from './openapi.json'

export class DocsController implements AbstractController {
	configureRoutes(app: Router): void {
		app.use('/', SwaggerUI.serve, SwaggerUI.setup(DocumentationFile))
	}
}
