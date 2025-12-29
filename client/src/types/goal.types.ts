export type Goal = {
    id: string,
    categoryTypeId: string,
    name: string
    targetDate: string,
    balance: string,
    targetAmount: string,
    completed: boolean,
}

export type GoalsState = {
    goals: Goal[],
    currentGoal: Goal | NewGoalsResponse | null,
    error: string | null,
};

export type SpendGoal = {
    categoryTypeId: string,
    categoryId: string,
    amount: string,
    when: string,
    description: string,
};

export type GoalsCard = Pick<Goal, 'id' | 'name' | 'targetDate' | 'balance' | 'targetAmount' | 'completed'>
export type NewGoalsResponse = Omit<Goal, 'balance' | 'categoryTypeId'>
