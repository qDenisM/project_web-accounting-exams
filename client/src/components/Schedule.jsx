import { useSelector } from 'react-redux'
import { Table, Typography } from 'antd'
const { Title } = Typography

const Schedule = () => {
	const { schedule } = useSelector(state => state.schedule)

	const subjectNames = {
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
		worldHistory: 'Всемирная история',
		historyOfBelarus: 'История Беларуси',
		socialScience: 'Обществоведение',
		geography: 'География',
	}

	const processedSchedule = schedule.map(item => ({
		...item,
		subject: subjectNames[item.subject],
	}))

	const columns = [
		{
			title: 'Предмет',
			dataIndex: 'subject',
			key: 'subject',
		},
		{
			title: 'Дата',
			dataIndex: 'date',
			key: 'date',
			render: date => <span>{date}</span>,
		},
		{
			title: 'Время',
			dataIndex: 'time',
			key: 'time',
			render: () => <span>11:00</span>,
		},
	]

	return (
		<div>
			<Title level={3}>Ваше расписание</Title>
			<Table
				columns={columns}
				dataSource={processedSchedule}
				rowKey={record => `${record.subject}-${record.date}`}
				pagination={false}
			/>
		</div>
	)
}

export default Schedule
