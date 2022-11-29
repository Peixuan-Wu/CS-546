//Here you will require route files and export the constructor method as shown in lecture code and worked in previous labs.
const apiRoutes = require('./routesAPI');

const constructorMethod = (app) => {
  app.use('/', apiRoutes);
  
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
