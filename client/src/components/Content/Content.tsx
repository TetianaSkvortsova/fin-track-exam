import {Navigate, Route, Routes} from "react-router"; // Виправлено імпорт
import { menuItems } from "../Menu/menu.ts";
import HomePage from "../../pages/HomePage/HomePage.tsx";

function Content() {
    const isAuth = sessionStorage.getItem('token');
    return (
        <Routes>
            <Route path="/" element={isAuth ? <Navigate to="/dashboard" replace /> : <HomePage /> } />
            {menuItems.map(({ path, Component }) => (
                <Route
                    key={path}
                    path={path}
                    element={isAuth ? <Component /> : <Navigate to="/" replace/>}
                />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default Content;