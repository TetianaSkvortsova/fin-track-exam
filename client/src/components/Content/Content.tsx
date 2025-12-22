import {Navigate, Route, Routes} from "react-router"; // Виправлено імпорт
import { menuItems } from "../Menu/menu.ts";
import HomePage from "../../pages/HomePage/HomePage.tsx";

function Content() {
    const isAuth = sessionStorage.getItem('token');
    return (
        <Routes>
            <Route path="/" element={!isAuth ? <HomePage /> : <Navigate to="/dashboard" />} />
            {menuItems.map(({ path, Component }) => (
                <Route
                    key={path}
                    path={path}
                    element={<Component />}
                />
            ))}
            <Route path="*" element={<div>No page</div>} />
        </Routes>
    );
}

export default Content;