import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Table = ({data}) => {
    const[search, setSearch] = useState("")
    const [filter, setFilter] = useState(data)

    const handleSearch=(e) => {
      const value = e.target.value.toLowerCase()
      setSearch(value)
      const searchItem = data.filter((item)=>
        item.firstName.toLowerCase().includes(value) ||  item.gender.toLowerCase().includes(value)
      )
      setFilter(searchItem)
      
    }
    const handleFileter = (status)=>{
      const filterItem = data.sort((a,b)=>
        a[status] - b[status]
      )
      setFilter(filterItem)
    }
    
   useEffect(() => {
  setFilter(data)
}, [data])

  return (
    <div>
        <input type="text" name="" id=""value={search} onChange={handleSearch} />
      <table>
        <thead>
            <tr>
                <th onClick={()=>handleFileter("firstName")}>firstName</th>
                <th>lastName</th>
                <th>maidenName</th>
                <th>age</th>
                <th>phone</th>
                <th>weight</th>
                <th>gender</th>
            </tr>
        </thead>
        
        <tbody>
            {filter.map((d)=>(
                <tr key={d.id}>
                    <td>{d.firstName}</td>
                    <td>{d.lastName}</td>
                    <td>{d.maidenName || "-"}</td>
                    <td>{d.age}</td>
                    <td>{d.phone}</td>
                    <td>{d.weight}</td>
                    <td>{d.gender}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
