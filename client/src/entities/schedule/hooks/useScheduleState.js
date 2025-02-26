import { useSelector, useDispatch } from 'react-redux'
import { setSubject, setDate } from '../../../redux/slices/scheduleSlice'

export const useScheduleState = () => {
	const dispatch = useDispatch()
	const { selectedSubject, availableDates, selectedDate, schedule } =
		useSelector(state => state.schedule)

	const changeSubject = (value) => {
		dispatch(setSubject(value))
	}

	const changeDate = (value) => {
		dispatch(setDate(value))
	}

	return {
		selectedSubject,
		availableDates,
		selectedDate,
		schedule,
		changeSubject,
		changeDate,
	}
}
