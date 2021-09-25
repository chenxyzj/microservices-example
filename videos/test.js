let DB_URI = "mongodb://localhost:27017/microservices";

const mongoose = require("mongoose");




// mongoose.connect(DB_URI)
//   .then(() => console.log("connected!"))
//   .catch((err) => console.log("failed to connect",err));


var connectWithRetry = function() {
  return mongoose.connect(DB_URI, function(err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 5000);
    }
    else {
      console.log("connected!")
    }
  });
};
connectWithRetry();