const data = require('./db.js');
const { request } = require('graphql-request');
const axios = require("axios");

// retrieve latest epoch we used to get current data

const readQuery = `{
  dataForLambda(where: {id: {_eq: 1}}) {
    epoch
  }
}`;

const writeQuery = (newEpoch) => (
  `mutation MyMutation {
  update_dataForLambda(where: {id: {_eq: 1}}, _set: {epoch: ${newEpoch}}) {
    affected_rows
  }
}`
);

const writeNewStationData = (arrayOfData) => (
  `mutation insertStationData {
    insert_chargedata_reconcile(
      objects: 
    ) {
    affected_rows
  }
)`);



async function mainFunction() {
  // exports.handler = async (event, context) => {
  let epoch;
  const endpoint = "https://charge-data.herokuapp.com/v1/graphql";

  /** read epoch from DB */
  await request(endpoint, readQuery)
    .then(data => {
      epoch = data.dataForLambda[0].epoch;
    })
    .catch(err => console.log(`Error: ${err} `));

  // Add 15,000 milliseconds (15 mins to epoch)
  const fifteenMinEpochUpdate = epoch + 900;

  /** update new epoch in DB */
  await request(endpoint, writeQuery(fifteenMinEpochUpdate))
    .then(data => {
      console.log(`Updated epoch from ${epoch} to ${fifteenMinEpochUpdate}`);
      console.log(data);
    })
    .catch(err => console.log(`Error: ${err} `));


  let newDataToPushToServer = [];

  let begRange = new Date(epoch * 1000);
  let endRange = new Date(fifteenMinEpochUpdate * 1000);

  // with epoch, and fifteenMinEpochUpdate, we have a range where 
  // data < epoch is old
  // data > fifteenMinEpoch is future data
  // epoch < data < fifteenMinEpoch = current data pushing to server.
  for (let transaction of data.data) {
    let transEpoch = Date.parse(transaction[3]);
    transEpoch = transEpoch / 1000;


    /** troubleshooting purposes */
    let target = new Date(transEpoch * 1000);
    console.log(`Starting: \t${begRange} `);
    console.log(`Target: \t\t${target} `);
    console.log(`Ending: \t\t${endRange} `);
    console.log("\n");

    if (transEpoch >= epoch) {
      if (transEpoch <= fifteenMinEpochUpdate) {
        newDataToPushToServer.push(transaction);
      } else {
        break;
      }
    }
  }
  console.log(`${newDataToPushToServer.length} new transactions`);
  console.log(newDataToPushToServer);

  // if there are any updates, send to checkNewInsert() lambda.
  if (newDataToPushToServer.length > 0) {
    await axios.post("https://r6qtjm82of.execute-api.us-west-1.amazonaws.com/prod/", {
      data: newDataToPushToServer
    }).then(data => {
      console.log(`Data Sent: ${data}`);
    })
    // .then(res => {
    //   console.log("POST succesfull.")
    //   console.log(res);
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  }
}


mainFunction();