module.exports = ({ env }) => {
  console.log('env:', env)
  console.log('env.int:', env.int("PORT", env.PORT || 1337))
  return(
  {
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", env.PORT || 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "15889532abb797000acf0f2ddb38a5d0"),
    },
  },
})}
