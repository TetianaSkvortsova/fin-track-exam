import * as React from 'react';
import Button from '@mui/material/Button';
import {IconButton, Menu, MenuItem, Typography} from "@mui/material";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import './Header.scss';

function Header() {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAuth(false);
        console.log('logout');
    }

    return (
        <div className="header-container">
            <div className="header-balance">
                <Typography
                    component="p"
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                    }}
                >
                    Total Balance:
                </Typography>
                <Typography
                    component="p"
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                    }}>
                    &#36; 12500.00
                </Typography>
            </div>
            <div>
                <Button variant="contained" color="success" className="AddTransactionButton" size="large">
                    <Typography component="span" fontWeight="bold">
                        Add Transaction
                    </Typography>
                </Button>

                {auth && (
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            sx={{
                                color: 'grey',
                            }}
                        >
                            <AccountCircleRoundedIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleLogout}>Exit</MenuItem>
                        </Menu>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;