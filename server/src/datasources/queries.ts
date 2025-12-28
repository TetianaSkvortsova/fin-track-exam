export const QUERIES = Object.freeze({
    INSERT_NEW_USER: `
            INSERT INTO users (email, password_hash, name, lastname)
            VALUES ($1, $2, $3, $4) 
            RETURNING id, email, created_at, name, lastname
        `,
    SELECT_USER_BY_EMAIL: `SELECT * FROM users WHERE email = $1`,
    SELECT_CATEGORY_TYPES: `SELECT ct.id, ct.kind FROM category_types ct`,
    SELECT_CATEGORY_BY_ID: `SELECT c.id, c.name, c.category_type_id 
                            FROM categories c
                            WHERE c.id = $1 and c.user_id = $2
                            `,
    UPDATE_CATEGORY_BY_ID: `with updated_category as (
                                UPDATE categories
                                SET
                                    name = $3
                                WHERE id = $1 and user_id = $2
                                RETURNING *
                            )
                            select uc.id,
                                   uc.name,
                                   sum(COALESCE(t.amount, 0)) as amount
                            from updated_category as uc
                                left outer join transactions t on uc.id = t.category_id
                            group by uc.id, uc.name
                            `,
    UPDATE_GOAL_BY_ID: `with updated_category as (
                            UPDATE categories
                            SET
                                name = $4,
                                goal_target_date = $5,
                                goal_amount = $6,
                                completed = $7
                            WHERE id = $1 and user_id = $2 and category_type_id = $3
                                RETURNING *
                        )
                            select uc.id,
                                   uc.name,
                                   uc.goal_amount,
                                   uc.goal_target_date,
                                   uc.completed,
                                   sum(COALESCE(t.amount, 0)) as amount
                            from updated_category as uc
                                     left outer join transactions t on uc.id = t.category_id
                            group by uc.id, uc.name, uc.goal_amount, uc.goal_target_date, uc.completed
                            `,
    DELETE_CATEGORY_BY_ID: `DELETE from categories
                            WHERE id = $1 and user_id = $2
                            RETURNING *
                            `,
    SELECT_BALANCE_BY_USER_ID: `select (sum(tri.amount)::numeric(24, 8) - sum(tro.amount)::numeric(24, 8)) as amount
                                from categories c
                                         left outer join transactions tri on tri.category_id = c.id and not tri.cumulative and c.category_type_id in ('00000001-0000-0000-0000-000000000001')
                                         left outer join transactions tro on tro.category_id = c.id and not tro.cumulative and c.category_type_id in ('00000001-0000-0000-0000-000000000002', '00000001-0000-0000-0000-000000000003')
                                where c.user_id = $1`,
    SELECT_TRANSACTIONS_BY_USER_ID: `select
                                         t.id,
                                         t.category_id,
                                         c.category_type_id,
                                         c.name,
                                         t."when",
                                         t.description,
                                         t.amount
                                     from categories c
                                              inner join transactions t on t.category_id = c.id
                                     where
                                         c.user_id = $1
                                `,
    FILTER_TRANSACTIONS_BY_WHEN_FROM: ` and DATE(t."when") >= DATE({PARAM})`,
    FILTER_TRANSACTIONS_BY_WHEN_TO: ` and DATE(t."when") <= DATE({PARAM})`,
    FILTER_TRANSACTIONS_BY_CATEGORY_TYPE_ID: ` and c.category_type_id = {PARAM}`,
    FILTER_TRANSACTIONS_BY_CATEGORY_ID: ` and t.category_id = {PARAM}`,
    SELECT_CATEGORY_BY_CATEGORY_TYPE: `select c.id, 
                                              c.name, 
                                              sum(COALESCE(t.amount, 0)) as amount
                                       from categories c
                                                left outer join transactions t on c.id = t.category_id
                                       where c.user_id = $1 and c.category_type_id = $2 and c.completed = false
                                       group by c.id, c.name
    `,
    SELECT_CATEGORIES: `SELECT
                            c.id,
                            c.name,
                            c.completed
                        FROM categories c
                        WHERE c.user_id = $1 and c.completed = false
    `,
    SELECT_CATEGORY_BY_CATEGORY_TYPE_WITH_BALANCE: `select  
                                              sum(COALESCE(t.amount, 0)) as amount
                                       from categories c
                                                left outer join transactions t on c.id = t.category_id
                                       where c.user_id = $1 and c.category_type_id = $2
    `,
    APPEND_SIMPLE_CATEGORY: `with new_category as (
                                INSERT INTO categories (user_id, category_type_id, name) 
                                 VALUES ($1, $2, $3)
                                 RETURNING *
                             )
                             select nc.id, 
                                    nc.name, 
                                    nc.category_type_id,
                                    0::numeric(24, 8) as amount
                             from new_category as nc
                            `,
    UPDATE_TRANSACTION: `
                                WITH updated_row AS (
                                UPDATE transactions
                                SET "when"      = $3,
                                    amount      = $4,
                                    description = $5
                                WHERE id = $1 AND user_id = $2
                                    RETURNING *
                            )
                                SELECT
                                    u.*,
                                    c.name AS name,
                                    c.category_type_id
                                FROM updated_row u
                                         JOIN categories c ON u.category_id = c.id
                            `,
    DELETE_TRANSACTION: `DELETE from transactions
                         where id = $1 and user_id = $2
                         RETURNING *`,
    SELECT_TRANSACTION_BY_ID: `
                        SELECT
                            t.id,
                            t.category_id,
                            t."when",
                            t.amount,
                            t.description,
                            c.category_type_id
                        FROM transactions t
                                 JOIN categories c ON t.category_id = c.id
                        WHERE t.id = $1 AND t.user_id = $2)
                        `,
    SELECT_TRANSACTIONS_BY_CATEGORY_TYPE: `
                        SELECT
                            t.id,
                            t.amount,
                            t.description,
                            t.when,
                            c.name AS name,
                            c.category_type_id,
                            t.category_id
                        FROM transactions t
                                 JOIN categories c ON t.category_id = c.id
                        WHERE c.category_type_id = $1 AND t.user_id = $2;
                        `,
    SELECT_GOALS_BY_USER_ID: `
                        SELECT
                            c.id,                            
                            c.category_type_id,
                            c.name,
                            c.goal_amount,
                            c.goal_target_date,
                            c.completed,
                            sum(t.amount) as amount
                        FROM categories c
                            left outer join transactions t on c.id = t.category_id and t.cumulative = false
                        WHERE c.user_id = $1 and c.category_type_id = $2
                        group by c.id,
                                 c.user_id,
                                 c.category_type_id,
                                 c.name,
                                 c.goal_amount,
                                 c.goal_target_date
                        `,
    APPEND_TRANSACTION: `
                        WITH inserted_row AS (
                        INSERT INTO transactions (user_id, category_id, "when", amount, description, cumulative)
                        VALUES ($1, $2, $3, $4, $5, $6)
                            RETURNING *
                            )
                        SELECT
                            i.*,
                            c.name AS name,
                            c.category_type_id AS category_type_id
                        FROM inserted_row i
                                 JOIN categories c ON i.category_id = c.id
                    `,
    INSERT_GOAL: `
                        insert into categories (user_id, category_type_id, name, goal_amount, goal_target_date) 
                        values ($1, $2, $3, $4, $5)
                        returning *
                        `,
    SELECT_GOAL_BY_ID: `SELECT c.id, 
                            c.name, 
                            c.goal_amount,
                            c.goal_target_date,
                            c.completed
                        FROM categories c
                        WHERE c.id = $1 and c.user_id = $2 and c.category_type_id = $3
                            `,
});
