import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'
import AddButton from './AddButton'

const NotePageLists = () => {
  const [notes, setNotes] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const API_URL = '/api/notes/'


  useEffect(() => {
    const getNotes = async ()=> {
      try {
        const response =  await fetch(API_URL)
        if(!response.ok) throw Error('Did not receive expected data')
        const data = await response.json()
        setNotes(data)
        setFetchError(null)

      } catch (error) {
        setFetchError(error.message)
      }
    }
      getNotes()
  }, [])

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
        {fetchError && <p className='error'>{`Error :${fetchError}`}</p>}
        <div className="notes-listx">
        {notes.map((note, index) => (
            <ListItem key={index} note={note} />
        ))}
        </div>
        <AddButton/>
    </div>
  )
}

export default NotePageLists