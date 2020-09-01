const createApp = require("./app");

const app = createApp("prontuarios.db");

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
