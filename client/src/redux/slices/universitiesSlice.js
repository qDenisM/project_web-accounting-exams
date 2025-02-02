import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	universities: [], 
	filteredUniversities: [], 
	isLoading: false, 
	error: null, 
}

const universitiesSlice = createSlice({
	name: 'universities',
	initialState,
	reducers: {
		initializeUniversities: (state, action) => {
			state.universities = action.payload
			state.filteredUniversities = action.payload 
		},
		filterByTown: (state, action) => {
			state.filteredUniversities = state.universities.filter(
				uni => uni.town === action.payload
			)
		},
		resetFilter: state => {
			state.filteredUniversities = state.universities
		},
	},
})

export const { initializeUniversities, filterByTown, resetFilter } =
	universitiesSlice.actions

export default universitiesSlice.reducer
