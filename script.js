// netlify/functions/cors-proxy.js

const axios = require("axios");

exports.handler = async function (event, context) {
  const url = event.queryStringParameters.url;

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No URL provided." }),
    };
  }

  try {
    const response = await axios.get(url);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // This is the key part that allows CORS
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
