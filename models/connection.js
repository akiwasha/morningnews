var mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(
    "mongodb+srv://admin:adminpw@morningnews.diat9.mongodb.net/morningnews?retryWrites=true&w=majority",
    options,
    function (err) {
      if (err) {
        console.log(
          `error, failed to connect to the database because --> ${err}`
        );
      } else {
        console.info("*** Database morningnews connection : Success ***");
      }
    }
  );

module.exports = mongoose