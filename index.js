import fs from 'fs';
import path from 'path';
import RPC from 'discord-rpc';
import { logInfo, logSuccess, logWarn, logError, logPing } from './logger.js';

const configPath = path.resolve('./config.json');

async function loadConfig() {
  try {
    const rawData = await fs.promises.readFile(configPath, 'utf-8');
    return JSON.parse(rawData);
  } catch (err) {
    logError(`Impossible de charger le fichier config.json: ${err.message}`);
    logInfo(`→ Assure-toi que config.json est présent et bien formaté JSON.`);
    process.exit(1);
  }
}

(async () => {
  const config = await loadConfig();

  const clientId = config.clientId;
  if (!clientId) {
    logError('Client ID manquant dans config.json');
    logInfo('→ Récupère ton Client ID sur https://discord.com/developers/applications');
    process.exit(1);
  }

  const rpc = new RPC.Client({ transport: 'ipc' });

  rpc.on('ready', () => {
    logSuccess('Connecté à Discord avec succès !');

    rpc.setActivity({
      details: config.activity.details,
      state: config.activity.state,
      startTimestamp: new Date(),
      largeImageKey: config.activity.largeImageKey,
      largeImageText: config.activity.largeImageText,
      smallImageKey: config.activity.smallImageKey,
      smallImageText: config.activity.smallImageText,
      buttons: config.activity.buttons,
      instance: false
    });

    logInfo('Statut Discord mis à jour.');
  });

  rpc.on('disconnected', () => {
    logWarn('Déconnecté du client Discord. Relance Discord ou ton script.');
  });

  rpc.on('error', (err) => {
    logError(`Erreur RPC : ${err.message}`);
    logInfo('→ Vérifie que Discord est lancé et que ton Client ID est correct.');
  });

  logInfo('Connexion au client Discord...');
  try {
    await rpc.login({ clientId });
    logPing('Ping vers Discord envoyé avec succès.');
  } catch (err) {
    logError(`Erreur lors de la connexion : ${err.message}`);
    process.exit(1);
  }
})();
