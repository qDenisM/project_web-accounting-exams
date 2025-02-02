const universities = [
	{
		id: 1,
		name: 'БГУ',
		town: 'Минск',
		specialties: [
			{
				name: 'Биоинженерия и биоинформатика',
				minScore: 364,
				requiredExams: [
					'Биология',
					'Химия',
					'Русский язык',
					'Белорусский язык',
				],
				studyForm: 'дневная',
			},
			{
				name: 'Микробиология',
				minScore: 347,
				requiredExams: [
					'Биология',
					'Химия',
					'Русский язык',
					'Белорусский язык',
				],
				studyForm: 'дневная',
			},
			{
				name: 'Биотехнология',
				minScore: 337,
				requiredExams: [
					'Биология',
					'Химия',
					'Русский язык',
					'Белорусский язык',
				],
				studyForm: 'дневная',
			},
			{
				name: 'Инженерия',
				minScore: 170,
				requiredExams: ['Физика', 'Математика'],
				studyForm: 'дневная',
			},
			{
				name: 'Физика',
				minScore: 150,
				requiredExams: ['Физика'],
				studyForm: 'заочная',
			},
			{
				name: 'Экономика',
				minScore: 170,
				requiredExams: ['Математика', 'Русский язык'],
				studyForm: 'дневная',
			},
			{
				name: 'Юриспруденция',
				minScore: 160,
				requiredExams: ['Русский язык', 'Обществознание'],
				studyForm: 'заочная',
			},
			{
				name: 'Медицина',
				minScore: 220,
				requiredExams: ['Биология', 'Химия'],
				studyForm: 'дневная',
			},
		],
	},
	{
		id: 2,
		name: 'БНТУ',
		town: 'Минск',
		specialties: [
			{
				name: 'Строительство',
				minScore: 180,
				requiredExams: ['Математика', 'Физика'],
				studyForm: 'дневная',
			},
			{
				name: 'Энергетика',
				minScore: 170,
				requiredExams: ['Физика', 'Математика'],
				studyForm: 'заочная',
			},
			{
				name: 'Автомобилистроение',
				minScore: 160,
				requiredExams: ['Физика', 'Математика'],
				studyForm: 'дневная',
			},
			{
				name: 'Транспорт',
				minScore: 150,
				requiredExams: ['Математика', 'Русский язык'],
				studyForm: 'заочная',
			},
			{
				name: 'Менеджмент',
				minScore: 160,
				requiredExams: ['Математика', 'Русский язык'],
				studyForm: 'дневная',
			},
		],
	},
	{
		id: 3,
		name: 'БГТУ',
		town: 'Минск',
		specialties: [
			{
				name: 'Прикладная математика',
				minScore: 175,
				requiredExams: ['Математика', 'Физика'],
				studyForm: 'заочная',
			},
			{
				name: 'Программирование',
				minScore: 180,
				requiredExams: ['Математика', 'Физика'],
				studyForm: 'дневная',
			},
			{
				name: 'Инженерная механика',
				minScore: 170,
				requiredExams: ['Математика', 'Физика'],
				studyForm: 'заочная',
			},
			{
				name: 'Экология',
				minScore: 160,
				requiredExams: ['Биология', 'Химия'],
				studyForm: 'дневная',
			},
			{
				name: 'Менеджмент',
				minScore: 150,
				requiredExams: ['Математика', 'Русский язык'],
				studyForm: 'заочная',
			},
		],
	},
	{
		id: 4,
		name: 'ГрГУ',
		town: 'Гродно',
		specialties: [
			{
				name: 'Физика',
				minScore: 155,
				requiredExams: ['Физика'],
				studyForm: 'дневная',
			},
			{
				name: 'Математика',
				minScore: 160,
				requiredExams: ['Математика'],
				studyForm: 'заочная',
			},
			{
				name: 'Экономика',
				minScore: 170,
				requiredExams: ['Математика', 'Русский язык'],
				studyForm: 'дневная',
			},
			{
				name: 'Юриспруденция',
				minScore: 180,
				requiredExams: ['Русский язык', 'Обществознание'],
				studyForm: 'заочная',
			},
			{
				name: 'Психология',
				minScore: 160,
				requiredExams: ['Русский язык', 'Обществознание'],
				studyForm: 'дневная',
			},
			{
				name: 'Социология',
				minScore: 150,
				requiredExams: ['Обществознание', 'Русский язык'],
				studyForm: 'заочная',
			},
		],
	},
	{
		id: 5,
		name: 'БГУИР',
		town: 'Минск',
		specialties: [
			{
				name: 'Информационные технологии',
				minScore: 185,
				requiredExams: ['Математика', 'Информатика'],
				studyForm: 'дневная',
			},
			{
				name: 'Программная инженерия',
				minScore: 190,
				requiredExams: ['Математика', 'Информатика'],
				studyForm: 'заочная',
			},
			{
				name: 'Кибербезопасность',
				minScore: 200,
				requiredExams: ['Математика', 'Информатика'],
				studyForm: 'дневная',
			},
			{
				name: 'Системы связи',
				minScore: 170,
				requiredExams: ['Физика', 'Математика'],
				studyForm: 'заочная',
			},
			{
				name: 'Телекоммуникации',
				minScore: 160,
				requiredExams: ['Физика', 'Математика'],
				studyForm: 'дневная',
			},
		],
	},
	{
		id: 6,
		name: 'ПГУ',
		town: 'Полоцк',
		specialties: [
			{
				name: 'Экономика',
				minScore: 160,
				requiredExams: ['Математика', 'Русский язык'],
				studyForm: 'дневная',
			},
			{
				name: 'Менеджмент',
				minScore: 170,
				requiredExams: ['Математика', 'Русский язык'],
				studyForm: 'заочная',
			},
			{
				name: 'Бухгалтерский учет',
				minScore: 150,
				requiredExams: ['Математика', 'Русский язык'],
				studyForm: 'дневная',
			},
			{
				name: 'Маркетинг',
				minScore: 160,
				requiredExams: ['Математика', 'Русский язык'],
				studyForm: 'заочная',
			},
		],
	},
	{
		id: 7,
		name: 'ВГУ',
		town: 'Витебск',
		specialties: [
			{
				name: 'Физика',
				minScore: 155,
				requiredExams: ['Физика'],
				studyForm: 'дневная',
			},
			{
				name: 'Математика',
				minScore: 160,
				requiredExams: ['Математика'],
				studyForm: 'заочная',
			},
			{
				name: 'Программирование',
				minScore: 180,
				requiredExams: ['Математика', 'Физика'],
				studyForm: 'дневная',
			},
			{
				name: 'Экология',
				minScore: 150,
				requiredExams: ['Биология', 'Химия'],
				studyForm: 'заочная',
			},
			{
				name: 'Психология',
				minScore: 160,
				requiredExams: ['Русский язык', 'Обществознание'],
				studyForm: 'дневная',
			},
		],
	},
	{
		id: 8,
		name: 'БДУИР',
		town: 'Минск',
		specialties: [
			{
				name: 'Системы информации',
				minScore: 190,
				requiredExams: ['Математика', 'Информатика'],
				studyForm: 'дневная',
			},
			{
				name: 'Кибербезопасность',
				minScore: 200,
				requiredExams: ['Математика', 'Информатика'],
				studyForm: 'заочная',
			},
			{
				name: 'Интернет-технологии',
				minScore: 185,
				requiredExams: ['Математика', 'Информатика'],
				studyForm: 'дневная',
			},
			{
				name: 'Телевидение',
				minScore: 170,
				requiredExams: ['Русский язык', 'Обществознание'],
				studyForm: 'заочная',
			},
		],
	},
	{
		id: 9,
		name: 'МГПУ',
		town: 'Минск',
		specialties: [
			{
				name: 'Педагогика',
				minScore: 160,
				requiredExams: ['Русский язык', 'Обществознание'],
				studyForm: 'дневная',
			},
			{
				name: 'Психология',
				minScore: 170,
				requiredExams: ['Русский язык', 'Обществознание'],
				studyForm: 'заочная',
			},
			{
				name: 'Социология',
				minScore: 150,
				requiredExams: ['Обществознание', 'Русский язык'],
				studyForm: 'дневная',
			},
		],
	},
]

export default universities
