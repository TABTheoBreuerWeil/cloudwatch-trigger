const fs = require('fs');

const getEventPathByName = eventName =>
  `${__dirname}/../events/${eventName}.json`;

const doesEventExist = eventName =>
  new Promise(resolve => {
    fs.exists(getEventPathByName(eventName), outcome => resolve(outcome));
  });

const createEventFile = (eventName, content) =>
  new Promise((resolve, reject) => {
    const filepath = getEventPathByName(eventName)

    fs.writeFile(filepath, content, error => {
      error ? reject(error) : resolve(filepath);
    });
  });

const readEventFile = eventName =>
  new Promise((resolve, reject) => {
    fs.readFile(getEventPathByName(eventName), (err, data) => {
      if (err) {
        return reject(new Error(`could not read event ${eventName} (${err})`));
      }

      const parsedData = data && JSON.parse(data.toString());

      return resolve({
        ...parsedData,
        Detail: JSON.stringify(parsedData)
      });
    });
  });

module.exports = {
  getEventPathByName,
  doesEventExist,
  createEventFile,
  readEventFile
};
