const data = require('./db.js');
let fs = require('fs');

// retrieve latest epoch we used to get current data

exports.handler = function (event, context) {
  let epoch = parseInt(fs.readFileSync('./db.txt', 'utf8'));

  // Add 15,000 milliseconds (15 mins to epoch)
  const fifteenMinEpochUpdate = epoch + 900;

  let newDataToPushToServer = [];

  let begRange = new Date(epoch * 1000);
  let endRange = new Date(fifteenMinEpochUpdate * 1000);

  console.log("fuck");
  // with epoch, and fifteenMinEpochUpdate, we have a range where 
  // data < epoch is old
  // data > fifteenMinEpoch is future data
  // epoch < data < fifteenMinEpoch = current data pushing to server.
  for (let transaction of data.data) {
    let transEpoch = Date.parse(transaction[3]);
    transEpoch = transEpoch / 1000;


    /** troubleshooting purposes */
    let target = new Date(transEpoch * 1000);
    console.log(`Starting:\t${begRange}`);
    console.log(`Target:\t\t${target}`);
    console.log(`Ending:\t\t${endRange}`);

    if (transEpoch >= epoch) {
      if (transEpoch <= fifteenMinEpochUpdate) {
        newDataToPushToServer.push(transaction);
      } else {
        break;
      }
    }
    console.log("\n");
  }

  fs.writeFile("db.txt", fifteenMinEpochUpdate, (err) => {
    if (err) throw err;
  });

  console.log(newDataToPushToServer);
}
