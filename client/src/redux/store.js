import { configureStore } from '@reduxjs/toolkit'
import scheduleReducer from './slices/scheduleSlice'
import universitiesReducer from './slices/universitiesSlice'
import examSlice from './slices/examSlice'

const store = configureStore({
	reducer: {
		schedule: scheduleReducer,
		universities: universitiesReducer,
		exam: examSlice,
	},
})

export default store
