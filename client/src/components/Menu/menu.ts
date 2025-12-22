import DashboardPage from "../../pages/DashboardPage/DashboardPage.tsx";
import TransactionsPage from "../../pages/TransactionsPage/TransactionsPage.tsx";
import CategoriesPage from "../../pages/CategoriesPage/CategoriesPage.tsx";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import AdjustIcon from '@mui/icons-material/Adjust';

export type TMenuItem = {
    path: string;
    title: string;
    icon: React.ElementType;
    Component: React.ComponentType<any>;
};

export const urls = {
    DASHBOARD_URL: '/dashboard',
    TRANSACTIONS_URL: '/transactions',
    // GOALS_URL: '/goals',
    CATEGORIES_URL: '/categories',
};

export const menuItems: TMenuItem[] = [
    {
        path: urls.DASHBOARD_URL,
        title: 'Dashboard',
        icon: DashboardIcon,
        Component: DashboardPage
    },
    {
        path: urls.TRANSACTIONS_URL,
        title: 'Transactions',
        icon: ReceiptLongIcon,
        Component: TransactionsPage
    },
    /*{
        path: urls.GOALS_URL,
        title: 'Transactions',
        icon: AdjustIcon,
        Component: GoalsPage
    },*/
    {
        path: urls.CATEGORIES_URL,
        title: 'Categories',
        icon: CategoryIcon,
        Component: CategoriesPage
    },
];