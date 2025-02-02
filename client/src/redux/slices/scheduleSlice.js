import { createSlice } from '@reduxjs/toolkit'

const subjectDates = {
	belarusian: ['30 мая'],
	russian: ['30 мая'],
	physics: ['27 мая', '6 июня'],
	math: ['27 мая', '3 июня'],
	chemistry: ['27 мая', '6 июня'],
	biology: ['27 мая', '3 июня'],
	english: ['27 мая', '3 июня'],
	german: ['27 мая', '3 июня'],
	french: ['27 мая', '3 июня'],
	spanish: ['27 мая', '3 июня'],
	chinese: ['27 мая', '3 июня'],
	historyOfBelarus: ['27 мая', '6 июня'],
	socialScience: ['27 мая', '6 июня'],
	geography: ['27 мая', '3 июня'],
	worldHistory: ['27 мая', '3 июня'],
}

const scheduleSlice = createSlice({
	name: 'schedule',
	initialState: {
		exams: [],
		items: [],
		selectedSubject: null,
		selectedDate: null,
		availableDates: [],
		schedule: [],
		isLoading: false,
		error: null,
	},
	reducers: {
		filterExams: (state, action) => {
			state.exams = state.exams.filter(
				exam => exam.date >= action.payload.startDate
			)
		},
		setSubject: (state, action) => {
			const selectedSubject = action.payload
			state.selectedSubject = selectedSubject
			state.availableDates = subjectDates[selectedSubject] || []
			state.selectedDate = null
		},
		setDate: (state, action) => {
			const selectedDate = action.payload
			state.selectedDate = selectedDate
		},
		addToSchedule: (state, action) => {
			const { subject, date } = action.payload

			const dateExists = state.schedule.some(item => item.date === date)

			if (!dateExists) {
				state.schedule.push({ subject, date })
			} else {
				console.log('Запись с такой датой уже существует:', date)
			}
		},
		resetSelection: state => {
			state.selectedSubject = null
			state.selectedDate = null
		},
	},
})

export const {
	filterExams,
	setSubject,
	setDate,
	addToSchedule,
	resetSelection,
} = scheduleSlice.actions

export default scheduleSlice.reducer
