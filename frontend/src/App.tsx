import { FC } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import PersonListRoute from './routes/person/PersonListRoute'
import PersonNewRoute from './routes/person/PersonNewRoute'

const App: FC = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Layout.Header>
					<Menu mode="horizontal" theme="dark">
						<Menu.Item key="list">
							<Link to="/">List of Persons</Link>
						</Menu.Item>
						<Menu.Item key="new">
							<Link to="/new">New Person</Link>
						</Menu.Item>
					</Menu>
				</Layout.Header>
				<Layout.Content style={{ padding: '30px 50px', minHeight: '100vh' }}>
					<Routes>
						<Route path="/" element={<PersonListRoute />} />
						<Route path="/new" element={<PersonNewRoute />} />
					</Routes>
				</Layout.Content>
			</Layout>
		</BrowserRouter>
	)
}

export default App
