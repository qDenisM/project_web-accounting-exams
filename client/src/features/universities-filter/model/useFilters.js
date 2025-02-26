import { useState } from 'react'

export const useFilters = () => {
	const [selectedTowns, setSelectedTowns] = useState([])
	const [selectedExams, setSelectedExams] = useState([])
	const [minScore, setMinScore] = useState(0)

	const resetFilters = () => {
		setSelectedTowns([])
		setSelectedExams([])
		setMinScore(0)
	}

	return {
		selectedTowns,
		selectedExams,
		minScore,
		setSelectedTowns,
		setSelectedExams,
		setMinScore,
		resetFilters,
	}
}
