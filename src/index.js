const { ArgumentParser } = require('argparse');

const { generateEvents } = require('./generateEvent');
const { triggerEvents } = require('./triggerEvent');

const buildParser = () => {
  const parser = new ArgumentParser();
  const subparsers = parser.addSubparsers({ dest: 'command' });
  parser.addArgument(['-r', '--region']);

  const generateParser = subparsers.addParser('generate');
  generateParser.addArgument('events', { nargs: '+' });

  const triggerParser = subparsers.addParser('trigger');
  triggerParser.addArgument('events', { nargs: '+' });

  return parser;
};

module.exports = async () => {
  const { command, events, region } = buildParser().parseArgs();

  switch (command) {
    case 'generate':
      return await generateEvents(events); 
    case 'trigger':
      return await triggerEvents(events, { region });
    default:
      throw new Error('unrecognised argument');
  };
};
