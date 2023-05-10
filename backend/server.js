const express = require('express');
const db = require('./models');
const path = require('path');
const app = express();
const cors = require("cors");


app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8000;

// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to the application." });
//   });



require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  }
)


db.sequelize.sync()
    .then((result) => {
        app.listen(port, () => console.log(`Server started at http://localhost:${port}`))
    })
    .catch((err) => { console.log(err) })

