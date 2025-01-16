let availableNumbers = [1, 2, 3, 4, 5, 6];
const users = {}; // Store selected numbers by IP

exports.handler = async function(event, context) {
  const { name } = JSON.parse(event.body);
  const ip = event.headers["x-forwarded-for"] || event.requestContext.identity.sourceIp;

  if (!name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Name is required." })
    };
  }

  if (users[ip]) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "You have already selected a number." })
    };
  }

  if (availableNumbers.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "All numbers have been taken." })
    };
  }

  const randomIndex = Math.floor(Math.random() * availableNumbers.length);
  const selectedNumber = availableNumbers.splice(randomIndex, 1)[0];
  users[ip] = { name, number: selectedNumber };

  return {
    statusCode: 200,
    body: JSON.stringify({ name, number: selectedNumber })
  };
};
