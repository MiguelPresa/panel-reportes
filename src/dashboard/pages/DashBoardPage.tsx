import { Outlet } from "react-router-dom";
import { DashBoardLayout } from "../layout";

export const DashBoardPage = () => {
	return (
		<DashBoardLayout>
			<Outlet />
		</DashBoardLayout>

	);
};
