import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { NavItemsTypes } from "../types";
import { Fragment } from "react/jsx-runtime";

interface HeaderProps {
	headerContent: NavItemsTypes[]
}
export const Header = ({ headerContent = [] }: HeaderProps) => {
	return (
		<header
			className="pt-2 h-7 hidden sm:flex"
		>
			<Breadcrumb className="">
				<BreadcrumbList>
					<BreadcrumbItem>
						<Link to="/">Home</Link>
					</BreadcrumbItem>
					{
						headerContent.map(link => {
							return (
								<Fragment key={link.title}>
									<BreadcrumbSeparator />
									{
										link.title === headerContent[headerContent.length - 1].title ?
											<BreadcrumbItem >
												<BreadcrumbPage>{link.title}</BreadcrumbPage>
											</BreadcrumbItem>
											:
											<BreadcrumbItem>
												<Link to={link.link}>{link.title}</Link>
											</BreadcrumbItem>
									}
								</Fragment>
							)

						})
					}
				</BreadcrumbList>
			</Breadcrumb>

		</header>
	)
};
