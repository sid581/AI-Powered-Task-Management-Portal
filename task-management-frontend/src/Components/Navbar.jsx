import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

const Navbar = () => {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-white border-b">

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}

                <button
                    onClick={() => navigate("/dashboard")}
                    className="text-2xl font-bold text-blue-600"
                >
                    TaskFlow
                </button>

                {/* Right side */}

                <div className="flex items-center gap-4">

                    {/* <button
                        onClick={() => navigate("/create-task")}
                        className="hidden sm:block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
                    >
                        + New Task
                    </button> */}

                    <button
                        onClick={handleLogout}
                        className="border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;