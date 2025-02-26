import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'antd/dist/reset.css'
import MainPage from '../pages/MainPage'
import ContactUsPage from '../pages/ContactUsPage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import DashBoardPage from '../pages/DashBoardPage'
import Loading from '../entities/loading/ui/Loading'
import { useState, useEffect } from 'react'

export default function App() {
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false)
		}, 2000)
	}, [])
	return (
		<Router>
			{isLoading ? (
				<Loading></Loading>
			) : (
				<Routes>
					<Route exact path='/' element={<MainPage />} />
					<Route path='/contact' element={<ContactUsPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/dashboard' element={<DashBoardPage />} />
					<Route path='/register' element={<RegisterPage />} />
				</Routes>
			)}
		</Router>
	)
}
