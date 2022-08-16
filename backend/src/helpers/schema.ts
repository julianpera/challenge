import { Schema } from '../@types'

export const buildSchema = <S extends Schema>(obj: S): S => obj
