import { Form, Input, Button, Typography, Layout, notification } from 'antd'
import Images from '../Images'
import HeaderComp from '../components/MainHeader'
import axios from 'axios'

const { Title, Text } = Typography
const { Content } = Layout

const formatMessage = formData => {
	return `
						Полное имя:
						${formData.name}

						Электронная почта:
						${formData.email}
						
						Вопрос:
						${formData.message}`
}

const onFinish = async values => {
	try {
		await axios.post('https://api.web3forms.com/submit', {
			access_key: 'cd3a3463-fdcd-4953-a667-7e24ef4a9cb0',
			subject: 'Обратная связь',
			message: formatMessage(values),
		})
		notification.success({
			message: 'Успех',
			description: 'Запрос успешно отправлен.',
		})
	} catch (error) {
		notification.error({
			message: 'Ошибка',
			description: 'Ошибка при отправке запроса. Попробуйте еще раз позже.',
		})
		console.error('Ошибка при отправке заявления:', error)
	}
}

export default function ContactUsPage() {
	return (
		<Content
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				backgroundColor: '#ffffff',
				backgroundImage: `url(${Images.bgContactUs})`,
				backgroundSize: '75%',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center center',
				fontFamily: 'Outfit',
				minHeight: '100vh',
			}}
		>
			<HeaderComp />
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '100%',
					marginTop: '2.5%',
				}}
			>
				<Title level={2}>Связаться с нами</Title>
				<Text
					style={{
						marginBottom: '20px',
						fontSize: '16px',
						textAlign: 'center',
					}}
				>
					Поделитесь вашими предложениями
				</Text>

				<Form
					onFinish={onFinish}
					layout='vertical'
					style={{ width: '20%' }}
					size='large'
				>
					<Form.Item
						name='name'
						rules={[
							{ required: true, message: 'Пожалуйста, введите ваше имя!' },
							{ min: 2, message: 'Имя должно содержать минимум 2 символа.' },
						]}
					>
						<Input placeholder='Имя' />
					</Form.Item>

					<Form.Item
						name='email'
						rules={[
							{ required: true, message: 'Пожалуйста, введите вашу почту!' },
							{
								type: 'email',
								message: 'Введите корректный адрес электронной почты.',
							},
						]}
					>
						<Input placeholder='Почта' />
					</Form.Item>

					<Form.Item
						name='message'
						rules={[
							{ required: true, message: 'Пожалуйста, введите сообщение!' },
							{
								min: 10,
								message: 'Сообщение должно содержать минимум 10 символов.',
							},
						]}
					>
						<Input.TextArea placeholder='Сообщение' rows={8} />
					</Form.Item>

					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							style={{ width: '100%', backgroundColor: '#4A3AFF' }}
						>
							Отправить
						</Button>
					</Form.Item>
				</Form>
			</div>
		</Content>
	)
}
