import { useState } from 'react'

export const useDashboardLogic = () => {
	const [selectedContent, setSelectedContent] = useState('1')

	const handleMenuClick = (e) => {
		setSelectedContent(e.key)
	}

	return { selectedContent, handleMenuClick }
}
