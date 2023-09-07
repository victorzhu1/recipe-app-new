const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;
const databaseUrl = process.env.DATABASE_URL;

app.get('/', (req, res) => {
  res.send('Welcome to the Recipe Sharing App!');
});

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const recipesRouter = require("./routes/Recipes");
app.use("/recipes", recipesRouter);


mongoose.set("strictQuery", false);
mongoose.connect(databaseUrl)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });  

}).catch((error) => {
    console.log("Error when connecting to MongoDB");
})

