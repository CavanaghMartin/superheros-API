const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const populate=require("./src/controllers/dbPreLoad")

// Syncing all the models at once.
conn.sync({ force:false }).then(() => {
  server.listen(3001, () => {
    console.log('listening at 3001'); // eslint-disable-line no-console
    populate()//populate db with superheros
  });
});