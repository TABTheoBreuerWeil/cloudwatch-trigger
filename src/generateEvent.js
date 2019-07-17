const { doesEventExist, createEventFile } = require('./utilities');

const eventTemplate = () => JSON.stringify({
  Detail: 'Fill in event content',
  DetailType: 'Fill in detail type',
  Source: 'Fill in event source'
}, null, 2);

const generateSingleEvent = async eventName => {
  try {
    if (!(await doesEventExist(eventName))) {
      createEventFile(eventName, eventTemplate());
      console.log(`created event "${eventName}"`);
    } else {
      console.error(`event "${eventName}" already exists, not creating`);
    };
  } catch (error) {
    console.error(`could not create event "${eventName}" (${error.message})`);
  }
};

const generateEvents = eventNames =>
  Promise.all(eventNames.map(eventName => generateSingleEvent(eventName)));

module.exports = { generateEvents };
