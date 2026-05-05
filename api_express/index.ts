import "source-map-support/register";
import "dotenv/config";
import app from "./server";
import config from "./config";

const port = parseInt(config.port);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});