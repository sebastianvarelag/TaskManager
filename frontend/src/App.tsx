import { Route, Routes } from 'react-router-dom'
import './App.css'
import { NavbarComponent } from './components/NavbarComponent'
import { TaskListComponent } from './components/TaskListComponent'
import { TaskEditComponent } from './components/TaskEditComponent'
import { FormTaskComponent } from './components/FormTaskComponent'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <div className='bg-secondary min-vh-100 min-vw-100'>
        <header>
          <NavbarComponent />
        </header>
        <main className='p-4 w-100'>
          <Routes>
            <Route path="/" element={<TaskListComponent/>} />
            <Route path='/new' element={<FormTaskComponent/>} />
            <Route path='/edit/:taskId' element={<TaskEditComponent/>} />
          </Routes>
        </main>
      </div>
      <Toaster/>
    </>
  )
}

export default App
