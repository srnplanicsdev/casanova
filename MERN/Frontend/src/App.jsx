import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Navbar from "./componants/Navbar";
import WorkoutPage from "./page/WorkoutPage";
import Login from "./page/auth/Login";
import Register from "./page/auth/Register";
import { useAuthContext } from "./hooks/useAuthContext";
import Property from "./page/property/Property";
function App() {
    const { user } = useAuthContext();
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route
                        path="/login"
                        element={!user ? <Login /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/register"
                        element={!user ? <Register /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/"
                        element={
                            user ? <WorkoutPage /> : <Navigate to="/login" />
                        }
                    ></Route>
                    <Route path="/property" element={<Property />}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
