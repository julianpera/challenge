declare module NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'stage' | 'test'
		PORT: number
		DATABASE_URI: string
	}
}
