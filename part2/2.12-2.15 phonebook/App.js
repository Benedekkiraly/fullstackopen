import { useState,useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import SubmitForm from './components/SubmitForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhone] = useState('')
  const [searchTerm, setSearchTerm ] = useState('')

  useEffect(() => {
    console.log('effect')
    const fetchData=async() =>{
      const result = await
    axios
      .get('http://localhost:3001/persons').then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })}
      fetchData()
  }, [])


const updateNumber = (id,name,newnum) => {
  const newObj = {
    name: name,
    number: newnum,
    id: id
    } 
    console.log("itt update" + newObj.name, newObj.id, newObj.number)

  personService
  .update(id,newObj)


}

  const addPerson = (event) => {
    event.preventDefault()
      const personObject = {
      name: newName,
      number: newPhoneNumber,
      id: persons.length + 1
  } 
  if (persons.filter(person => person.name === personObject.name).length  > 0){
    if (window.confirm(personObject.name + " already exists in the database, do you want to overwrite?")) {
      const foundPerson = persons.find(person=> person.name === personObject.name)
      console.log("idenézz"+foundPerson.id, foundPerson.name, newPhoneNumber)
      updateNumber(foundPerson.id,foundPerson.name,personObject.number)
      setNewName('')
      setNewPhone('')
    }}
  else{setPersons(persons.concat(personObject))
    axios
      .post('http://localhost:3001/persons',personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewPhone('')
      })
    console.log("Added person")
  }
}

const deletePerson = id => {
  if(window.confirm("Do you really want to remove user with id " + " ?")){
  const toDelete = persons.find(person => person.id === id)
  console.log(toDelete)
  personService
    .remove(id)
    .catch(error => {
      alert(
        "User with id " + id + " has been already deleted!"
      )
    })
  setPersons(persons.filter(person => person.id !== id))
  console.log("lol" + persons)
}


}

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
  console.log(filteredPersons)

  const Person = ({ person }) => {
   
      return (
        <li>{person.name} {person.number} <button type="submit" onClick={function(){deletePerson(person.id)}}>Delete</button></li>
      )
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <SearchBar value = {searchTerm} onChange={handleSearch} />
      </div>
      <h2>Add new</h2>
        <SubmitForm onSubmit={addPerson} nameValue={newName} nameOnChange={handleNameChange} phoneValue={newPhoneNumber} phoneOnChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => 
          <Person key={person.id} person={person} /> )}
      </ul>
    </div>
  )
}

export default App