import { Table } from 'antd'
import universities from '../../../univers.js'

const UniversityTable = () => {
	const columns = [
		{
			title: 'Название',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Город',
			dataIndex: 'town',
			key: 'town',
		},
		{
			title: 'Проходной балл',
			dataIndex: 'specialties',
			key: 'specialties',
			render: specialties => Math.min(...specialties.map(s => s.minScore)),
		},
		{
			title: 'Специальности',
			dataIndex: 'specialties',
			key: 'specialties',
			render: specialties => specialties.map(s => s.name).join(', '),
		},
	]

	return <Table columns={columns} dataSource={universities} rowKey='id' />
}

export default UniversityTable
