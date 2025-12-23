export type Goal = {
    id: string,
    name: string,
    categoryTypeId: string,
}
export type GoalsState = {
    goals: Goal[],
    currentGoal: null,
    error: '',
};

export type GoalsCard = {
    name: string
    targetDate: string,
    balance: string,
    targetAmount: string,
};