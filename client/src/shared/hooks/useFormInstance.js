import { Form } from 'antd'

export const useFormInstance = () => {
	const [form] = Form.useForm()
	return form
}
