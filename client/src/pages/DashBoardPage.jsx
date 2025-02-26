import { Layout, Menu, Typography } from 'antd'
import { useExamState } from '../entities/exam/hooks/useExamState'
import { useSignOut } from '../features/auth/hooks/useSignOut'
import { useDashboardLogic } from '../features/application/hooks/useDashboardLogic'
import {
	HomeOutlined,
	AppstoreOutlined,
	ScheduleOutlined,
	FileTextOutlined,
	LogoutOutlined,
} from '@ant-design/icons'
import Schedule from '../components/Schedule'
import Universities from '../components/Universities'
import Exams from '../components/Exams'
import ApplicationForm from '../features/application/components/ApplicationForm'

const { Sider, Content, Header } = Layout
const { Title } = Typography

export default function Dashboard() {
	const { selectedContent, handleMenuClick } = useDashboardLogic()
	const { signOut } = useSignOut()
	const { examData } = useExamState()

	const renderContent = () => {
		switch (selectedContent) {
			case '1':
				return <ApplicationForm></ApplicationForm>
			case '2':
				return <Exams />
			case '3':
				return <Schedule></Schedule>
			case '4':
				return <Universities examData={examData} />
		}
	}

	return (
		<Layout style={{ minHeight: '100vh' }}>
			{/* Сайдбар */}
			<Sider
				width={240}
				breakpoint='md'
				collapsedWidth='0'
				style={{
					backgroundColor: '#4A3AFF',
					padding: '20px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					borderRadius: '0 30px 30px 0',
					height: '100vh',
				}}
				trigger={null}
			>
				<div style={{ textAlign: 'center', marginBottom: '20px' }}>
					<Title level={3} style={{ fontWeight: 'bold', color: '#fff' }}>
						Edu<span style={{ color: '#A6ED8E' }}>Tech</span> Systems
					</Title>
				</div>
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={['1']}
					style={{ backgroundColor: '#4A3AFF', border: 'none' }}
					onClick={handleMenuClick}
				>
					<Menu.Item key='1' icon={<HomeOutlined />} style={{ color: 'white' }}>
						Подача на ЦТ
					</Menu.Item>
					<Menu.Item
						key='2'
						icon={<AppstoreOutlined />}
						style={{ color: 'white' }}
					>
						Экзамены
					</Menu.Item>
					<Menu.Item
						key='3'
						icon={<ScheduleOutlined />}
						style={{ color: 'white' }}
					>
						Расписание
					</Menu.Item>
					<Menu.Item
						key='4'
						icon={<FileTextOutlined />}
						style={{ color: 'white' }}
					>
						Университеты
					</Menu.Item>
					<Menu.Item
						key='5'
						icon={<LogoutOutlined />}
						style={{ color: 'white' }}
					>
						<a onClick={signOut} style={{ fontWeight: 'normal' }}>
							Выход
						</a>
					</Menu.Item>
				</Menu>
			</Sider>

			{/* Основное содержимое */}
			<Layout
				style={{
					flex: 1,
					marginLeft: 0,
					transition: 'margin-left 0.3s ease',
				}}
			>
				<Header
					style={{
						backgroundColor: 'white',
						padding: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				></Header>

				{/* Содержимое страницы */}
				<Content
					style={{
						margin: '10px 16px 0',
						padding: '15px',
						backgroundColor: 'white',
						borderRadius: '8px',
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
					}}
				>
					{renderContent()}
				</Content>
			</Layout>
		</Layout>
	)
}
