'use client';

import CPagination from '@/components/CPagination';

export default function Home() {
	return (
		<div className="flex flex-col justify-center items-center">
			<h1>User</h1>
			<CPagination />
		</div>
	);
}
