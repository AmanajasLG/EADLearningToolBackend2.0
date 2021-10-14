module.exports = ({ env, process }) => {
  console.log('env:', env)
  console.log('process', process)
  return(
  {
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", process.env.PORT || 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "15889532abb797000acf0f2ddb38a5d0"),
    },
  },
})}
