import {TEXT} from "../../constants/textConstants.ts";
import '../../styles/styles.scss';
import GoalCard from "../../components/GoalCard/GoalCard.tsx";
import Button from "@mui/material/Button";

const goals = [
    {
        name: 'New Laptop',
        targetDate: 'Dec 31, 2025',
        balance: '500',
        targetAmount: '2500',
    },
];

function GoalsPage() {
    return (
        <div className={'page-wrapper'}>
            <div className='page-wrapper__header'>
                <h1>{TEXT.TITLES.GOALS_PAGE}</h1>
                <Button
                    variant="contained"
                    // onClick={handleAddTransaction}
                    sx={{
                        backgroundColor: '#4CAF50',
                        fontWeight: 600,
                        height: '40px',
                        '&:hover': {
                            backgroundColor: '#2e7d32',
                            boxShadow: 6,
                        },
                    }}
                >
                    {TEXT.BUTTONS.ADD_GOAL}
                </Button>
            </div>
            {goals.map((goal, index) =>
                <GoalCard key={index} goal={goal}/>
            )}
        </div>
    );
}

export default GoalsPage;