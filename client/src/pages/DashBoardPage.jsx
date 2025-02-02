import {
	Layout,
	Menu,
	Typography,
	Form,
	Button,
	Input,
	DatePicker,
	Checkbox,
	Flex,
	Select,
	notification,
	Drawer,
} from 'antd'
import {
	HomeOutlined,
	AppstoreOutlined,
	ScheduleOutlined,
	FileTextOutlined,
	LogoutOutlined,
	UserOutlined,
	PhoneOutlined,
	MailOutlined,
	CalendarOutlined,
} from '@ant-design/icons'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	setSubject,
	setDate,
	addToSchedule,
	resetSelection,
} from '../redux/slices/scheduleSlice'
import {
	calculateTotalScore,
	updateSelectedSubjects,
} from '../redux/slices/examSlice'
import Schedule from '../components/Schedule'
import Universities from '../components/Universities'
import Exams from '../components/Exams'

const { Option } = Select
const { Sider, Content, Header } = Layout
const { Title } = Typography

export default function Dashboard() {
	const [selectedContent, setSelectedContent] = useState('1')
	const [menuVisible, setMenuVisible] = useState(false)
	const { examData } = useSelector(state => state.exam)

	const { selectedSubject, availableDates, selectedDate } = useSelector(
		state => state.schedule
	)
	const schedule = useSelector(state => state.schedule.schedule)
	const [form] = Form.useForm()

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleSignOut = () => {
		navigate('/')
	}

	const handleSubjectChange = value => {
		console.log('Выбранные предметы:', value)
		dispatch(setSubject(value))
		dispatch(updateSelectedSubjects(value))
	}

	const handleDateChange = value => {
		dispatch(setDate(value)) 
	}

	const handleMenuClick = e => {
		setSelectedContent(e.key)
	}

	useEffect(() => {
		dispatch(calculateTotalScore())
	}, [dispatch])

	const subjectMapping = {
		belarusian: 'Белорусский язык',
		russian: 'Русский язык',
		physics: 'Физика',
		math: 'Математика',
		chemistry: 'Химия',
		biology: 'Биология',
		english: 'Английский язык',
		german: 'Немецкий язык',
		french: 'Французский язык',
		spanish: 'Испанский язык',
		chinese: 'Китайский язык',
		historyOfBelarus: 'История Беларуси',
		socialScience: 'Обществоведение',
		geography: 'География',
		worldHistory: 'Всемирная история',
	}

	const formatMessage = formData => {
		return `
						Полное имя:
						${formData.fullName}

						Телефон:
						${formData.phone}

						Электронная почта:
						${formData.email}

						Дата рождения:
						${new Date(formData.dob).toLocaleDateString('ru-RU', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}

						Предмет для сдачи:
						${subjectMapping[formData.subject]}

						Дата экзамена:
						${formData.date}`
	}

	const onFinish = async values => {
		if (selectedSubject && selectedDate) {
			const dateExists = schedule.some(item => item.date === selectedDate)
			const subjectExists = schedule.some(
				item => item.subject === selectedSubject
			)

			if (dateExists) {
				notification.warning({
					message: 'Дублирование даты',
					description: `Запись с датой ${selectedDate} уже существует.`,
				})
			} else if (subjectExists) {
				notification.warning({
					message: 'Дублирование предмета',
					description: `Предмет уже добавлен`,
				})
			} else {
				dispatch(
					addToSchedule({ subject: selectedSubject, date: selectedDate })
				)
				try {
					await axios.post('https://api.web3forms.com/submit', {
						access_key: 'cd3a3463-fdcd-4953-a667-7e24ef4a9cb0',
						subject: 'Заявление на сдачу экзамена',
						message: formatMessage(values),
					})
				} catch (error) {
					console.error('Ошибка при отправке заявления:', error)
				}
				dispatch(resetSelection())

				form.setFieldsValue({
					subject: null,
					date: null,
				})

				notification.success({
					message: 'Успех',
					description: 'Запись успешно добавлена в расписание.',
				})
			}
		} else {
			notification.error({
				message: 'Ошибка',
				description: 'Выберите предмет и дату.',
			})
		}

		console.log('Form values:', values)
	}

	const renderContent = () => {
		switch (selectedContent) {
			case '1':
				return (
					<Flex
						vertical={true}
						justify='center'
						align='center'
						style={{ width: '100%' }}
						gap={30}
					>
						<Title level={2}>Электронная форма</Title>
						<Flex vertical={true} justify='center' align='center' gap={30}>
							<Form
								form={form}
								name='ct-application'
								onFinish={onFinish}
								layout='vertical'
								style={{
									background: '#fff',
									padding: '20px',
									borderRadius: '8px',
									boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
								}}
							>
								{/* Личные данные */}
								<Flex gap='5%'>
									<div style={{ width: '50%' }}>
										<Form.Item
											name='fullName'
											label='Введите ваше имя'
											rules={[
												{
													required: true,
													message: 'Пожалуйста, введите ваше полное имя',
												},
												{
													min: 3,
													message: 'Имя должно быть не менее 3 символов',
												},
												{
													pattern: /^[а-яА-ЯёЁa-zA-Z\s]+$/,
													message: 'Имя может содержать только буквы',
												},
											]}
										>
											<Input
												prefix={<UserOutlined />}
												placeholder='Полное имя'
											/>
										</Form.Item>
									</div>
									<div style={{ width: '50%' }}>
										<Form.Item
											name='phone'
											label='Номер телефона'
											rules={[
												{
													required: true,
													message: 'Пожалуйста, введите ваш номер телефона',
												},
												{
													pattern: /^(\+375|80)\d{9}$/,
													message:
														'Введите номер в формате +375XXXXXXXXX или 80XXXXXXXXX',
												},
											]}
										>
											<Input
												prefix={<PhoneOutlined />}
												placeholder='Номер телефона'
											/>
										</Form.Item>
									</div>
								</Flex>

								{/* Электронная почта и дата рождения */}
								<Flex gap='5%'>
									<div style={{ width: '50%' }}>
										<Form.Item
											name='email'
											label='Электронная почта'
											rules={[
												{
													required: true,
													message: 'Пожалуйста, введите вашу электронную почту',
												},
												{
													type: 'email',
													message: 'Введите корректный адрес электронной почты',
												},
											]}
										>
											<Input
												prefix={<MailOutlined />}
												placeholder='Электронная почта'
											/>
										</Form.Item>
									</div>
									<div style={{ width: '50%' }}>
										<Form.Item
											name='dob'
											label='Дата рождения'
											rules={[
												{
													required: true,
													message: 'Пожалуйста, выберите вашу дату рождения',
												},
											]}
										>
											<DatePicker
												style={{ width: '100%' }}
												prefix={<CalendarOutlined />}
												placeholder='Дата рождения'
											/>
										</Form.Item>
									</div>
								</Flex>

								{/* Выбор экзаменов */}
								<Form.Item
									name='subject'
									label='Выберите предмет для сдачи'
									rules={[
										{ required: true, message: 'Пожалуйста, выберите предмет' },
									]}
								>
									<Select
										value={selectedSubject}
										onChange={handleSubjectChange}
										placeholder='Выберите предмет'
									>
										<Option value='belarusian'>Белорусский язык</Option>
										<Option value='russian'>Русский язык</Option>
										<Option value='physics'>Физика</Option>
										<Option value='math'>Математика</Option>
										<Option value='chemistry'>Химия</Option>
										<Option value='biology'>Биология</Option>
										<Option value='english'>Английский язык</Option>
										<Option value='german'>Немецкий язык</Option>
										<Option value='french'>Французский язык</Option>
										<Option value='spanish'>Испанский язык</Option>
										<Option value='chinese'>Китайский язык</Option>
										<Option value='historyOfBelarus'>История Беларуси</Option>
										<Option value='socialScience'>Обществоведение</Option>
										<Option value='geography'>География</Option>
										<Option value='worldHistory'>Всемирная история</Option>
									</Select>
								</Form.Item>

								{/* Дата экзамена */}
								<Form.Item
									name='date'
									label='Дата экзамена'
									rules={[
										{ required: true, message: 'Пожалуйста, выберите дату' },
										() => ({
											validator(_, value) {
												if (!value || availableDates.includes(value)) {
													return Promise.resolve()
												}
												return Promise.reject(
													new Error(
														'Выбранная дата недоступна для сдачи экзамена'
													)
												)
											},
										}),
									]}
								>
									<Select
										value={selectedDate}
										onChange={handleDateChange}
										placeholder='Выберите дату'
									>
										{availableDates.map((date, index) => (
											<Option key={index} value={date}>
												{date}
											</Option>
										))}
									</Select>
								</Form.Item>

								{/* Подтверждение */}
								<Form.Item
									name='confirm'
									valuePropName='checked'
									rules={[
										{
											required: true,
											transform: value => value || undefined,
											message: 'Вы должны подтвердить согласие',
										},
									]}
								>
									<Checkbox>
										Я согласен с правилами подачи заявления на ЦТ.
									</Checkbox>
								</Form.Item>

								{/* Кнопка отправки */}
								<Form.Item style={{ textAlign: 'center' }}>
									<Button
										type='primary'
										htmlType='submit'
										size='large'
										style={{ width: '100%' }}
									>
										Отправить заявление
									</Button>
								</Form.Item>
							</Form>
						</Flex>
					</Flex>
				)
			case '2':
				return <Exams/>
			case '3':
				return <Schedule></Schedule>
			case '4':
				return <Universities examData={examData} />
		}
	}

	return (
		<Layout style={{ minHeight: '100vh' }}>
			{/* Сайдбар */}
			<Sider
				width={240}
				breakpoint='md'
				collapsedWidth='0'
				style={{
					backgroundColor: '#4A3AFF',
					padding: '20px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					borderRadius: '0 30px 30px 0',
					height: '100vh',
				}}
				trigger={null}
			>
				<div style={{ textAlign: 'center', marginBottom: '20px' }}>
					<Title level={3} style={{ fontWeight: 'bold', color: '#fff' }}>
						Edu<span style={{ color: '#A6ED8E' }}>Tech</span> Systems
					</Title>
				</div>
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={['1']}
					style={{ backgroundColor: '#4A3AFF', border: 'none' }}
					onClick={handleMenuClick}
				>
					<Menu.Item key='1' icon={<HomeOutlined />} style={{ color: 'white' }}>
						Подача на ЦТ
					</Menu.Item>
					<Menu.Item
						key='2'
						icon={<AppstoreOutlined />}
						style={{ color: 'white' }}
					>
						Экзамены
					</Menu.Item>
					<Menu.Item
						key='3'
						icon={<ScheduleOutlined />}
						style={{ color: 'white' }}
					>
						Расписание
					</Menu.Item>
					<Menu.Item
						key='4'
						icon={<FileTextOutlined />}
						style={{ color: 'white' }}
					>
						Университеты
					</Menu.Item>
					<Menu.Item
						key='5'
						icon={<LogoutOutlined />}
						style={{ color: 'white' }}
					>
						<a onClick={handleSignOut} style={{ fontWeight: 'normal' }}>
							Выход
						</a>
					</Menu.Item>
				</Menu>
			</Sider>

			{/* Drawer для маленьких экранов */}
			<Drawer
				placement='left'
				closable={false}
				onClose={() => setMenuVisible(false)}
				open={menuVisible}
				width='100%'
				bodyStyle={{
					padding: 0,
					backgroundColor: '#4A3AFF',
				}}
			>
				<div style={{ textAlign: 'center', padding: '20px 0' }}>
					<Title level={3} style={{ fontWeight: 'bold', color: '#fff' }}>
						Edu<span style={{ color: '#A6ED8E' }}>Tech</span> Systems
					</Title>
				</div>
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={['1']}
					style={{ backgroundColor: '#4A3AFF', border: 'none' }}
					onClick={handleMenuClick}
				>
					<Menu.Item key='1' icon={<HomeOutlined />} style={{ color: 'white' }}>
						Подача на ЦТ
					</Menu.Item>
					<Menu.Item
						key='2'
						icon={<AppstoreOutlined />}
						style={{ color: 'white' }}
					>
						Экзамены
					</Menu.Item>
					<Menu.Item
						key='3'
						icon={<ScheduleOutlined />}
						style={{ color: 'white' }}
					>
						Расписание
					</Menu.Item>
					<Menu.Item
						key='4'
						icon={<FileTextOutlined />}
						style={{ color: 'white' }}
					>
						Университеты
					</Menu.Item>
					<Menu.Item
						key='5'
						icon={<LogoutOutlined />}
						style={{ color: 'white' }}
					>
						<a onClick={handleSignOut} style={{ fontWeight: 'normal' }}>
							Выход
						</a>
					</Menu.Item>
				</Menu>
			</Drawer>

			{/* Основное содержимое */}
			<Layout
				style={{
					flex: 1,
					marginLeft: 0,
					transition: 'margin-left 0.3s ease',
				}}
			>
				<Header
					style={{
						backgroundColor: 'white',
						padding: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				></Header>

				{/* Содержимое страницы */}
				<Content
					style={{
						margin: '10px 16px 0',
						padding: '15px',
						backgroundColor: 'white',
						borderRadius: '8px',
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
					}}
				>
					{renderContent()}
				</Content>
			</Layout>
		</Layout>
	)
}
