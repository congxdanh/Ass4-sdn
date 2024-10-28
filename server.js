const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const dbConnectionString = process.env.DATABASE;

mongoose.connect(dbConnectionString).then(() => {
    console.log("DB access successful");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
