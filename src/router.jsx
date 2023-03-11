import React from "react";
import { Route, Routes, useRouteError } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import Todo from "./pages/Todo";

export const ErrorPage = () => {
	const error = useRouteError();
	return (
		<div className="w-full text-center font-extrabold uppercase">
			<h2 className="text-4xl">Oops, page not found!</h2>
			<h3 className="text-2xl">{error.message}</h3>
		</div>
	);
};

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} errorElement={<ErrorPage />} />
			<Route path="" element={<Sidebar />}>
				<Route path="/profile/:profileId" element={<Profile />} />
				<Route path="/posts" element={<Posts />} />
				<Route path="/gallery" element={<Gallery />} />
				<Route path="/todo" element={<Todo />} />
			</Route>
		</Routes>
	);
};

export default Router;
