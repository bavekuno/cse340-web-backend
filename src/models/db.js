import { Pool } from 'pg';

/**
 * Connection pool for PostgreSQL database.
 * 
 * A connection pool maintains a set of reusable database connections
 * to avoid the overhead of creating new connections for each request.
 * This improves performance and reduces load on the database server.
 * 
 * Uses a connection string from environment variables for simplified setup.
 * The connection string format is:
 * postgresql://username:password@host:port/database
 */
// DB_URL keeps local development compatible; DATABASE_URL is Render's standard
// name for a linked Postgres database.
const connectionString = process.env.DATABASE_URL || process.env.DB_URL;

if (!connectionString) {
    throw new Error('Database connection string is missing. Set DATABASE_URL or DB_URL.');
}

// The existing local database is configured for SSL. A Render DATABASE_URL
// carries its own connection settings (including sslmode when required).
const pool = new Pool({
    connectionString,
    ...(process.env.DATABASE_URL ? {} : { ssl: true })
});

/**
 * Common SSL Issue:
 *
 * If an externally hosted database requires TLS and its URL does not already set it,
 * add `?sslmode=require` to DATABASE_URL. If its certificate cannot be verified,
 * use the hosting provider's recommended TLS configuration instead of disabling
 * certificate verification globally.
 *
 * Some providers document this alternative setting:
 *
 * ssl: {
 *     rejectUnauthorized: false
 * }
 */

/**
 * Since we will modify the normal pool object in development mode, we need to create and
 * export a reference to the pool object. This allows us to use the same name for the
 * export regardless of whether we are in development or production mode.
 */
let db = null;

if (process.env.NODE_ENV === 'development' && process.env.ENABLE_SQL_LOGGING === 'true') {
    /**
     * In development mode, we wrap the pool to provide query logging.
     * This helps with debugging by showing all executed queries in the console.
     * 
     * The wrapper also adds timing information to help identify slow queries
     * and tracks the number of rows affected by each query.
     */
    db = {
        async query(text, params) {
            try {
                const start = Date.now();
                const res = await pool.query(text, params);
                const duration = Date.now() - start;
                console.log('Executed query:', {
                    text: text.replace(/\s+/g, ' ').trim(),
                    duration: `${duration}ms`,
                    rows: res.rowCount
                });
                return res;
            } catch (error) {
                console.error('Error in query:', {
                    text: text.replace(/\s+/g, ' ').trim(),
                    error: error.message
                });
                throw error;
            }
        },

        async close() {
            await pool.end();
        }
    };
} else {
    // In production, export the pool directly without logging overhead
    db = pool;
}

/**
 * Tests the database connection by executing a simple query.
 */
const testConnection = async () => {
    try {
        const result = await db.query('SELECT NOW() as current_time');
        console.log('Database connection successful:', result.rows[0].current_time);
        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error;
    }
};

export { db as default, testConnection };
