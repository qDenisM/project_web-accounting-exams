import { Form, Input, Button, Typography, message, Flex, Layout } from 'antd'
import HeaderComp from '../components/MainHeader'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'

const { Title, Text } = Typography
const { Content } = Layout

const LoginPage = () => {
	const navigate = useNavigate()

	const onFinish = async values => {
		const users = JSON.parse(localStorage.getItem('users')) || []
		const user = users.find(user => user.email === values.email)
		if (user) {
			const isPasswordValid = await bcrypt.compare(
				values.password,
				user.password
			)
			if (isPasswordValid) {
				message.success('Авторизация успешна!')
				navigate('/dashboard')
			} else {
				message.error('Неверная почта или пароль!')
			}
		}
	}

	return (
		<Content>
			<HeaderComp />
			<Flex
				align='center'
				justify='center'
				vertical={true}
				style={{
					minHeight: '90vh',
					backgroundColor: '#f0f2f5',
				}}
			>
				<div
					style={{
						padding: '40px',
						maxWidth: '400px',
						width: '100%',
						backgroundColor: '#fff',
						borderRadius: '8px',
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
					}}
				>
					<Title level={3} style={{ textAlign: 'center' }}>
						Вход
					</Title>

					<Form layout='vertical' onFinish={onFinish}>
						<Form.Item
							name='email'
							label='Электронная почта'
							rules={[
								{ required: true, message: 'Введите вашу почту' },
								{ type: 'email', message: 'Введите корректный адрес почты' },
							]}
						>
							<Input placeholder='Электронная почта' />
						</Form.Item>

						<Form.Item
							name='password'
							label='Пароль'
							rules={[{ required: true, message: 'Введите ваш пароль' }]}
						>
							<Input.Password placeholder='Пароль' />
						</Form.Item>

						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
								style={{ width: '100%' }}
							>
								Войти
							</Button>
						</Form.Item>
					</Form>

					<Text style={{ textAlign: 'center', marginTop: '24px' }}>
						Нет аккаунта?{' '}
						<a
							onClick={() => navigate('/register')}
							style={{ cursor: 'pointer' }}
						>
							Регистрация
						</a>
					</Text>
				</div>
			</Flex>
		</Content>
	)
}

export default LoginPage
