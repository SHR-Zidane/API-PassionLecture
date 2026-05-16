import { Sequelize } from "sequelize-typescript";
import { Options } from "sequelize";
import config from "./config";

const sequelize = new Sequelize({
  ...(config.db as Options),
  logging: console.log, // On active le log pour voir les tables se créer dans ton terminal
  models: [__dirname + "/models"],
});

// FONCTION DE SYNCHRO AUTOMATIQUE
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à MySQL réussie.');
    
    // Cette ligne remplace les migrations : elle crée les tables si elles manquent
    await sequelize.sync({ alter: true }); 
    console.log('Toutes les tables ont été synchronisées.');
  } catch (error) {
    console.error('Erreur de connexion/synchronisation :', error);
  }
};

export default sequelize;