import { notification } from 'antd'

export function useNotification() {
	const showError = (message, description) => {
		notification.error({
			message,
			description,
		})
	}

	const showSuccess = (message, description) => {
		notification.success({
			message,
			description,
		})
	}

	const showWarning = (message, description) => {
		notification.warning({
			message,
			description,
		})
	}

	return { showError, showSuccess, showWarning }
}
