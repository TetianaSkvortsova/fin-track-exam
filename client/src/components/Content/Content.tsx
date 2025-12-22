import {Navigate, Route, Routes} from "react-router"; // Виправлено імпорт
import { menuItems } from "../Menu/menu.ts";
import HomePage from "../../pages/HomePage/HomePage.tsx";
import {useAppSelector} from "../../store/hooks.ts";

function Content() {
    // const isAuth = sessionStorage.getItem('token');
    const isAuth = useAppSelector(state => state.user.isAuthenticated);
    return (
        <Routes>
            <Route path="/" element={!isAuth ? <HomePage /> : <Navigate to="/dashboard" />} />
            {menuItems.map(({ path, Component }) => (
                <Route
                    key={path}
                    path={path}
                    element={isAuth ? <Component /> : <Navigate to="/" />}
                />
            ))}
            <Route path="*" element={<div>No page</div>} />
        </Routes>
    );
}

export default Content;