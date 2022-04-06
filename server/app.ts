import express, { Application } from 'express'
import bodyParse from 'body-parser'
import fs from 'fs'
import path from 'path'
const app: Application = express()

app.use(bodyParse.urlencoded({ extended: true }))
app.use(bodyParse.json())

//设置允许跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-methods', 'POST, GET, PUT, DELETE, OPTIONS')
  next()
})

app.get('/todolist', (req, res) => {
  const todolist = fs.readFileSync(path.resolve(__dirname, 'todo.json'),'utf-8')
  console.log(todolist)
  res.send(todolist)
})

app.post('/toggle', (req, res) => {})

app.post('/remove', (req, res) => {})

app.post('/add', (req, res) => {})

app.listen(8080, () => {
  console.log('服务运行在8080端口')
})
