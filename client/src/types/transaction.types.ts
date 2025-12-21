export type Transaction = {
    id: string;
    categoryTypeId: string;
    categoryName: string;
    when: string;
    description: string;
    amount: string;
}

export type TransactionsInitialState = {
    transactions: Transaction[];
    error?: string;
};

export type RequestAddTransaction = Omit<Transaction, 'id'>;

export type TransactionFormErrors = {
    [key in keyof RequestAddTransaction]?: string;
}