type HeaderProps = {
	pageName: string;
};

export default function Header(props: HeaderProps) {
	return (
		<header className="flex h-15 w-full items-center justify-between border-b px-6">
			<p className="font-medium text-xl">{props.pageName}</p>
		</header>
	);
}
