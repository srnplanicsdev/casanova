import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import Table from "./components/Table"



function App() {
const [data, setData] = useState([])

const fetchData = async() => {
  try {
    const responce = await axios.get("https://dummyjson.com/users")
    setData(responce.data.users)
  } catch (error) {
    console.log(error)
  }
}
useEffect(() => {
  fetchData()
}, [])

  return (
    <>
      <Table data={data}/>
    </>
  )
}

export default App
