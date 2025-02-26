import { useSelector, useDispatch } from 'react-redux'
import {
	updateSelectedSubjects,
	calculateTotalScore,
} from '../../../redux/slices/examSlice'
import { useEffect } from 'react'

export const useExamState = () => {
	const dispatch = useDispatch()
	const { examData } = useSelector(state => state.exam)

	const updateSubjects = (subjects) => {
		dispatch(updateSelectedSubjects(subjects))
	}

	useEffect(() => {
		dispatch(calculateTotalScore())
	}, [dispatch])

	return { examData, updateSubjects }
}
