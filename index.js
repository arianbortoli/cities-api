import express from 'express';
import { promises } from 'fs';
import winston from 'winston';
import statesRouter from './routes/states.js';

import swaggerUi from 'swagger-ui-express'; // package for documentation
import { swaggerDocument } from './doc.js'; // file with documentation

import cors from 'cors'; // package for policy managment

const app = express();
const readFile = promises.readFile;
const writeFile = promises.writeFile;
global.statesArray = [];

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

init();

app.use(express.json());
app.use(cors());

app.use('/state', statesRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, async () => {
  logger.info('API Started!');
});

async function init() {
  try {
    logger.info('loading files...');
    // read Estados file and create a induvidual file for each state
    //    with array of cities of its state

    let data = await readFile(global.StateName, 'utf8');
    let states = JSON.parse(data);

    let dataCity = await readFile(global.CityName, 'utf8');
    let cities = JSON.parse(dataCity);

    states.forEach(async (state) => {
      // filter citied of each state
      let citiesFiltered = cities.filter(({ Estado }) => Estado === state.ID);

      citiesFiltered = citiesFiltered.map(({ ID, Nome, Estado }) => {
        return {
          ID,
          Nome,
          Estado,
          letras: Nome.length,
        };
      });

      state.NumeroCidades = citiesFiltered.length;
      state.Cidades = citiesFiltered;

      statesArray.push(state);
      await writeFile(`./States/${state.Sigla}.json`, JSON.stringify(state));
    });
  } catch (err) {
    logger.error(err);
  }
}
