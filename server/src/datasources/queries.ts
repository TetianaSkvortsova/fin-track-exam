export const QUERIES = Object.freeze({
    INSERT_NEW_USER: `
            INSERT INTO users (email, password_hash, name, lastname)
            VALUES ($1, $2, $3, $4) 
            RETURNING id, email, created_at, name, lastname
        `,
    SELECT_USER_BY_EMAIL: `SELECT * FROM users WHERE email = $1`
});