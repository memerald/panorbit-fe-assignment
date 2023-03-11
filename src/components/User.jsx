import React from "react";

const User = ({ label, value, className }) => {
	return (
		<div className={`flex justify-center w-[550px] ${className}`}>
			<p className="basis-1/4 text-right">{label}</p>
			<p className="basis-1/12 text-center w-10">:</p>
			<p className="text-[#595959] font-semibold basis-1/2 text-left">{value}</p>
		</div>
	);
};

export default User;
