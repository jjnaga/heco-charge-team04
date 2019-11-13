const { request } = require('graphql-request');

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

updatePorts();



