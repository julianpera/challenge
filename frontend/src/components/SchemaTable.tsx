import { Table } from 'antd'
import dateFormat from 'dateformat'
import { FC } from 'react'
import { SchemaTableProps } from '../@types'

const SchemaTable: FC<SchemaTableProps> = ({ schema, entities }) => {
	const tableColumns = Object.entries(schema).map(([key, value]) => ({
		title: value.displayText,
		dataIndex: key,
		key: key,
		render: (val: any) =>
			value.type === 'date' ? dateFormat(val, 'dd/mm/yyyy') : value.type === 'string' ? val : null,
	}))

	const tableSource = entities.map((entity: any) => ({
		...entity,
		key: entity._id,
	}))

	return <Table columns={tableColumns} dataSource={tableSource} />
}

export default SchemaTable
