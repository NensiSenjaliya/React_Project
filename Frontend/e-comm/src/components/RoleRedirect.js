import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("User");
        if (!userData) {
            navigate("/signup");
        } else {
            const user = JSON.parse(userData);
            if (user.role === "admin") {
                navigate("/admin-panel");
            } else {
                navigate("/user-panel");
            }
        }
    }, [navigate]);

    return null;
};

export default RoleRedirect;
