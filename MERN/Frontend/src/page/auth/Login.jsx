import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { api } from "../../utils/api";

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const { dispatch } = useAuthContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        let err = {};
        if (!user.email) {
            err.email = "Email is required";
        }
        if (!user.password) {
            err.password = "Password is required";
        }
        setErrors(err);
        return Object.keys(err).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!validate()) return;
            const responce = await api.post("/user/login", {
                email: user.email,
                password: user.password,
            });
            if (responce.data) {
                console.log(responce.data);
                localStorage.setItem("user", JSON.stringify(responce.data));
                dispatch({ type: "LOGIN", payload: responce.data });
                setUser({ email: "", password: "" });
            }
        } catch (error) {
            console.error(error);
            setErrors((prev) => ({
                ...prev,
                other: error.response.data.error,
            }));
        }
    };
    return (
        <div className="flex items-center justify-center w-full min-h-screen">
            <div className="flex flex-col items-center justify-center w-1/4 bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form
                    className="flex flex-col gap-4 w-full"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-2">
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="border border-gray-300 rounded-md p-2"
                        />
                        <p className="text-red-500 leading-tight text-sm">
                            {errors.email}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="border border-gray-300 rounded-md p-2"
                        />
                        <p className="text-red-500 leading-tight text-sm">
                            {errors.password}
                        </p>
                    </div>
                    <p className="text-red-500 leading-tight text-sm">
                        {errors.other}
                    </p>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 rounded-md"
                    >
                        Login
                    </button>
                </form>
                <p className="text-gray-500 leading-tight mt-4 text-sm">
                    
                    Have an account?
                    <Link to="/register" className="text-blue-500">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
