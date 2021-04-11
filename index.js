const app = require('./app')
const PORT = process.env.PORT || 3000

app.listen(PORT,  err => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
