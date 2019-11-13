const { request } = require('graphql-request')

/** Mutation which inserts new chargedata row */
const query = (insertIntoThisStation, station, session, starttime, endtime, duration, energy, amount, id, port, payment) => (
  `mutation MyMutation {
    insert_${insertIntoThisStation}(objects: {station: "${station}", id: ${id}, session: "${session}", starttime: "${starttime}", endtime: "${endtime}", duration: "${duration}", energy: "${energy}", amount: "${amount}", port: "${port}", payment: "${payment}"}) {
      affected_rows
      returning {
        id
      }
    }
  }`
);

const resetPortsInUse = `
  mutation MyMutation {
    update_stations(_set: {portsInUse: 0}, where: {portsInUse: {_gt: 0}}) {
      affected_rows
    }
  }
`;

const updatePortsQuery = (strings) => `
mutation MyMutation {
  insert_stations(objects: [
    ${strings.map(data => {
  console.log(`Updating ${data}`);
  return `{station: "${data}", portsInUse: "1"}`
})}
    ], on_conflict: { constraint: stations_station_key, update_columns: portsInUse }) {
  affected_rows
}
}
`;

async function updatePorts(arr) {

  // DB URL
  const endpoint = "https://charge-data.herokuapp.com/v1/graphql";

  let portsInUse;

  // set all ports to 0
  await request(endpoint, resetPortsInUse)
    .then(data => {
      console.log("Ports reset to 0.");
      console.log(data);
      console.log("\n");
    })
    .catch(err => console.log(`Error: ${err} `));


  /** arr is an array with the stations that were in use. next 5 lines 
   * create a query to update the respective stations with 1 for now.
   * 
  */
  let pushStrings = [];
  arr.forEach(data => {
    pushStrings.push(`{
  station: "${data}", portsInUse: 1"}`);
  })

  /** Update table based on if port was in use in last 15 min. */
  await request(endpoint, updatePortsQuery(pushStrings))
    .then(data => {
      console.log("Data Received.");
      console.log(data);
      console.log("\n");
      portsInUse = data.stations;
    })
    .catch(err => console.log(`Error: ${err} `));
}


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
    payment } = newRow;

  if (energy <= 0 || duration <= 0 || payment <= 0) {
    nameOfTableToInsert = "chargedata-reconcille"
  }
  else {
    nameOfTableToInsert = "chargedata"
  }
  return nameOfTableToInsert; // name of the table
}

let activePorts = [];
exports.handler = async (lambdaEvent, cb) => {
  console.log(`Incoming Data\n${lambdaEvent}`);
  const endpoint = "https://charge-data.herokuapp.com/v1/graphql";

  /** TODO This doesnt work right now ,fix */
  const newTransactions = lambdaEvent.data; // JSON
  if (!newTransactions) console.log("No new data. Exiting.")
  else {
    newTransactions.forEach(async row => {
      let [
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
      ] = row;

      activePorts.push(station);

      const nameOfTableToInsert = checkForValidity(row);

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
        payment);

      console.log(newQuery);


      /** send to DB */
      await request(endpoint, newQuery)
        .then(data => {
          console.log("Data Sent:");
          console.log(data);
        }).catch(err => {
          console.log(err);
        });
    });
  }
  await updatePorts(activePorts);
}


