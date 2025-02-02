import { Menu, Layout, Flex, Button, Typography } from 'antd'
import 'antd/dist/reset.css'

import { useNavigate } from 'react-router-dom'

const { Header } = Layout
const { Title } = Typography

export default function HeaderComp() {
	const navigate = useNavigate()

	const handleMain = () => {
		navigate('/')
	}

	const handleContact = () => {
		navigate('/contact')
	}

	const handleLogin = () => {
		navigate('/login')
	}

	const handleRegister = () => {
		navigate('/register')
	}
	return (
		<Header
			style={{
				background: '#fff',
				display: 'flex',
				alignItems: 'center',
				width: '100%',
				justifyContent: 'center',
			}}
		>
			<Flex
				justify='center'
				align='center'
				gap='20%'
				style={{ width: '100%', maxWidth: '100%' }}
			>
				<Title level={3} style={{ fontWeight: 'bold', color: '#4d4d4d' }}>
					Edu<span style={{ color: '#4A3AFF' }}>Tech</span> Systems
				</Title>
				<Menu
					theme='light'
					mode='horizontal'
					style={{ justifyContent: 'center', width: '45%' }}
				>
					<Menu.Item key='1'>
						<a onClick={handleMain} style={{ fontWeight: 'normal' }}>
							Главная
						</a>
					</Menu.Item>

					<Menu.Item key='2'>
						<a onClick={handleContact} style={{ fontWeight: 'normal' }}>
							Связаться с нами
						</a>
					</Menu.Item>

					<Menu.Item
						className='signIn'
						key='3'
						style={{ borderBottomColor: 'none' }}
					>
						<a onClick={handleLogin}>
							<Button>Войти</Button>
						</a>
					</Menu.Item>

					<Menu.Item className='startNow' key='4'>
						<a onClick={handleRegister}>
							<Button type='primary'>Начать сейчас</Button>
						</a>
					</Menu.Item>
				</Menu>
			</Flex>
		</Header>
	)
}
