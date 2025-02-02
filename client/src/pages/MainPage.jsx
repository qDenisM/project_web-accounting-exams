import {
	Layout,
	Button,
	Typography,
	Row,
	Col,
	Card,
	Avatar,
	Grid,
	Flex,
	Image,
} from 'antd'
import 'antd/dist/reset.css'
import HeaderComp from '../components/MainHeader'
import Images from '../Images'
import { useNavigate } from 'react-router-dom'

const { Content, Footer } = Layout
const { Title, Text } = Typography
const { useBreakpoint } = Grid

export default function MainPage() {
	const screens = useBreakpoint()
	const navigate = useNavigate()

	const handleLogin = () => {
		navigate('/login')
	}

	const handleRegister = () => {
		navigate('/register')
	}

	const avatarSize = screens.xl
		? 200
		: screens.lg
		? 180
		: screens.md
		? 140
		: screens.sm
		? 140
		: 140

	return (
		<Layout>
			<style>
				{`
          .startNow::after, .signIn::after {
            border-bottom: none !important;
          }
        `}
			</style>
			<HeaderComp></HeaderComp>
			<Content
				style={{
					padding: '50px',
				}}
			>
				<Flex
					justify='center'
					align='center'
					gap='20%'
					style={{ width: '100%', maxWidth: '100%' }}
				>
					<Typography style={{ width: '30%' }}>
						<Title style={{ fontSize: '60px' }}>Электронный учет ЦТ</Title>
						<Text style={{ fontSize: '30px', lineHeight: '35px' }}>
							Легкий и быстрый способ подать документы в учебные заведения через
							веб сервис
						</Text>
					</Typography>
					<Image
						preview={false}
						src={Images.electro_ct}
						style={{ borderRadius: '100px' }}
					></Image>
				</Flex>
			</Content>

			<Content
				style={{
					padding: '50px',
					textAlign: 'right',
					backgroundColor: '#4a3aff',
				}}
			>
				<Row gutter={[16, 16]} style={{ marginTop: '30px' }}>
					<Col
						xs={{ span: 24, offset: 0 }}
						sm={{ span: 14, offset: 12 }}
						md={{ span: 10, offset: 14 }}
						lg={{ span: 6, offset: 15 }}
					>
						<Card style={{ backgroundColor: '#FEF1E2', border: 'none' }}>
							<Avatar
								size={avatarSize}
								src={Images.electro_ct}
								style={{ marginBottom: '15px' }}
								alt='Электронный учет ЦТ'
							/>
							<Typography.Title style={{ textAlign: 'left' }} level={1}>
								Электронный учет ЦТ
							</Typography.Title>
						</Card>
					</Col>
				</Row>

				<Row gutter={[16, 16]} style={{ marginTop: '30px' }}>
					<Col
						xs={{ span: 24, offset: 0 }}
						sm={{ span: 14, offset: 6 }}
						md={{ span: 10, offset: 7 }}
						lg={{ span: 6, offset: 9 }}
					>
						<Card style={{ backgroundColor: '#102F2E', border: 'none' }}>
							<Avatar
								size={avatarSize}
								src={Images.online}
								style={{ marginBottom: '15px' }}
								alt='Подача документов онлайн'
							/>
							<Typography.Title
								style={{ textAlign: 'left', color: '#fff' }}
								level={1}
							>
								Подача документов онлайн
							</Typography.Title>
						</Card>
					</Col>
				</Row>

				<Row gutter={[16, 16]} style={{ marginTop: '30px' }}>
					<Col
						xs={{ span: 24, offset: 0 }}
						sm={{ span: 14, offset: 0 }}
						md={{ span: 10, offset: 0 }}
						lg={{ span: 6, offset: 3 }}
					>
						<Card style={{ backgroundColor: '#DBEDF5', border: 'none' }}>
							<Avatar
								size={avatarSize}
								src={Images.Bitmap}
								style={{ marginBottom: '15px' }}
								alt='Проверка доступных вузов'
							/>
							<Typography.Title style={{ textAlign: 'left' }} level={1}>
								Проверка доступных вузов
							</Typography.Title>
						</Card>
					</Col>
				</Row>
			</Content>

			<Content
				style={{
					textAlign: 'center',
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					padding: '50px',
					backgroundColor: '#f5f5f5',
				}}
			>
				<Title style={{ textAlign: 'left', width: '75%' }} level={1}>
					Отзывы наших пользователей
				</Title>
				<Row justify='center' style={{ marginTop: '30px' }}>
					<Col xs={24} sm={18} md={12} lg={10}>
						<Card
							style={{
								backgroundColor: '#fff4e6',
								borderRadius: '10px',
								boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
								textAlign: 'left',
								padding: '20px',
							}}
						>
							<Flex
								vertical={true}
								gap='30px'
								style={{
									marginBottom: '10px',
								}}
							>
								<Avatar
									size={70}
									src={Images.review}
									style={{ marginRight: '15px' }}
								/>
								<Typography>
									<Title level={4}>Иван Иванов:</Title>
								</Typography>
								<Text type='secondary'>
									&quot;Сервис значительно упростил подачу документов. Все
									прошло быстро и без проблем. Очень доволен результатом!&quot;
								</Text>
							</Flex>
						</Card>
					</Col>
				</Row>
			</Content>

			<Content
				style={{ padding: '50px', backgroundColor: '#fff', width: '100%' }}
			>
				<Flex vertical={true} style={{ width: '100%' }} justify='center'>
					<Title
						level={1}
						style={{
							color: '#064C2E',
							width: '50%',
							marginLeft: '11%',
							marginBottom: '30px',
						}}
					>
						Часто задаваемые вопросы
					</Title>
					<Flex justify='center'>
						<Flex
							wrap='wrap'
							justify='space-between'
							gap={0}
							style={{ width: '80%' }}
						>
							<div style={{ marginBottom: '32px', width: '50%' }}>
								<Card bordered={false} style={{ boxShadow: 'none' }}>
									<Title level={4}>
										Как узнать, в какие вузы я могу поступить по моим баллам?
									</Title>
									<Text type='secondary'>
										Воспользуйтесь функцией &quot;Университеты&quot;, чтобы узнать, куда проходят ваши баллы.
									</Text>
								</Card>
							</div>
							<div style={{ marginBottom: '32px', width: '50%' }}>
								<Card bordered={false} style={{ boxShadow: 'none' }}>
									<Title level={4}>Какие документы нужно загружать?</Title>
									<Text type='secondary'>
										Обычно требуется аттестат, результаты ЦТ и другие
										документы, зависящие от требований конкретного вуза.
									</Text>
								</Card>
							</div>
							<div style={{ marginBottom: '32px', width: '50%' }}>
								<Card bordered={false} style={{ boxShadow: 'none' }}>
									<Title level={4}>
										Можно ли податься сразу на несколько экзаменов?
									</Title>
									<Text type='secondary'>
										Да, наш сервис позволяет отправить документы сразу на несколько экзаменов.
									</Text>
								</Card>
							</div>
							<div style={{ marginBottom: '32px', width: '50%' }}>
								<Card bordered={false} style={{ boxShadow: 'none' }}>
									<Title level={4}>
										Безопасны ли мои данные на вашей платформе?
									</Title>
									<Text type='secondary'>
										Да, мы используем современные методы шифрования и защиты
										данных, чтобы обеспечить безопасность вашей информации.
									</Text>
								</Card>
							</div>
							<div style={{ marginBottom: '32px', width: '50%' }}>
								<Card bordered={false} style={{ boxShadow: 'none' }}>
									<Title level={4}>
										Что делать, если у меня возникли проблемы с подачей
										документов?
									</Title>
									<Text type='secondary'>
										Вы всегда можете обратиться в нашу службу поддержки через
										чат на сайте или по контактам, указанным в разделе
										&quot;Связаться с нами&quot;.
									</Text>
								</Card>
							</div>
						</Flex>
					</Flex>
				</Flex>
			</Content>

			<Footer
				style={{
					backgroundColor: '#ffffff',
					borderTop: '1px solid #E0E0E0',
				}}
			>
				<Flex
					justify='space-around'
					align='center'
					gap='20%'
					style={{ marginBottom: '20px', height: '100px' }}
				>
					<Title level={3} style={{ fontWeight: 'bold', color: '#4d4d4d' }}>
						Edu<span style={{ color: '#4A3AFF' }}>Tech</span> Systems
					</Title>
					<div>
						<Button
							type='primary'
							onClick={handleRegister}
							style={{ marginRight: '10px' }}
						>
							Зарегистрироваться
						</Button>
						<Button type='default' onClick={handleLogin}>
							Войти
						</Button>
					</div>
				</Flex>
				<div style={{ borderTop: '1px solid #E0E0E0', margin: '20px 0' }}></div>
				<Flex
					justify='space-around'
					align='center'
					gap='20%'
					style={{ marginBottom: '20px', height: '75px' }}
				>
					<Text level={6} style={{ color: '#888888' }}>
						&copy; EduTech Systems 2024. Мы заботимся о наших пользователях!
					</Text>
				</Flex>
			</Footer>
		</Layout>
	)
}
