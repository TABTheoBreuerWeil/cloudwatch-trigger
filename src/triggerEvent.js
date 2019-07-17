const AWS = require('aws-sdk');
const { readEventFile } = require('./utilities');

const getCloudWatchEventsClient = region => {
  AWS.config.update({ region });
  return new AWS.CloudWatchEvents();
};

const compileEvents = async (eventNames) => ({
  Entries: await Promise.all(eventNames.map(eventName => 
    readEventFile(eventName)
  ))
});

const triggerEvents = async (eventNames, { region }) => {
  const events = await compileEvents(eventNames);

  try {
    const data = await getCloudWatchEventsClient(region)
      .putEvents(events)
      .promise();

    const formattedData = JSON.stringify(data, null, 2)
    console.log(`successfully raised events\n\n${formattedData}`);
  } catch (error) {
    console.error(`could not raise events (${error.message})`);
  };
};

module.exports = { triggerEvents };
