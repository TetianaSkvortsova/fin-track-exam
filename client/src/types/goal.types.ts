export type Goal = {
    id: string,
    name: string
    targetDate: string,
    balance: string,
    targetAmount: string,
}

export type GoalsState = {
    goals: Goal[],
    currentGoal: null,
    error: string | null,
};

export type GoalsCard = Pick<Goal, 'id' | 'name' | 'targetDate' | 'balance' | 'targetAmount'>
export type NewGoalsResponse = Omit<Goal, 'balance'>
