import './App.css'
import Signup from './components/Signup'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Signin from './components/Signin'
import { Verify } from './components/verify'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/Signin" element={<Signin/>}/>
          <Route path="/verify" element={<Verify/>} />
          <Route path="/verifyemail/:verificationtoken" element={<Verify/>} />
          
        </Routes>
      </Router> 
    </>
  )
}

export default App
