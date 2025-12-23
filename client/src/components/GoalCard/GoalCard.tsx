import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import './GoalCard.scss';

const goals = [
    {
        name: 'New Laptop',
        targetDate: 'Dec 31, 2025',
        balance: 850,
        targetAmount: 2500,
    },
];

function GoalCard() {
    return (
        <Box className="goals-container">
            {goals.map((goal, index) => {
                // Розраховуємо прогрес у відсотках
                const progress = Math.min((goal.balance / goal.targetAmount) * 100, 100);

                return (
                    <Paper key={index} elevation={0} className="goal-card">
                        <div className="goal-card__header">
                            <h3 className="goal-card__title">{goal.name}</h3>
                            <p className="goal-card__date">{goal.targetDate}</p>
                        </div>
                        <div className="goal-card__footer">
                            <span className="goal-card__target">${goal.targetAmount}</span>
                            <span className="goal-card__current">${goal.balance}</span>
                        </div>
                        <div className="goal-card__divider"></div>

                        {/* Смужка прогресу */}
                        <div className="goal-card__progress-container">
                            <div
                                className="goal-card__progress-bar"
                                style={{width: `${progress}%`}}
                            ></div>
                        </div>
                    </Paper>
                );
            })}
        </Box>
    );
}

export default GoalCard;