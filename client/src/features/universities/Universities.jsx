import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Spin, notification } from 'antd'
import { initializeUniversities } from '../../redux/slices/universitiesSlice'
import universities from '../../univers.js'
import UniversityTable from '../../entities/universities/ui/UniversityTable'
import Filters from '../../features/universities-filter/ui/Filters'
import { useFilters } from '../../features/universities-filter/model/useFilters'

const { Title } = Typography

const Universities = () => {
		const dispatch = useDispatch()
		const {
			isLoading,
			error,
		} = useSelector(state => state.universities)
		const {
			selectedTowns,
			selectedExams,
			setSelectedTowns,
			setSelectedExams,
			resetFilters,
		} = useFilters()

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

	const filteredUniversities = universities.filter(
		uni =>
			(!selectedTowns.length || selectedTowns.includes(uni.town)) &&
			(!selectedExams.length ||
				selectedExams.every(exam =>
					uni.specialties.some(spec => spec.requiredExams.includes(exam))
				))
	)

	return isLoading ? (
		<Spin tip='Загрузка университетов...' />
	) : (
		<div>
			<Title level={3}>Список университетов</Title>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<UniversityTable universities={filteredUniversities} />
				<Filters
					selectedTowns={selectedTowns}
					setSelectedTowns={setSelectedTowns}
					selectedExams={selectedExams}
					setSelectedExams={setSelectedExams}
					resetFilters={resetFilters}
				/>
			</div>
		</div>
	)
}

export default Universities
