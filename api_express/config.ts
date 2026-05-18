import dotenv from 'dotenv';

// Charge les variables du fichier .env dans process.env
dotenv.config(); 

const config = {
  db: {
    host: process.env.DB_HOST || "localhost",
    // Attention : Vérifie si ton port est 3306 (standard) ou 6033 (Docker)
    port: parseInt(process.env.DB_PORT || "6033"), 
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "readme_db",
    dialect: "mysql",
  },
  port: process.env.PORT || "3000",
};

export default config;