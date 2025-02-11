import './App.css'
import Layout from './layout'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import Single from './components/Single/Single'
import Double from './components/Double/Double'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/"  element={<Layout />}>
      <Route path='' element={<Single/>}/>
      <Route path='double' element={<Double/>}/>
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
