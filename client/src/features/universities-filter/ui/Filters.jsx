import { Card, Checkbox, Button } from 'antd'
import PropTypes from 'prop-types'

const Filters = ({
	selectedTowns,
	setSelectedTowns,
	selectedExams,
	setSelectedExams,
	resetFilters,
}) => {
	return (
		<Card title='Фильтры' bordered={false} style={{ width: 300 }}>
			<div style={{ marginBottom: 16 }}>
				<h4>Выберите город:</h4>
				<Checkbox.Group
					options={['Минск', 'Гродно', 'Витебск', 'Брест', 'Полоцк']}
					value={selectedTowns}
					onChange={setSelectedTowns}
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
					onChange={setSelectedExams}
				/>
			</div>

			<Button type='primary' onClick={resetFilters} style={{ width: '100%' }}>
				Сбросить фильтры
			</Button>
		</Card>
	)
}

Filters.propTypes = {
	selectedTowns: PropTypes.array.isRequired,
	setSelectedTowns: PropTypes.func.isRequired,
	selectedExams: PropTypes.array.isRequired,
	setSelectedExams: PropTypes.func.isRequired,
	resetFilters: PropTypes.func.isRequired,
}

export default Filters
