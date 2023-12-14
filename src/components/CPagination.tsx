import { useState, useEffect, useMemo } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
interface CPaginationProps {
	pages?: number;
}

function CPagination({ pages = 100 }: CPaginationProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams()!;
	const pageNumber = Number(searchParams.get('pageNumber'));
	const numberOfPages: number[] = useMemo(() => new Array(pages).fill(0).map((_, index) => index + 1), [pages]);

	const [currentButton, setCurrentButton] = useState<number>(Number(searchParams.get('pageNumber')));
	const [arrOfCurrButtons, setArrOfCurrButtons] = useState<number[]>([]);

	useEffect(() => {
		let tempNumberOfPages: number[] = [];

		if (numberOfPages.length < 6) {
			tempNumberOfPages = numberOfPages;
		} else if (currentButton >= 1 && currentButton <= 3) {
			tempNumberOfPages = [1, 2, 3, 4, numberOfPages.length];
		} else if (currentButton === 4) {
			const sliced = numberOfPages.slice(0, 5);
			tempNumberOfPages = [...sliced, numberOfPages.length];
		} else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
			const sliced1 = numberOfPages.slice(currentButton - 2, currentButton);
			const sliced2 = numberOfPages.slice(currentButton, currentButton + 1);
			tempNumberOfPages = [1, ...sliced1, ...sliced2, numberOfPages.length];
		} else if (currentButton > numberOfPages.length - 3) {
			const sliced = numberOfPages.slice(numberOfPages.length - 4);
			tempNumberOfPages = [1, ...sliced];
		} else {
			tempNumberOfPages = [1, currentButton - 1, currentButton, currentButton + 1, numberOfPages.length];
		}

		setArrOfCurrButtons(tempNumberOfPages);
	}, [currentButton, numberOfPages]);

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);
			return params.toString();
		},
		[searchParams]
	);

	const navigateToPage = (pages: number) => {
		if (pages >= 1 && pages <= pages && pages !== pageNumber) {
			router.push(pathname + '?' + createQueryString('pageNumber', pages.toString()));
		}
	};

	return (
		<div className="pagination-container">
			<button
				className={`${currentButton === 1 ? 'disabled' : ''}`}
				onClick={() => {
					if (pageNumber === 1) {
						return;
					}
					setCurrentButton(pageNumber - 1);
					navigateToPage(pageNumber - 1);
				}}
			>
				Prev
			</button>

			{arrOfCurrButtons.map((item, index) => {
				console.log(item);
				return (
					<button
						key={index}
						className={`${currentButton === item ? 'active' : ''}`}
						onClick={() => {
							setCurrentButton(item);
							navigateToPage(item);
						}}
					>
						{item}
					</button>
				);
			})}

			<button
				className={`${currentButton === numberOfPages.length ? 'disabled' : ''}`}
				onClick={() => {
					if (pages === pageNumber) {
						return;
					}
					setCurrentButton(pageNumber + 1);
					navigateToPage(pageNumber + 1);
				}}
			>
				Next
			</button>
		</div>
	);
}

export default CPagination;
