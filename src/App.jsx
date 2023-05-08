import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5074/user')
    .then((res) => res.json())
    .then(data => setUsers(data))
  },[])

  const handleAddUser = event => {
    event.preventDefault()
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;

    const user = {name, email}

    fetch('http://localhost:5074/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      const newUsers = [...users, data];
      setUsers(newUsers);
      form.reset()
    })

    console.log(user)
  }


  return (
    <>
      <h1>Add users</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Name" id="" />
        <br />
        <input type="email" name="email" placeholder="Email" id="" />
        <br />
        <input type="submit" value="Submit"/>
      </form>
      <div>
          <h3>Users</h3>
          {
            users.map(user => <p key={user.id}>{user.id} {user.name} {user.email}</p>)
          }
      </div>
    </>
  )
}

export default App
