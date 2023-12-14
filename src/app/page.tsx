'use client';

import { useState } from 'react';

import CPagination from '@/components/CPagination';
import Pagination from '@/components/Pagination';
export default function Home() {
	return (
		<div className='flex flex-col justify-center items-center'>
			{/* <Pagination /> */}
			<CPagination />
		</div>
	);
}
