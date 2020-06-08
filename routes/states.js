import express from 'express';
import { promises } from 'fs';

const router = express.Router();
const readFile = promises.readFile;
const writeFile = promises.writeFile;

// get Top 5 states with most cities
router.get('/top5', async (req, res) => {
  try {
    const topFive = statesArray.sort((a, b) => {
      let x = a.NumeroCidades;
      let y = b.NumeroCidades;
      return x > y ? -1 : x < y ? 1 : 0;
    });
    const topFiveArray = [];

    topFive.forEach((state) => {
      topFiveArray.push(`${state.Sigla} - ${state.NumeroCidades}`);
    });

    res.send(topFiveArray.slice(0, 5));
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`GET top5- ${err.message}`);
  }
});

// get bottom 5 states with lowest number of cities
router.get('/bottom5', async (req, res) => {
  try {
    const bottomFive = statesArray.sort((a, b) => {
      let x = a.NumeroCidades;
      let y = b.NumeroCidades;
      return x > y ? 1 : x < y ? -1 : 0;
    });
    const bottomFiveArray = [];

    bottomFive.forEach((state) => {
      bottomFiveArray.push(`${state.Sigla} - ${state.NumeroCidades}`);
    });

    res.send(bottomFiveArray.slice(0, 5));
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`GET - ${err.message}`);
  }
});

// get City with lowest letters for State
router.get('/bottomCity', async (req, res) => {
  try {
    console.log(req.params.state);
    const array = [];

    statesArray.forEach(({ Sigla, Cidades }) => {
      const citiesSorted = Cidades.sort((a, b) => {
        let x = a.letras;
        let y = b.letras;
        return x > y ? 1 : x < y ? -1 : a.Nome.localeCompare(b.Nome);
      });

      array.push(`${citiesSorted[0].Nome} - ${Sigla}`);
    });

    res.send(array);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`GET - ${err.message}`);
  }
});

// get City with lowest letters for that State
router.get('/bottomCity/:state', async (req, res) => {
  try {
    console.log(req.params.state);
    const array = [];

    const filter = statesArray.filter((state) => {
      return state.Sigla === req.params.state;
    });

    const citiesSorted = filter[0].Cidades.sort((a, b) => {
      let x = a.letras;
      let y = b.letras;
      return x > y ? 1 : x < y ? -1 : a.Nome.localeCompare(b.Nome);
    });

    res.send(`${citiesSorted[0].Nome} - ${filter[0].Sigla}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`GET - ${err.message}`);
  }
});

// get City with lowest letters from all states
router.get('/lowestCity', async (req, res) => {
  try {
    console.log(req.params.state);
    const array = [];

    // for Each state
    statesArray.forEach(({ Sigla, Cidades }) => {
      // stor each city with lower number of letter
      //  if two cities has same number of letter order by alphabetic order
      const citiesSorted = Cidades.sort((a, b) => {
        let x = a.letras;
        let y = b.letras;
        return x > y ? 1 : x < y ? -1 : a.Nome.localeCompare(b.Nome);
      });

      // create json for bottow city for each state
      const json = {
        cidade: citiesSorted[0].Nome,
        letras: citiesSorted[0].letras,
        uf: Sigla,
      };

      // add to array
      array.push(json);
    });

    // compare for the number of letter with final array
    const bottom = array.sort((a, b) => {
      let x = a.letras;
      let y = b.letras;

      return x > y ? 1 : x < y ? -1 : a.cidade.localeCompare(b.cidade);
    });

    res.send(`${bottom[0].cidade} - ${bottom[0].uf}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`GET - ${err.message}`);
  }
});

// get City with lowest letters for State
router.get('/topCity', async (req, res) => {
  try {
    console.log(req.params.state);
    const array = [];

    statesArray.forEach(({ Sigla, Cidades }) => {
      const citiesSorted = Cidades.sort((a, b) => {
        let x = a.letras;
        let y = b.letras;
        return x < y ? 1 : x > y ? -1 : a.Nome.localeCompare(b.Nome);
      });

      array.push(`${citiesSorted[0].Nome} - ${Sigla}`);
    });

    res.send(array);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`GET - ${err.message}`);
  }
});

// get City with most letters for that State
router.get('/topCity/:state', async (req, res) => {
  try {
    console.log(req.params.state);
    const array = [];

    const filter = statesArray.filter((state) => {
      return state.Sigla === req.params.state;
    });

    const citiesSorted = filter[0].Cidades.sort((a, b) => {
      let x = a.letras;
      let y = b.letras;
      return x < y ? 1 : x > y ? -1 : a.Nome.localeCompare(b.Nome);
    });

    res.send(`${citiesSorted[0].Nome} - ${filter[0].Sigla}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`GET - ${err.message}`);
  }
});

// get City with most letters from all states
router.get('/highestCity/', async (req, res) => {
  try {
    console.log(req.params.state);
    const array = [];

    // for Each state
    statesArray.forEach(({ Sigla, Cidades }) => {
      // stor each city with lower number of letter
      //  if two cities has same number of letter order by alphabetic order
      const citiesSorted = Cidades.sort((a, b) => {
        let x = a.letras;
        let y = b.letras;
        return x < y ? 1 : x > y ? -1 : a.Nome.localeCompare(b.Nome);
      });

      // create json for bottow city for each state
      const json = {
        cidade: citiesSorted[0].Nome,
        letras: citiesSorted[0].letras,
        uf: Sigla,
      };

      // add to array
      array.push(json);
    });

    // compare for the number of letter with final array
    const bottom = array.sort((a, b) => {
      let x = a.letras;
      let y = b.letras;

      return x < y ? 1 : x > y ? -1 : a.cidade.localeCompare(b.cidade);
    });

    res.send(`${bottom[0].cidade} - ${bottom[0].uf}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`GET - ${err.message}`);
  }
});

// get State abreviation, read json file and return number of cities
router.get('/:state', async (req, res) => {
  try {
    console.log(req.params.state);
    let data = await readFile(`./States/${req.params.state}.json`, 'utf8');
    let json = JSON.parse(data);
    console.log(json.Cidades.length);
    res.send(`${json.Cidades.length}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`GET state - ${err.message}`);
  }
});

export default router;
