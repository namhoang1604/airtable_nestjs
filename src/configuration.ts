export default () => ({
  database: {
    uri: process.env.DATABASE_URL,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  airtable: {
    baseUrl: process.env.AIRTABLE_BASE_URL,
    apiKey: process.env.AIRTABLE_API_KEY,
  },
});
