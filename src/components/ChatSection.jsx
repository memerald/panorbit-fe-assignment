import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Arrow from "../assets/arrow.svg";
import Chat from "../assets/chat.svg";
import Close from "../assets/close.svg";
import Send from "../assets/send-message.svg";
import { getUsers } from "../redux/userSlice";

const ChatSection = () => {
	const [show, setShow] = useState(false);
	const [showChat, setShowChat] = useState(false);
	const [chatUser, setChatUser] = useState({});
	const [chatArrow, setChatArrow] = useState(true);

	const [userData, setUserData] = useState(null);
	const userState = useSelector((state) => state?.userData);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	useEffect(() => {
		setUserData(userState?.userData?.users);
	}, [userData, userState]);

	return (
		<div className="relative bg-white">
			<div className="absolute -bottom-[57px] right-16">
				<div
					className="bg-[#2C64C8] w-[300px] text-white p-4 rounded-tl-xl rounded-tr-xl flex justify-between items-center cursor-pointer"
					onClick={() => setShow(!show)}>
					<div className="flex">
						<div className="h-5 w-5">
							<img src={Chat} alt="chat" className="-scale-x-100 " />
						</div>
						<div className="ml-4">Chat</div>
					</div>
					<div className={`h-5 w-5 ${show ? "-rotate-90" : "rotate-90"}`}>
						<img src={Arrow} alt="arrow" />
					</div>
				</div>
				<div>
					{show ? (
						<div className="h-80 w-full overflow-y-scroll border border-[#2C64C8] bg-white p-3 scroll-width">
							{userData
								? userData.map((user, index) => {
										return (
											<div
												key={index}
												className="cursor-pointer flex justify-between items-center w-full py-1"
												onClick={() => {
													setShowChat(true);
													setChatUser(user);
												}}>
												<div className="flex">
													<div className="h-8 w-8">
														<img
															src={user.profilepicture}
															alt=""
															className="rounded-full"
														/>
													</div>
													<p className="ml-2 text-xl">{user?.name}</p>
												</div>
												<div
													className={`h-3 w-3 rounded-full ${
														index % 2 === 0
															? "bg-green-500"
															: " bg-gray-500"
													} `}></div>
											</div>
										);
								  })
								: userState?.userDataLoading && <h2>Loading...</h2>}
							<div onClick={() => setShowChat(!showChat)}></div>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
			{showChat ? (
				<div className="absolute -bottom-[57px] right-96">
					<div className="w-64">
						<div className="bg-[#2C64C8] w-64 text-white p-4 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
							<div className="flex">
								<div className="h-6 w-6">
									<img
										src={chatUser.profilepicture}
										alt=""
										className="rounded-full"
									/>
								</div>
								<p className="ml-3">{chatUser.name}</p>
							</div>
							<div className="flex items-center">
								<div
									className={`h-5 w-5 cursor-pointer ${
										chatArrow ? "-rotate-90" : "rotate-90"
									}`}
									onClick={() => setChatArrow(!chatArrow)}>
									<img src={Arrow} alt="arrow" />
								</div>
								<div
									className="h-3 w-3 cursor-pointer ml-3"
									onClick={() => setShowChat(!showChat)}>
									<img src={Close} alt="close" />
								</div>
							</div>
						</div>
						<div>
							{chatArrow ? (
								<div className="h-52 w-full overflow-y-scroll border border-x-[#2C64C8] bg-white px-6 py-4 scroll-width">
									<div className="text-center mb-3">7:20</div>
									<div className="text-left bg-gray-200 w-[75%] rounded p-2 break-words">
										Lorem ipsum dolor sit.
									</div>
									<div className="text-left bg-gray-200 w-[75%] rounded p-2 my-2">
										Lorem, ipsum.
									</div>
									<div className="text-center my-3">9:20</div>
									<div className="flex justify-end">
										<div className="text-right bg-gray-200 w-[75%] rounded p-2">
											Lorem, ipsum.
										</div>
									</div>
									<div className="flex justify-end my-2">
										<div className="text-right bg-gray-200 w-[75%] rounded p-2">
											Lorem, ipsum.
										</div>
									</div>
									<div className="text-center my-3">12:20</div>
									<div className="text-left bg-gray-200 w-[75%] rounded p-2 break-words">
										Lorem ipsum dolor sit.
									</div>
									<div className="flex justify-end my-2">
										<div className="text-right bg-gray-200 w-[75%] rounded p-2">
											Lorem, ipsum.
										</div>
									</div>
								</div>
							) : (
								<></>
							)}
							{chatArrow ? (
								<div className="border border-gray-500 p-1 px-2 flex justify-between focus:border-none">
									<input type="text" placeholder="Enter Text" />
									<div className="h-5 w-5">
										<img src={Send} alt="" />
									</div>
								</div>
							) : null}
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default ChatSection;
