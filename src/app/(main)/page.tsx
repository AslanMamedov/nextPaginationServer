'use client';

import CPagination from '@/components/CPagination';
import { CTable } from '@/components/CTable';
export default function Home() {
	const data = [
		{
			id: 1,
			name: 'Aslan',
			age: 1994,
			city: 'Baky',
			country: 'Azerbaijan',
			phoneNumber: '+994553857484',
			isMarried: true ? 'Yes' : 'No',
			isChildren: false ? 'Yes' : 'No',
		},
		{
			id: 2,
			name: 'Sabir',
			age: 1995,
			city: 'Baky',
			country: 'Azerbaijan',
			phoneNumber: '+994553857484',
			isMarried: true ? 'Yes' : 'No',
			isChildren: false ? 'Yes' : 'No',
		},
	];

	const columns = [
		{
			dataKey: 'id',
			header: 'ID',
		},
		{
			dataKey: 'info',
			header: 'Info',
			renderProps: (item: any) => {
				return <button onClick={() => console.log(item)}>Info</button>;
			},
		},
		{
			dataKey: 'name',
			header: ' Name',
		},
		{
			dataKey: 'age',
			header: 'Age',
		},
		{
			dataKey: 'city',
			header: 'City',
			renderProps: (item: any) => {
				return <div>{item.city} 111</div>;
			},
		},
		{
			dataKey: 'country',
			header: 'Country',
		},
		{
			dataKey: 'phoneNumber',
			header: 'Phone Number',
		},
		{
			dataKey: 'isMarried',
			header: 'Married',
		},
		{
			dataKey: 'isChildren',
			header: 'Children',
		},
	];

	const tableData = {
		data,
		columns,
		renderRowActions: {
			header: 'Action',
			action: (data: any) => {
				return (
					<div className="flex gap-2">
						<button className="border border-red-500 rounded-2xl p-2" onClick={() => console.log(data)}>
							Edit
						</button>
						<button className="border border-red-500 rounded-2xl p-2" onClick={() => console.log(data.id)}>
							Delete
						</button>
					</div>
				);
			},
		},
	};

	return (
		<div className="flex flex-col justify-center items-center">
			<h1>Table</h1>
			<CTable {...tableData} />
			<CPagination />
		</div>
	);
}
