import {TEXT} from "../../constants/textConstants.ts";
import '../../styles/styles.scss';
import GoalCard from "../../components/GoalCard/GoalCard.tsx";

function GoalsPage() {
    return (
        <div className={'page-wrapper'}>
            <h1>{TEXT.TITLES.GOALS_PAGE}</h1>
            <GoalCard />
        </div>
    );
}

export default GoalsPage;