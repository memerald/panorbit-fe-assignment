import { Menu, Popover, Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../redux/userSlice";
import ChatSection from "./ChatSection";

const Sidebar = () => {
	const [profileData, setProfileData] = useState(null);
	const [allUsers, setAllUsers] = useState(null);
	const getAllUsers = useSelector((state) => state?.userData?.userData?.users);
	const currentUser = useSelector((state) => state?.userData?.currentUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const location = useLocation();

	const navLinks = ["profile", "posts", "gallery", "todo"];

	const switchUser = (nextUser) => {
		dispatch(getCurrentUser(nextUser));
	};

	useEffect(() => {
		setAllUsers(getAllUsers);
	}, [getAllUsers]);

	useEffect(() => {
		setProfileData(currentUser);
	}, [currentUser]);

	useEffect(() => {
		!location.state && navigate("/");
	}, [getAllUsers]);

	const navigateToPage = (link) => {
		if (link === "profile") navigate("/profile/" + params.profileId);
		else navigate("/" + link);
	};

	return (
		<div className="flex p-10 h-[100vh]">
			<div className="h-full w-1/5">
				<div className="h-full flex flex-col justify-center items-start sidebar-bg pl-20 rounded-3xl text-xl">
					{navLinks.map((link, index) => {
						return (
							<React.Fragment key={index}>
								<p
									className={`cursor-pointer text-white capitalize my-4 ${
										link === location.pathname.split("/")[1]
											? "opacity-100 font-bold"
											: "opacity-80"
									}`}
									onClick={() => navigateToPage(link)}>
									{link}
								</p>
								{navLinks.length - 1 !== index && (
									<hr className="w-3/5 opacity-50" />
								)}
							</React.Fragment>
						);
					})}
				</div>
			</div>
			<div className="w-4/5 ml-16">
				<div className="border-b border-gray-300 h-14 py-7">
					<div className="flex justify-between items-center h-full cursor-pointer">
						<h3 className="text-2xl text-[#595959] font-semibold">Profile</h3>
						<Popover className="relative">
							<Popover.Button>
								<div className="flex items-center">
									<img
										src={profileData?.profilepicture}
										alt="profile picture"
										className="rounded-[50%] w-8 h-8 mr-3"
									/>
									<p className="text-lg text-gray-600 font-medium">
										{profileData?.name}
									</p>
								</div>
							</Popover.Button>
							<Popover.Panel className="absolute z-10 right-1 top-11">
								<div className="flex flex-col items-center bg-white user-card-container h-auto rounded-xl w-60 py-11">
									<img
										src={profileData?.profilepicture}
										alt="profile picture"
										className="rounded-[50%] h-16 w-16"
									/>
									<p>{profileData?.name}</p>
									<p>{profileData?.email}</p>
									<hr className="w-2/3 border-gray-300 mt-4 mb-3" />
									{/* filter user in menu to print next 2 users */}
									<div>
										{allUsers
											?.filter((user) =>
												allUsers?.length - 1 === currentUser?.id
													? allUsers[0]
													: currentUser?.id + 1 === user?.id,
											)
											.map((nextUser, index) => (
												<Link
													onClick={() => switchUser(nextUser)}
													to={`/profile/${nextUser.id}`}
													key={index}>
													<div className="flex cursor-pointer">
														<img
															src={nextUser?.profilepicture}
															alt="profile picture"
															className="h-7 w-7 rounded-[50%] mr-2"
														/>
														<p>{nextUser?.name}</p>
													</div>
												</Link>
											))}
									</div>
									<hr className="w-2/3 border-gray-300 mt-4 mb-3" />
									<div>
										{allUsers
											?.filter((user) =>
												allUsers?.length === currentUser?.id
													? allUsers[1]
													: currentUser?.id + 2 === user?.id,
											)
											.map((nextUser, index) => (
												<Link to={`/profile/${nextUser.id}`} key={index}>
													<div className="flex cursor-pointer">
														<img
															src={nextUser?.profilepicture}
															alt="profile picture"
															className="h-7 w-7 rounded-[50%] mr-2"
														/>
														<p>{nextUser?.name}</p>
													</div>
												</Link>
											))}
									</div>
									<div>
										<button
											onClick={() => navigate("/")}
											className="bg-[#D55151] text-white rounded-2xl px-4 py-2">
											Sign Out
										</button>
									</div>
								</div>
							</Popover.Panel>
						</Popover>
					</div>
				</div>
				<Outlet />
				<ChatSection />
			</div>
		</div>
	);
};

export default Sidebar;
