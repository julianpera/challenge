import dotenv from 'dotenv'
import path from 'path'

const envFiles = [`.env.${process.env.NODE_ENV}.local`, `.env.${process.env.NODE_ENV}`, '.env.local', '.env']
envFiles.forEach((envFile) => dotenv.config({ path: path.resolve(process.cwd(), envFile) }))
