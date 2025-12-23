import {TEXT} from "../../constants/textConstants.ts";
import '../../styles/styles.scss';
import GoalCard from "../../components/GoalCard/GoalCard.tsx";
import Button from "@mui/material/Button";
import {openModal} from "../../store/modal/modalSlice.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect} from "react";
import {getGoals} from "../../store/goals/goalsSlice.ts";

function GoalsPage() {
    const dispatch = useAppDispatch();
    const goals = useAppSelector(state => state.goals.goals);

    useEffect(() => {
        dispatch(getGoals());
    }, [dispatch]);

    const handleAddGoal = () => {
        dispatch(openModal({ type: 'ADD_GOAL' }));
    }

    return (
        <div className={'page-wrapper'}>
            <div className='page-wrapper__header'>
                <h1>{TEXT.TITLES.GOALS_PAGE}</h1>
                <Button
                    variant="contained"
                    onClick={handleAddGoal}
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
            <div className='page-wrapper__cards'>
                {goals.map((goal, index) =>
                    <GoalCard key={index} goal={goal}/>
                )}
            </div>
        </div>
    );
}

export default GoalsPage;