import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
}

function Input({ className, type, startIcon, endIcon, ...props }: InputProps) {
	return (
		<div className="relative flex items-center max-sm:w-full">
			{startIcon && (
				<div className="pointer-events-none absolute left-3 z-10 h-4 w-4 text-muted-foreground">
					{startIcon}
				</div>
			)}

			<input
				type={type}
				autoComplete="off"
				data-slot="input"
				className={cn(
					"flex h-9 w-full rounded-md border border-input bg-primary-white-esteio py-1 text-base text-muted-foreground shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
					"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
					"aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
					startIcon ? "pl-10" : "px-3",
					endIcon ? "pr-10" : startIcon ? "" : "px-3",
					className,
				)}
				{...props}
			/>

			{endIcon && (
				<div className="pointer-events-none absolute right-3 z-10 h-4 w-4 text-muted-foreground">
					{endIcon}
				</div>
			)}
		</div>
	);
}

export { Input };
