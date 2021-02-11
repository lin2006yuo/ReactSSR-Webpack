const express = require("express")
const app = express()
const React =  require('react')
const ReactDOMServer = require("react-dom/server")
const ServerApp = require("../client/app").default
const path = require("path")
const fs = require("fs")
const { ServerLocation } = require("@reach/router")

const template = fs.readFileSync(
  path.join(__dirname, "../../dist/index.html"),
  "utf-8"
)
// const appString = ReactDOMServer.renderToString(ServerApp)
// const indexHTML = template.replace("<!-- app -->", appString)
// console.log(indexHTML)

app.use(express.static(path.join(__dirname, "../../dist")))

app.get("*", (req, res) => {
  const appString = ReactDOMServer.renderToString(
    <ServerLocation url={req.url}>
      <ServerApp />
    </ServerLocation>
  )
  const indexHTML = template.replace("<!-- app -->", appString)
  res.send(indexHTML)
})
// renderReact(app)

const PORT = process.env.port || 3000
app.listen(PORT, () => console.log(`server started at ${PORT}`))
