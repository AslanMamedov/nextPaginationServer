'use client';
import { FC } from 'react';

interface IData {
	id: number;
	name: string;
	age: number;
	city: string;
	country: string;
	phoneNumber: string;
	isMarried: string;
	isChildren: string;
}

interface IColumns {
	dataKey: string;
	header: string;
	renderProps?: (item: IData) => JSX.Element;
}

interface ICTableProps {
	data: IData[];
	columns: IColumns[];
	renderRowActions: {
		header: string;
		action: (item: IData) => JSX.Element;
	};
}

export const CTable: FC<ICTableProps> = ({ data, columns, renderRowActions }) => {
	return (
		<table>
			<thead>
				<tr>
					{columns.map(({ header }, i) => (
						<th key={i} scope="col">
							{header}
						</th>
					))}
					{renderRowActions && <th scope="col">{renderRowActions.header}</th>}
				</tr>
			</thead>
			<tbody>
				{data.map((item, i) => (
					<tr key={item.id}>
						{columns.map((colum, i) => (
							<td key={i} scope="col">
								{!!colum.renderProps ? colum.renderProps(item) : item[colum.dataKey as keyof IData]}
							</td>
						))}
						{renderRowActions && <th scope="col">{renderRowActions.action(item)}</th>}
					</tr>
				))}
			</tbody>
		</table>
	);
};
