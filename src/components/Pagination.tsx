'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

const Pagination = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams()!;
	const pageNumber = Number(searchParams.get('pageNumber'));
	const pageSize = 10;
	const totalPages = 10; // Update this value with the total number of pages in your data

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);
			return params.toString();
		},
		[searchParams]
	);

	const navigateToPage = (page: number) => {
		if (page >= 1 && page <= totalPages && page !== pageNumber) {
			router.push(pathname + '?' + createQueryString('pageNumber', page.toString()));
		}
	};

	const renderPageButtons = (start: number, end: number) => {
		return Array.from({ length: end - start + 1 }, (_, index) => start + index);
	};

	return (
		<div className="flex justify-center items-center">
			<div className="flex border border-green-300 p-4 justify-between">
				<button className="mr-2" disabled={pageNumber === totalPages} onClick={() => navigateToPage(pageNumber + 1)}>
					Next
				</button>

				<div className="flex">
					{renderPageButtons(1, 2).map((page) => (
						<button
							className={`mx-2 ${page === pageNumber ? 'bg-gray-300' : ''}`}
							key={page}
							onClick={() => navigateToPage(page)}
						>
							{page}
						</button>
					))}
					{renderPageButtons(pageNumber - 2, pageNumber + 2).map((page) => (
						<button
							className={`mx-2 ${page === pageNumber ? 'bg-gray-300' : ''}`}
							key={page}
							onClick={() => navigateToPage(page)}
						>
							{page}
						</button>
					))}
					{renderPageButtons(totalPages - 1, totalPages).map((page) => (
						<button
							className={`mx-2 ${page === pageNumber ? 'bg-gray-300' : ''}`}
							key={page}
							onClick={() => navigateToPage(page)}
						>
							{page}
						</button>
					))}
				</div>

				<button className="ml-2" disabled={pageNumber === 1} onClick={() => navigateToPage(pageNumber - 1)}>
					Previous
				</button>
			</div>
		</div>
	);
};

export default Pagination;
