const app = require('./app');

exports.handler = async (event, context) => {
    const result = await app(event, context);
    return result;
};
