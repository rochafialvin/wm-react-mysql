const express = require('express')
const app = express()
const port = process.env.PORT || 9980
const path = require('path')

// __dirname, letak server berada
app.use(express.static(__dirname))
// __dirname + build, letak folder build berada
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => console.log('Running in production'))

// const path = require('path')
// console.log(__dirname)
// console.log(path.join(__dirname, 'build'))
// console.log(path.join(__dirname, 'build', 'index.html'))