import express from 'express';
import { promises } from 'fs';
import winston from 'winston';

import swaggerUi from 'swagger-ui-express'; // package for documentation
import { swaggerDocument } from './doc.js'; // file with documentation
import cors from 'cors'; // package for policy managment

const app = express();
const readFile = promises.readFile;
const writeFile = promises.writeFile;

global.StateName = 'Estados.json';
global.CityName = 'Cidades.json';

// format for log text
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] - ${level}: ${message}`;
});

// log creation
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'cities-api.log' }),
  ],
  format: combine(label({ label: 'cities-api' }), timestamp(), myFormat),
});

app.use(express.json());
app.use(cors());

app.listen(3000, async () => {
  try {
    logger.info('API Started!');

    // read Estados file and create a induvidual file for each state
    //    with array of cities of its state

    let data = await readFile(global.StateName, 'utf8');
    let states = JSON.parse(data);

    let dataCity = await readFile(global.CityName, 'utf8');
    let cities = JSON.parse(dataCity);

    states.forEach(async (state) => {
      // filter citied of each state
      console.log(state.ID);

      const citiesFiltered = cities.filter(({ Estado }) => Estado === state.ID);

      state.Cidades = citiesFiltered;
      await writeFile(`./States/${state.Sigla}.json`, JSON.stringify(state));
    });
  } catch (err) {
    logger.error(err);
  }
});
