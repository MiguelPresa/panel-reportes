import "./ErrorPage.css";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

export function ErrorPage() {
	const error = useRouteError();

	let errorMessage: string;

	if (isRouteErrorResponse(error)) {
		// error is type `ErrorResponse`
		errorMessage = error.statusText || error.data?.message || "An error occurred";
	} else if (error instanceof Error) {
		errorMessage = error.message;
	} else if (typeof error === 'string') {
		errorMessage = error;
	} else {
		console.error(error);
		errorMessage = 'Unknown error';
	}

	return (
		<div id="error-page" className="error-page mt-5">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{errorMessage}</i>
			</p>
			<Link
				className={
					cn(
						"my-5 dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
						buttonVariants({ variant: "default", size: "sm" }),
					)
				}
				to="/"
			>
				Go to home
			</Link>
		</div>
	);
}