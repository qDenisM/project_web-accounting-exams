import { Spin, Flex } from 'antd'
import { Loading3QuartersOutlined } from '@ant-design/icons'

export default function Loading() {
	return (
		<Flex
			vertical={true}
			align='center'
			justify='center'
			style={{ height: '100vh', backgroundColor: '#f9f9f9' }}
		>
			<Spin indicator={<Loading3QuartersOutlined spin />} size='large' />
			<p style={{ fontSize: '16px', color: '#555', marginTop: '10px' }}>
				Загрузка...
			</p>
		</Flex>
	)
}
