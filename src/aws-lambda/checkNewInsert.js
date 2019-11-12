const { request } = require('graphql-request')

/** Mutation which inserts new chargedata row */
const query = (insertIntoThisStation, station, session, starttime, endtime, duration, energy, amount, id, port, payment, inputdate, input, validity) => (
  `mutation MyMutation {
    insert_${insertIntoThisStation}(objects: {station: "${station}", id: ${id}, session: "${session}", starttime: "${starttime}", endtime: "${endtime}", duration: "${duration}", energy: "${energy}", amount: "${amount}", port: "${port}", payment: "${payment}", inputdate: "${inputdate}", input: "${input}", validity: "${validity}"}) {
      affected_rows
      returning {
        id
        validity
      }
    }
  }`
);

/** TODO */
function checkForValidity(oldData) {
  const newRow = oldData;

  /** name of table must be inputted here.
   * Tables:
   *  - chargedata
   *  - chargedata-reconcile
   *  - chargedata-bad
   */
  let nameOfTableToInsert = "";

  /** variable shortcuts that update newRow */
  let {
    station,
    session,
    starttime,
    endtime,
    duration,
    energy,
    amount,
    id,
    port,
    payment,
    inputdate,
    input,
    validity } = newRow;

  const sampleData = {
    data: [['A',
      'DEVICE',
      '11/09/19 17:25:28',
      '11/09/19 17:30:27',
      '00:05:59',
      '24.93',
      '$14.21',
      3284547,
      'DCCOMBOTYP1',
      'CREDITCARD'],
    ['A',
      'DEVICE',
      '11/09/19 17:31:28',
      '11/09/19 18:09:27',
      '00:38:59',
      '24.93',
      '$14.21',
      3284547,
      'DCCOMBOTYP1',
      'CREDITCARD']],
  };


  if (energy <= 0 && duration <= 0 && payment <= 0) {
    nameOfTableToInsert = "chargedata-userFuckedUp"
  }
  else {
    nameOfTableToInsert = "charge-data"
  }
  return nameOfTableToInsert; // name of the table
}

// index.hanlder(lambdaEvent, cb) {}
function mainFunction(lambdaEvent) {
  const endpoint = "https://charge-data.herokuapp.com/v1/graphql";

  /** TODO This doesnt work right now ,fix */
  const newTransactions = lambdaEvent.data; // JSON

  console.log(typeof newTransactions);

  for (let row in newTransactions => {
    console.log(row);
    let {
      station,
      session,
      starttime,
      endtime,
      duration,
      energy,
      amount,
      id,
      port,
      payment,
      inputdate,
      input,
      validity } = row;


    console.log(`Data:\n${row}`);
    const nameOfTableToInsert = checkForValidity(row);
    console.log(`Inserting into ${nameOfTableToInsert} DB`);

    const newQuery = query(
      nameOfTableToInsert,
      station,
      session,
      starttime,
      endtime,
      duration,
      energy,
      amount,
      id,
      port,
      payment,
      inputdate,
      input,
      validity);

    console.log(newQuery);

    /** send to DB */
    //   await request(endpoint, newQuery)
    //     .then(data => {
    //       console.log(data);
    //     }).catch(err => {
    //       console.log(err);
    //     });
    // });
  });
}

const sampleData = {
  data: [['A',
    'DEVICE',
    '11/09/19 17:25:28',
    '11/09/19 17:30:27',
    '00:05:59',
    '24.93',
    '$14.21',
    3284547,
    'DCCOMBOTYP1',
    'CREDITCARD']],
};


mainFunction(sampleData);

