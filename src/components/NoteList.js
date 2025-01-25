import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { useNavigate } from 'react-router-dom'

const NoteList = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  let [note, setNote] = useState(null)
  const [fetchError, setFetchError] = useState(null)
  const Get_Note_URL = `/api/notes/${id}`
  const Update_Note_URL =  `/api/notes/${id}/`
  const Delete_Note_URL =  `/api/notes/${id}/`
  const Create_Note_URL =  `/api/notes/`



useEffect(() => {
  const getNote = async ()=> {
    try {
      if (id === 'new') return
      const response =  await fetch(Get_Note_URL)
      if(!response.ok) throw Error('Did not receive expected data')
      const data = await response.json()
      setNote(data)
      setFetchError(null)

    } catch (error) {
      setFetchError(error.message)
    }
  }
    getNote()
}, [id])

const createNote = async () => {
  try {
    fetch(Create_Note_URL, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
      
  })

  } catch (error) {
    console.log('update error');
    setFetchError(error.message)
  }
}



  const updateNote = async () => {
    try {
      fetch(Update_Note_URL, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
        
    })
    
    } catch (error) {
      console.log('update error');
      setFetchError(error.message)
    }
  }

  const deleteNote = async () => {
    try {
      fetch(Delete_Note_URL, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },        
    })
    navigate('/')

    } catch (error) {
      setFetchError(error.message)
    }
  }






const handleSubmit = () => {
  if (id !== 'new' && note.body === ''){
    deleteNote()
  } else if (id !== 'new'){
    console.log('s')
    updateNote()
  } else if (id === 'new' && note !== null) {
    createNote()
  }
  navigate('/')
}


let handleChange = (value) => {
  setNote(note => ({ ...note, 'body': value }))
  console.log('Handle Change:', note)
}


  return (
    <div className='note'>
      <div className="note-header">
      <h3>
       <ArrowLeft onClick={handleSubmit} />
          </h3>
          {id !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
            ):(
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      
      {fetchError && <p className='error'>{`Error :${fetchError}`}</p>}
      <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
    </div>
  )
}

export default NoteList