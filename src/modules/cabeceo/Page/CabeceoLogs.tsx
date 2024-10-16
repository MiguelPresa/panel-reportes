import { Header } from "@/dashboard";
import { cabeceoRouterLinks } from "../routes";
import { DataTableContentFile, DateFile, SelectFiles, SelectFolders } from "../components";

export const CabeceoLogs = () => {
	return (
		<>
			<Header headerContent={[
				cabeceoRouterLinks[0],
				cabeceoRouterLinks[1],
			]} />
			<h1 className="text-3xl">Logs cabeceo</h1>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nulla totam ipsa dolore animi laudantium.</p>
			<section className="mt-5 flex justify-start items-start sm:flex-row sm:gap-16 flex-col gap-4 ">
				<SelectFolders />
				<DateFile />
				<SelectFiles />
			</section>
			<DataTableContentFile />
		</>
	)
};
