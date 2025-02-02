import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
	Table,
	Spin,
	notification,
	Checkbox,
	Card,
	Button,
	Typography,
} from 'antd'
import { initializeUniversities } from '../redux/slices/universitiesSlice'
import universities from '../univers'
const { Title } = Typography

const Universities = ({ examData }) => {
	const dispatch = useDispatch()
	const { isLoading, error } = useSelector(state => state.universities)

	const [selectedTowns, setSelectedTowns] = useState([])
	const [selectedExams, setSelectedExams] = useState([])
	const [minScore, setMinScore] = useState(0)

	useEffect(() => {
		dispatch(initializeUniversities(universities))
	}, [dispatch])

	useEffect(() => {
		if (error) {
			notification.error({
				message: 'Ошибка загрузки',
				description: error,
			})
		}
	}, [error])

	const isExamsPassed = requiredExams => {
		const passedExamNames = examData.map(exam => exam.name)
		return requiredExams.every(exam => passedExamNames.includes(exam))
	}

	const uniqueExamData = examData.filter(
		(value, index, self) => index === self.findIndex(t => t.name === value.name)
	)

	const totalScore =
		uniqueExamData.reduce((sum, exam) => sum + (exam.score || 0), 0) / 2

	const filteredData = universities
		.filter(uni => {
			const townMatch = selectedTowns.length
				? selectedTowns.includes(uni.town)
				: true

			const specialtiesMatch = uni.specialties.filter(specialty => {
				const specialtyMatch =
					specialty.minScore <= totalScore &&
					isExamsPassed(specialty.requiredExams)

				const minScoreMatch = minScore ? specialty.minScore <= minScore : true

				const examsMatch = selectedExams.length
					? selectedExams.every(exam => specialty.requiredExams.includes(exam))
					: true

				return specialtyMatch && minScoreMatch && examsMatch
			})

			return townMatch && specialtiesMatch.length > 0
		})
		.map(uni => ({
			...uni,
			specialties: uni.specialties.filter(specialty => {
				const specialtyMatch =
					specialty.minScore <= totalScore &&
					isExamsPassed(specialty.requiredExams)
				const minScoreMatch = minScore ? specialty.minScore <= minScore : true
				const examsMatch = selectedExams.length
					? selectedExams.every(exam => specialty.requiredExams.includes(exam))
					: true
				return specialtyMatch && minScoreMatch && examsMatch
			}),
		}))
		.filter(uni => {
			return uni.specialties.some(specialty => specialty.minScore <= totalScore)
		})

	const columns = [
		{
			title: 'Название',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Город',
			dataIndex: 'town',
			key: 'town',
		},
		{
			title: 'Проходной балл',
			dataIndex: 'specialties',
			key: 'specialties',
			render: specialties =>
				Math.min(...specialties.map(specialty => specialty.minScore)),
		},
		{
			title: 'Специальности',
			dataIndex: 'specialties',
			key: 'specialties',
			render: specialties =>
				specialties.map(specialty => specialty.name).join(', '),
		},
	]

	const expandedRowRender = record => {
		return (
			<Table
				columns={[
					{
						title: 'Специальность',
						dataIndex: 'name',
						key: 'name',
					},
					{
						title: 'Проходной балл',
						dataIndex: 'minScore',
						key: 'minScore',
					},
					{
						title: 'Необходимые экзамены',
						dataIndex: 'requiredExams',
						key: 'requiredExams',
						render: exams => exams.join(', '),
					},
				]}
				dataSource={record.specialties}
				pagination={false}
				rowKey='name'
			/>
		)
	}

	const handleTownChange = checkedValues => {
		setSelectedTowns(checkedValues)
	}

	const handleExamChange = checkedValues => {
		setSelectedExams(checkedValues)
	}

	return isLoading ? (
		<Spin tip='Загрузка университетов...' />
	) : (
		<div>
			<Title level={3}>Список университетов</Title>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<div style={{ flex: 3 }}>
					<Table
						columns={columns}
						dataSource={filteredData}
						rowKey='id'
						expandable={{ expandedRowRender }}
						pagination={false}
					/>
				</div>
				<div style={{ flex: 1, marginLeft: 20 }}>
					<Card title='Фильтры' bordered={false} style={{ width: 300 }}>
						<div style={{ marginBottom: 16 }}>
							<h4>Выберите город:</h4>
							<Checkbox.Group
								options={['Минск', 'Гродно', 'Витебск', 'Брест', 'Полоцк']}
								value={selectedTowns}
								onChange={handleTownChange}
							/>
						</div>

						<div style={{ marginBottom: 16 }}>
							<h4>Выберите экзамены:</h4>
							<Checkbox.Group
								options={[
									'Математика',
									'Физика',
									'Русский язык',
									'Биология',
									'Химия',
								]}
								value={selectedExams}
								onChange={handleExamChange}
							/>
						</div>

						<Button
							type='primary'
							onClick={() => {
								setSelectedTowns([])
								setSelectedExams([])
								setMinScore(0)
							}}
							style={{ width: '100%' }}
						>
							Сбросить фильтры
						</Button>
					</Card>
				</div>
			</div>
		</div>
	)
}

Universities.propTypes = {
	examData: PropTypes.array.isRequired,
}

export default Universities
