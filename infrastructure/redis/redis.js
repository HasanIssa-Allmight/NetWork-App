const { createClient } = require("redis");
const dotenv = require('dotenv')

dotenv.config({path:'./.env'})


const redis = createClient({
  url: process.env.url
});

redis.on("error", (err) => {
  console.log("Redis Error:");
});

module.exports = redis;