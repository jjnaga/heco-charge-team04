let { data } = require("./db-archive.js")

// let mainString = `[${testRow}]`;

let stations = {
  b: {
    name: "b",
    weight: 80
  },
  c: {
    name: "c",
    weight: 50
  },
  d: {
    name: "d",
    weight: 5
  },
  e: {
    name: "e",
    weight: 15
  },
  f: {
    name: "f",
    weight: 20
  },
  g: {
    name: "g",
    weight: 25
  }
}



let iterate = 3593201;
let arr = [];
data.map((testRow, index) => {
  let station = testRow[0];
  let session = testRow[1];
  let startTime = testRow[2];
  let endTime = testRow[3];
  let duration = testRow[4];
  let energy = testRow[5];
  let amount = testRow[6];
  let id = testRow[7];
  let port = testRow[8];
  let payment = testRow[9];

  let a_row = {
    date: new Date(endTime),
    string: `['${station}', '${session}', '${startTime}', '${endTime}', '${duration}', '${energy}', '${amount}', '${id}', '${port}', '${payment}'],`,
  }
  arr.push(a_row);

  for (let key in stations) {
    let obj = {
      date: null,
      string: "",
    }
    let value = stations[key];
    let { name, weight } = value;
    let rand = Math.random() * 100;

    d = new Date(startTime);
    dd = new Date(endTime);

    /** 
     * using the epoch, we can get duration. we then multiply by a range of
     * 0.8-1.2 to give either a slightly shorter, or slighty longer time.
     * 
     * 
     */
    epoch = d.getTime() / 1000;
    epoch2 = dd.getTime() / 1000;
    let duration = epoch2 - epoch;

    /**
     * getRandom(min: number, max: number) {
        return Math.random() * (max - min) + min;
     * }
     */
    let range = (Math.random() * (1.2 - 0.8) + 0.8).toPrecision(3);
    let newDuration = Math.floor((duration * range));
    let addTime = Math.random() < 0.5;

    if (addTime) {
      let add = Math.random() * (1200 - 1) + 1;
      epoch = epoch + add;
      epoch2 = epoch + newDuration;
    } else { // subtract time
      let add = Math.random() * (1200 - 1) + 1;
      epoch = epoch - add;
      epoch2 = epoch + newDuration;
    }

    epoch = Math.floor(epoch);
    epoch2 = Math.floor(epoch2);

    let date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear() - 2000}`;

    let newStartTime = new Date(epoch * 1000);
    let newEndTime = new Date(epoch2 * 1000);

    let startString = `${newStartTime.getHours() < 10 ? '0' : ''}${newStartTime.getHours()}:${newStartTime.getMinutes() < 10 ? '0' : ''}${newStartTime.getMinutes()}:${newStartTime.getSeconds() < 10 ? '0' : ''}${newStartTime.getSeconds()}`
    let endString = `${newStartTime.getHours() < 10 ? '0' : ''}${newEndTime.getHours()}:${newEndTime.getMinutes() < 10 ? '0' : ''}${newEndTime.getMinutes()}:${newEndTime.getSeconds() < 10 ? '0' : ''}${newEndTime.getSeconds()}`
    let durationHour = Math.floor(newDuration / 3600);
    let durationMinute = Math.floor((newDuration - (durationHour * 3600)) / 60);

    let durationSecond = newDuration - ((durationHour * 3600) + (durationMinute * 60));

    let durationString = `${durationHour ? '0' + durationHour : '00'}:${durationMinute >= 10 ? durationMinute : '0' + durationMinute}:${durationSecond >= 10 ? durationSecond : '0' + durationSecond}`;

    // ['A', 'MOBILE', '11/11/19 21:14:06', '11/11/19 21:45:22', '00:31:16', '20.3', '$11.57', 3286854, 'CHADEMO', 'RFID'],
    if (weight > rand) {
      obj.date = newEndTime;
      let string = `['${name.toUpperCase()}', '${(Math.random() < 0.5) ? 'DEVICE' : 'MOBILE'}', '${date} ${startString}', '${date} ${endString}', '${durationString}', '${energy}', '${amount}', '${iterate++}', '${port}', '${payment}'],`;
      obj.string = string;
      arr.push(obj);
    }
  }
});

arr.sort(function (a, b) {
  return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
});

arr.forEach(item => {
  console.log(item.string);
})




