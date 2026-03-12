import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { dispatch } = useAuthContext();
    const handleLogout = () => {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
    };
    return (
        <div className=" w-full bg-amber-100 ">
            <div className="container flex items-center justify-between h-20">
                <div className="text-2xl font-bold ms-20 ">Home</div>
                <div>
                    {user ? (
                        <div>
                            <span className="">{user.email}</span>
                            <button
                                onClick={() => handleLogout()}
                                className="bg-gray-50 px-4 py-1 rounded "
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-5">
                            <button className="bg-gray-50 px-4 py-1 rounded ">
                                <Link to={"/register"}>Register</Link>
                            </button>
                            <button className="bg-gray-50 px-4 py-1 rounded ">
                                <Link to={"/login"}>Login</Link>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
