export const get = async <T>(endpoint: string, query: any = {}): Promise<T> => {
	const parsedQuery = new URLSearchParams(query).toString()
	const response = await fetch(`${import.meta.env.VITE_BASE_API}${endpoint}?${parsedQuery}`)
	const data = await response.json()
	if (!response.ok) {
		throw new Error(data.message)
	}
	return data
}

export const post = async <T>(endpoint: string, body: any): Promise<T> => {
	const response = await fetch(`${import.meta.env.VITE_BASE_API}${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
	const data = await response.json()
	if (!response.ok) {
		throw new Error(data.message)
	}
	return data
}

export default {
	get,
	post,
}
