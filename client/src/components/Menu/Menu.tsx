import {NavLink} from "react-router";
import {menuItems} from "./menu";
import "./Menu.scss";
import {AccountBalanceWallet} from "@mui/icons-material";

function Menu() {
    return (
        <aside className="sidebar">
            <div className="sidebar__logo">
                <div className="logo-icon">
                    <span><AccountBalanceWallet sx={{marginRight: 0.5, marginBottom: -1.1, fontSize: 35}}/></span>
                    <div className="check-badge">✓</div>
                </div>
                <span className="logo-text">FinTrack</span>
            </div>

            <nav className="sidebar__nav">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({isActive}) =>
                                `nav-item ${isActive ? 'nav-item--active' : ''}`
                            }
                        >
                            <span className="nav-item__icon"><Icon fontSize="small" /></span>
                            <span className="nav-item__title">{item.title}</span>
                        </NavLink>
                    )
                })}
            </nav>
        </aside>
    );
}

export default Menu;