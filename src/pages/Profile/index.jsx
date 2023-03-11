import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import User from "../../components/User";

const Profile = () => {
	const containerStyle = {
		width: "100%",
		height: "100%",
	};

	const [profileData, setProfileData] = useState(null);
	const getCurrentUser = useSelector((state) => state?.userData?.currentUser);
	const location = useLocation();

	useEffect(() => {
		location.state ? setProfileData(location?.state?.user) : setProfileData(getCurrentUser);
	}, [location]);

	return (
		<>
			<div className="flex text-gray-400 text-2xl pt-16">
				<div className="flex flex-col items-center w-1/3">
					{/* user profile block */}
					<img
						src={profileData?.profilepicture}
						alt="profile picture"
						className="rounded-[50%] w-52 h-52"
					/>
					<p className="my-3 text-[#595959] font-semibold">{profileData?.name}</p>
					<div>
						<User label="Username" value={profileData?.username} />
						<User label="E-mail" value={profileData?.email} className="my-3" />
						<User
							label="Phone"
							value={profileData?.phone?.split("hotlink-ok").join("")}
						/>
						<User label="Website" value={profileData?.website} className="my-3" />
					</div>
					<hr className="w-2/3 border-gray-300 mt-4 mb-3" />
					<div className="w-[550px]">
						{/* user company block */}
						<h3 className="my-3 text-center font-medium">Company</h3>
						<User label="Name" value={profileData?.company?.name} />
						<User
							label="Catchphrase"
							value={profileData?.company?.catchPhrase}
							className="my-3"
						/>
						<User label="Bs" value={profileData?.company?.bs} />
					</div>
				</div>
				<div className="border-r border-gray-300 w-0.5 mx-5"></div>
				<div className="ml-10">
					{/* user address block */}
					<h3>Address:</h3>
					<div className="mb-5">
						<User
							label="Street"
							value={profileData?.address?.street}
							className="my-3"
						/>
						<User label="Suite" value={profileData?.address?.suite} />
						<User label="City" value={profileData?.address?.city} className="my-3" />
						<User label="Zipcode" value={profileData?.address?.zipcode} />
					</div>
					<div className="w-[750px] h-[375px] rounded-2xl overflow-hidden">
						{/* google maps block */}
						<LoadScript googleMapsApiKey="AIzaSyAoeC-jhvkXaUUCYG8S4KiSzGCxCoiFAO0">
							<GoogleMap
								mapContainerStyle={containerStyle}
								center={{
									lat: +profileData?.address?.geo?.lat
										?.split("hotlink-ok")
										.join(""),
									lng: +profileData?.address?.geo?.lng
										?.split("hotlink-ok")
										.join(""),
								}}
								zoom={18}>
								<Marker
									position={{
										lat: +profileData?.address?.geo?.lat
											?.split("hotlink-ok")
											.join(""),
										lng: +profileData?.address?.geo?.lng
											?.split("hotlink-ok")
											.join(""),
									}}
								/>
							</GoogleMap>
						</LoadScript>
					</div>
					<div className="flex text-sm justify-end mt-3">
						<p>
							Lat:{" "}
							<span className="text-black font-semibold">
								{profileData?.address?.geo?.lat.split("-hotlink-ok").join("")}
							</span>
						</p>
						<p className="ml-4">
							Long:{" "}
							<span className="text-black font-semibold">
								{profileData?.address?.geo?.lng.split("-hotlink-ok").join("")}
							</span>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
