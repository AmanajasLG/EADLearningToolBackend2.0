module.exports = ({ env }) => ({
  host: "0.0.0.0",
  port: process.env.PORT || 5000,
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "15889532abb797000acf0f2ddb38a5d0"),
    },
  },
});
