import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
		<ToastContainer position="top-center" />
	</React.StrictMode>
);

// USE FOR DEMO | PROXY SERVER TEST
// import axios from "axios";
// import customFetch from "./utils/customFetch.js";

// top level await
// const response = await axios.get("/api/v1/test");
// console.log(response.data);

// const response = await customFetch.get("/test");
// console.log(response.data);

// fetch("/api/v1/test")
// 	.then((res) => {
// 		return res.json(); // don't forget to return
// 	})
// 	.then((data) => {
// 		console.log(data);
// 	});

// fetch("/api/v1/test")
// 	.then((res) => res.json())
// 	.then((data) => console.log(data));
