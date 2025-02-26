import {
	Form,
	Input,
	Button,
	Select,
	DatePicker,
	Checkbox,
	notification,
	Flex,
	Typography,
} from 'antd'
import {
	UserOutlined,
	PhoneOutlined,
	MailOutlined,
	CalendarOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { addToSchedule, resetSelection } from '../../../redux/slices/scheduleSlice'
import { useFormInstance } from '../../../shared/hooks/useFormInstance'
import { useScheduleState } from '../../../entities/schedule/hooks/useScheduleState'
import { useExamState } from '../../../entities/exam/hooks/useExamState'

const { Option } = Select
const { Title } = Typography

export default function ApplicationForm() {
	const form = useFormInstance()
	const dispatch = useDispatch()
  const {
      selectedSubject,
      availableDates,
      selectedDate,
      schedule,
      changeSubject,
      changeDate,
    } = useScheduleState()

  const { updateSubjects } = useExamState()

	const handleSubmit = () => {
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
	}

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
					onFinish={handleSubmit}
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
								<Input prefix={<UserOutlined />} placeholder='Полное имя' />
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
							onChange={value => {
								changeSubject(value)
								updateSubjects(value)
							}}
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
										new Error('Выбранная дата недоступна для сдачи экзамена')
									)
								},
							}),
						]}
					>
						<Select
							value={selectedDate}
							onChange={changeDate}
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
						<Checkbox>Я согласен с правилами подачи заявления на ЦТ.</Checkbox>
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
}
