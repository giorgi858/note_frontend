import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotePageLists from './components/NotePageLists'
import NoteList from './components/NoteList'

const App = () => {
  return (
    <div className='container'>
      <div className='app'>
      <Routes>
        <Route path='/' Component={NotePageLists}/>
        <Route path='/note/:id' Component={NoteList}/>
      </Routes>
      </div>
    </div>
 
    
  )
}

export default App