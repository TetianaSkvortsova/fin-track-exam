import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import './GoalCard.scss';
import type {GoalsCard} from "../../types";
import {IconButton, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from "react";

type GoalCardProps = {
    key: number;
    goal: GoalsCard;
}

function GoalCard({key, goal}: GoalCardProps) {
    const progress = Math.min((Number(goal.balance) / Number(goal.targetAmount)) * 100, 100);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className="goals-container">
            <Paper key={key} elevation={2} className="goal-card">
                <div className="goal-card__header">
                    <div className="goal-card__title-row">
                    <h3 className="goal-card__title">{goal.name}</h3>
                        <IconButton
                            aria-label="settings"
                            onClick={handleClick}
                            size="small"
                            className="goal-card__more-button"
                        >
                            <MoreVertIcon fontSize="small"/>
                        </IconButton>
                    </div>
                    <p className="goal-card__date">{goal.targetDate}</p>

                </div>

                <div className="goal-card__footer">
                    <span className="goal-card__current">${goal.balance}</span>
                    <span className="goal-card__target">${goal.targetAmount}</span>
                </div>
                <div className="goal-card__divider"></div>

                <div className="goal-card__progress-container">
                    <div
                        className="goal-card__progress-bar"
                        style={{width: `${progress}%`}}
                    ></div>
                </div>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                    <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>Delete</MenuItem>
                </Menu>
            </Paper>
        </Box>
    );
}

export default GoalCard;