import mysql from "mysql2/promise";
export const query = async ({ query, values = [] }) => {
  const dbConnection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "admin",
    multipleStatements: true,
    charset: "utf8mb4",
  });

  try {
    const [results] = await dbConnection.execute(query, values);
    dbConnection.end();
    return results;
  } catch (error) {
    throw Error(error);
    return { error };
  }
};


(async () => {
  try {
    // Attempt to connect to the database
    await query({ query: "SELECT 1" });
    console.log("Connected to the database!");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
})();