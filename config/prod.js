const PORT = process.env.PORT
// Using Process Environment Variables to securly store API keys, usernames and passwords
const keys = {
  apimedic__username: process.env.apimedic__username,
  apimedic__password: process.env.apimedic__password,
  mongoose_url: process.env.mongoose_url
}
module.exports = {
  PORT,
  keys
}
