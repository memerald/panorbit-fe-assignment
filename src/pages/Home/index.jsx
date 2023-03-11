import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUser, getUsers } from "../../redux/userSlice";

const Home = () => {
	const [userData, setUserData] = useState(null);
	const state = useSelector((state) => state?.userData);
	const dispatch = useDispatch();

	const sendCurrentUser = (user) => {
		dispatch(getCurrentUser(user));
	};

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	useEffect(() => {
		setUserData(state?.userData?.users);
	}, [userData, state]);

	return (
		<>
			<div className="flex flex-col justify-center items-center w-full h-[100vh] home-background">
				<div className="w-1/3 bg-white rounded-3xl pb-6 user-card-container">
					<h2 className="text-center text-2xl rounded-t-3xl bg-gray-100 py-12">
						Select an account
					</h2>
					<div className="flex flex-col">
						<div className="w-full ">
							<div className="max-h-[400px] h-full overflow-y-auto user-card">
								{userData
									? userData.map((user, index) => {
											return (
												<React.Fragment key={index}>
													<Link
														onClick={() => sendCurrentUser(user)}
														to={`/profile/${user.id}`}
														state={{ user: user }}>
														<div className="cursor-pointer flex items-center my-3 ml-10 mr-5">
															<img
																src={user.profilepicture}
																alt="profile picture"
																className="rounded-[50%] w-8 h-8 mr-3"
															/>
															<p className="text-left text-xl">
																{user.name}
															</p>
														</div>
													</Link>
													{!(userData?.length - 1 === index) && (
														<hr className="w-11/12 ml-10 mr-5" />
													)}
												</React.Fragment>
											);
									  })
									: state?.userDataLoading && <h2>Loading...</h2>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
