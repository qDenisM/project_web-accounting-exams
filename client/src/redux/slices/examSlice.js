import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	examData: [],
	selectedSubjects: [],
}

const examSlice = createSlice({
	name: 'exam',
	initialState,
	reducers: {
		calculateTotalScore(state) {
			const totalScore = state.examData
				.filter(exam => exam.name !== 'Балл')
				.reduce((sum, exam) => sum + exam.score, 0)

			const index = state.examData.findIndex(exam => exam.name === 'Балл')
			if (index === -1) {
				state.examData.push({ name: 'Балл', score: totalScore })
			} else {
				state.examData[index].score = totalScore
			}

			state.examData.sort((a, b) =>
				a.name === 'Балл' ? 1 : b.name === 'Балл' ? -1 : 0
			)
		},

		updateSelectedSubjects(state, action) {
			state.selectedSubjects = action.payload
		},
		updateScores(state, action) {
			const { attestat, ct, subject } = action.payload

			if (attestat) {
				const attestatIndex = state.examData.findIndex(
					exam => exam.name === 'Аттестат'
				)
				if (attestatIndex === -1) {
					state.examData.push({ name: 'Аттестат', score: attestat })
				} else {
					state.examData[attestatIndex].score = attestat
				}
			}

			const ctSubjects = state.examData.filter(exam =>
				[
					'Русский язык',
					'Математика',
					'История Беларуси',
					'Биология',
					'Английский язык',
					'Белорусский язык',
					'Физика',
					'Химия',
					'Немецкий язык',
					'Французский язык',
					'Испанский язык',
					'Китайский язык',
					'Обществоведение',
					'География',
					'Всемирная история',
				].includes(exam.name)
			)

			if (subject && ct) {
				const subjectIndex = state.examData.findIndex(
					exam => exam.name === subject
				)

				if (subjectIndex === -1 && ctSubjects.length >= 3) {
					throw new Error('Нельзя добавить больше 3 предметов ЦТ.')
				}

				if (subjectIndex === -1) {
					state.examData.push({ name: subject, score: ct })
				} else {
					state.examData[subjectIndex].score = ct
				}
			}

			state.examData.sort((a, b) =>
				a.name === 'Балл' ? 1 : b.name === 'Балл' ? -1 : 0
			)
		},
	},
})

export const { calculateTotalScore, updateSelectedSubjects, updateScores } =
	examSlice.actions
export default examSlice.reducer
