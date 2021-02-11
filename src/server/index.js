const express = require("express")
const app = express()
const ReactDOMServer = require("react-dom/server")
const serverApp = require("../../dist/server_app").default
const path = require("path")
const fs = require("fs")

const template = fs.readFileSync(path.join(__dirname, "../../dist/index.html"), 'utf-8')
const appString = ReactDOMServer.renderToString(serverApp)
const indexHTML = template.replace('<!-- app -->', appString)

app.use(express.static(path.join(__dirname, '../../dist')))

app.get('/', (req, res) => {
  res.send(indexHTML)
})

const PORT = process.env.port || 3000
app.listen(PORT, () => console.log(`server started at ${PORT}`))
