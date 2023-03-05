const _ = require('./_');

// Connect to the different servers this microservice depends on, like NATS,
// MongoDB, etc. depending on the availability of its environment variables
_.connect(() => {
  // Receive a message via NATS from another microservice
  _.receive(async (m, message) => {
    
    // Mask sensitive data, recursively, from the data object
    message = _.maskSensitive(message, ['headers', 'password', 'email', 'preferred_username']);

    _.db()
      .insertOne(message)
      .catch(e => {
        console.error(e);
      })
  })
});