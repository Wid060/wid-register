const widevent = (event) => require(`../events/${event}`);
module.exports = client => {
  client.on('message', widevent('message'));
};
