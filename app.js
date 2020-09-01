const express = require("express");
const cors = require("cors");
const Datastore = require("nedb");
const rateLimit = require("express-rate-limit");
const { QUEIXAS, DOENCAS } = require("./enums");

const createApp = dbFilename => {
  const db = new Datastore({ filename: dbFilename, autoload: true });
  const app = express();

  app.use(express.json());

  app.set('trust proxy', 1);

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  });

  app.use(limiter);
  app.use(cors());

  app.get("/", (req, res) => {
    return res.json({ok: true});
  });

  app.get("/queixas", (req, res) => {
    return res.json({
      ok: true,
      data: QUEIXAS
    });
  });

  app.get("/doencas", (req, res) => {
    return res.json({
      ok: true,
      data: DOENCAS
    });
  });

  app.post("/prontuario", function (req, res) {
    const { queixa, doencas = [], historico } = req.body;
    const errors = {};

    if (!queixa)
      errors.queixa = "Esse campo é obrigatório.";
    else if (!QUEIXAS[queixa])
      errors.queixa = `
        Esse campo deve ser um inteiro correspondendo ao ID de uma das queixas válidas.
        Utilize o endpoint /queixas para receber a lista completa.
      `;

    if (!Array.isArray(doencas))
      errors.doencas = "Esse campo deve ser um array de inteiros.";
    else if ((new Set(doencas)).size !== doencas.length)
      errors.doencas = "Esse campo não pode conter valores duplicados.";
    else {
      const invalid = doencas.find(d => !DOENCAS[d]);
      if (invalid)
        errors.doencas = `
          O valor '${invalid}' é inválido.
          Todos os valores desse array devem ser um inteiro correspondendo ao ID de uma das doenças válidas.
          Utilize o endpoint /doencas para receber a lista completa.
         `;
    }

    if (!historico) {
      errors.historico = "Esse campo é obrigatório.";
    } else if (typeof historico !== "string" || historico.length < 10 || historico.length > 1000) {
      errors.historico = "Esse campo deve ter no máximo 10 caracteres, e no mínimo 10 caracteres.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        ok: false,
        errors
      });
    }

    const prontuario = {
      historico,
      queixa,
      doencas,
      created_at: new Date().toISOString()
    };

    db.insert(prontuario, (err, doc) => {
      if (err)
        return res.status(500).json(err);

      return res.json({
        ...doc,
        queixa: QUEIXAS.find(({id}) => String(id) === String(doc.queixa)),
        doencas: doencas.map(d => DOENCAS.find(({id}) => String(id) === String(d)))
      });
    });
  });

  return app;
};

module.exports = createApp;
