import "source-map-support/register";
import "dotenv/config";
import app from "./server";
import config from "./config";
import { connectDB } from "./sequelize"; // Assure-toi que le chemin est correct

const port = parseInt(config.port);

// On crée une fonction asynchrone pour attendre la DB
const bootstrap = async () => {
    try {
        // 1. On synchronise les tables dans Docker
        await connectDB();

        // 2. Une fois que c'est bon, on lance le serveur
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error("Impossible de démarrer le serveur :", error);
        process.exit(1); // On arrête tout si la DB ne répond pas
    }
};

bootstrap();