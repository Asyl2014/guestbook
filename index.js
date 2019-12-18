const express = require('express');
const session = require('express-session')
const mysql   = require('mysql');
require('dotenv').config() // файл для паролей
// const fs = require('fs') убирается так как все загружено в базу данныъ
const db = mysql.createConnection({
  host     : process.env.GUESTBOOK_DB_HOST,
  port     : process.env.GUESTBOOK_DB_PORT,
  user     : process.env.GUESTBOOK_DB_USER,
  password : process.env.GUESTBOOK_DB_USER_PASSWORD,
  database : process.env.GUESTBOOK_DB_NAME
});


const app = express();

//const messages = JSON.parse(fs.readFileSync('./messages.json', 'utf8'))

app.set('view engine', 'ejs') // важно
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'super keyboard cat',
  resave: false,
  saveUninintialized: true,
  cookie: { secure: false}
}))
app.use(express.static('public'))

app.get('/', (request, response) => {
  db.query('SELECT * FROM messages;', (error, result) => {
    If (error) {
        console.error('Failed to load entries from the database.')
        response.status(500).end();

        return;

    }

    response.render('index', { messages, session: request.session })
  })
})


app.post('/message/create', (request, response) => {
  const body = request.body

  const name = body.name
  const content = body.content

  if (name && content) {
      db.query(`INSERT INTO `choturaliev_a_db`.`messages01` (`name`, `content`) VALUES (?, ?)`, [name, content], error => {
  } 
  
  
    else {
    request.session.error = "Имя или сообщение не могут быть пустыми";
  }

  response.redirect('/')
})

const port = 8899
app.listen(port, () => console.log(`Guestbook app listenning on port ${port}!`))

