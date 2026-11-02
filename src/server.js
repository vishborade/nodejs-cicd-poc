const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Node.js CI/CD POC running on port ${PORT}`);
});
