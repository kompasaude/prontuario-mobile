const request = require("supertest");
const createApp = require("./app");
const { QUEIXAS, DOENCAS } = require("./enums");
const { expect } = require("chai");

describe("Endpoints", () => {
  let app = null;

  before(() => {
    app = createApp("test_prontuarios.db");
  });

  describe("GET /", () => {
    it("responds with json", (done) => {
      request(app)
        .get("/")
        .expect(200, {
          ok: true
        }, done);
    });
  });

  describe("Enum endpoints", () => {
    it("should retrieve queixas in /queixas", done => {
      request(app)
        .get("/queixas")
        .expect(200, {
          ok: true,
          data: QUEIXAS
        }, done);
    });

    it("should retrieve doencas in /doencas", done => {
      request(app)
        .get("/doencas")
        .expect(200, {
          ok: true,
          data: DOENCAS
        }, done);
    });
  });

  describe("POST /prontuario", () => {
    it("should reject if any attributes are missing", done => {
      request(app)
        .post("/prontuario")
        .expect(400)
        .expect(res => {
          expect(res.body).to.have.property("errors");
        })
        .end(done);
    });

    it("should create a valid record", done => {
      request(app)
        .post("/prontuario")
        .send({
          historico: "forte dor de cabeça seguida de vômito",
          doencas: [DOENCAS[0].id, DOENCAS[1].id],
          queixa: QUEIXAS[0].id
        })
        .expect(res => {
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property("created_at");
        })
        .end(done);
    });

    it("should create a record without 'doencas'", done => {
      request(app)
        .post("/prontuario")
        .send({
          historico: "forte dor de cabeça seguida de vômito",
          queixa: QUEIXAS[0].id
        })
        .expect(res => {
          expect(res.body.doencas).to.eql([]);
        })
        .end(done);
    });

    it("should accept last 'queixa'", done => {
      request(app)
        .post("/prontuario")
        .send({
          historico: "forte dor de cabeça",
          queixa: QUEIXAS[QUEIXAS.length - 1].id
        })
        .expect(res => {
          expect(res.status).to.equal(200);
          expect(res.body.queixa).to.eql(QUEIXAS[QUEIXAS.length - 1]);
        })
        .end(done);
    });
  });
});
