const { response } = require('express')
const express = require('express')
var morgan = require('morgan')
const app = express()
app.use(express.json())

app.use(morgan('tiny'))
const cors = require('cors')

app.use(cors())


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

app.get('/api/persons', (request,response) => {
    response.send( persons)
})
app.get('/api/info', (request,response) => {
    response.send('<p> Currently there are ' + persons.length +' persons in the phonebook!</p><p>'+new Date().toISOString()+'</p>')
})

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
        response.send('<p>ID NOT FOUND, ERROR 404!')
      response.status(404).end()
    }
  })
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const generatedId = Math.random(0,100000)
    console.log(generateId)
    return generatedId
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
    if (!person.name || !person.number){
        return response.status(400).json({
            error:'incorrect input, person name or number is missing'
        })
    }
    if (persons.find(person => person.name)) {
      return response.status(400).json({
        error:'name already exists. try again'
      })
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

  const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }


  app.use(unknownEndpoint)
  app.use(requestLogger)

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })