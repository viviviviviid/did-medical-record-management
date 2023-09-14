import did from "./did.route.js";

export default (app) => {
  app.use("/did", did);
};
