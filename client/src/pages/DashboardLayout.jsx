import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { createContext, useContext, useState } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

// loader = pre-fetch / pre-fetching
export const loader = async () => {
	try {
		const { data } = await customFetch.get("/users/current-user");
		return data;
	} catch (error) {
		return redirect("/");
	}
};

const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
	// temp
	// const user = {
	// 	name: "jenny",
	// };

	const { user } = useLoaderData();
	// console.log(data);

	const [showSidebar, setShowSidebar] = useState(false);
	const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

	const navigate = useNavigate();

	const toggleDarkTheme = () => {
		const newDarkTheme = !isDarkTheme;

		setIsDarkTheme(newDarkTheme);

		document.body.classList.toggle("dark-theme", newDarkTheme);
		localStorage.setItem("darkTheme", newDarkTheme);
	};

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const logoutUser = async () => {
		navigate("/");
		await customFetch.get("/auth/logout");
		toast.success("Logging out....");
	};

	return (
		// This dashboard context is used in the navbar, bigsidebar, and smallsidebar
		<DashboardContext.Provider
			value={{
				user,
				showSidebar,
				isDarkTheme,
				toggleDarkTheme,
				toggleSidebar,
				logoutUser,
			}}
		>
			<Wrapper>
				<main className="dashboard">
					<SmallSidebar />
					<BigSidebar />
					<div>
						<Navbar />
						<div className="dashboard-page">
							<Outlet context={{ user }} />
						</div>
					</div>
				</main>
			</Wrapper>
		</DashboardContext.Provider>
	);
};

export const useDashboardContext = () => {
	return useContext(DashboardContext);
};

export default DashboardLayout;
