import Link from 'next/link';

export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-screen">
			<div className="flex border-2 border-red-400">
				<div className="mr-4">sidebar</div>
				<div className="flex   gap-4">
					<Link href={'/?pageNumber=1'}>Main</Link>
					<Link href={'/books?pageNumber=1'}>Book</Link>
					<Link href={'/user?pageNumber=1'}>User</Link>
				</div>
			</div>
			<div className="h-full border-2  border-green-500 flex items-center justify-center">{children}</div>
		</div>
	);
}
