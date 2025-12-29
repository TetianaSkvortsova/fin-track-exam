export type Transaction = {
    id: string;
    categoryTypeId: string;
    categoryId: string;
    when: string;
    description: string;
    amount: string;
    cumulative: boolean;
}

export type TransactionsInitialState = {
    transactions: Transaction[];
    currentTransaction: Transaction | null;
    error?: string;
};

export type RequestAddTransaction = Omit<Transaction, 'id'>;

export type initialRequestState = {
    categoryType: string | null,
    category: string | null,
    startDate: string | null,
    endDate: string | null,
}