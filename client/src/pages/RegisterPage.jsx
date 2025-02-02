import { Form, Input, Button, Typography, Flex, Layout, message } from 'antd'
import HeaderComp from '../components/MainHeader'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'

const { Title, Text } = Typography
const { Content } = Layout


const RegisterPage = () => {
	const navigate = useNavigate()

	const onFinish = async values => {
		const users = JSON.parse(localStorage.getItem('users')) || []
		const existingUser = users.find(user => user.email === values.email)

		if (existingUser) {
			message.error('Пользователь с такой почтой уже существует!')
		} else {
			const hashedPassword = await bcrypt.hash(values.password, 10)
			const newUser = { ...values, password: hashedPassword }
			users.push(newUser)
			localStorage.setItem('users', JSON.stringify(users))
			message.success('Регистрация прошла успешно!')
			navigate('/dashboard')
		}
	}

	const handleLogin = () => {
		navigate('/login')
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
						Регистрация
					</Title>
					<Text
						type='secondary'
						style={{
							display: 'block',
							textAlign: 'center',
							marginBottom: '24px',
						}}
					>
						Добро пожаловать, новый пользователь
					</Text>

					<Form layout='vertical' onFinish={onFinish}>
						<Form.Item
							name='email'
							label='Электронная почта'
							rules={[
								{ required: true, message: 'Введите вашу электронную почту' },
								{
									type: 'email',
									message: 'Введите корректный адрес электронной почты',
								},
							]}
						>
							<Input placeholder='Электронная почта' />
						</Form.Item>

						<Form.Item
							name='password'
							label='Пароль'
							rules={[
								{ required: true, message: 'Введите ваш пароль' },
								{ min: 6, message: 'Пароль должен быть не менее 6 символов' },
							]}
						>
							<Input.Password placeholder='Пароль' />
						</Form.Item>

						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
								style={{ width: '100%' }}
							>
								Зарегистрироваться
							</Button>
						</Form.Item>
					</Form>

					<Text style={{ textAlign: 'center', marginTop: '24px' }}>
						Уже есть аккаунт?{' '}
						<a onClick={handleLogin} style={{ cursor: 'pointer' }}>
							Войти
						</a>
					</Text>
				</div>
			</Flex>
		</Content>
	)
}

export default RegisterPage
