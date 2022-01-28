const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls = []) => {
  const promises = [];

  for (const url of urls) {
    promises.push(
      httpGet(url).then((response) => {
        const message = JSON.parse(response.body).message || '';

        return {
          [response.status === 200 ? 'Arnie Quote' : 'FAILURE']: message,
        };
      })
    );
  }

  return Promise.allSettled(promises).then((results) =>
    results.map((result) => result.value)
  );
};

module.exports = {
  getArnieQuotes,
};
