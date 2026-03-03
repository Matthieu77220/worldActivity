import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'
import Landing from './Landing'
import PagePrincipale from './PagePrincipale'

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/pageprincipale' element={<PagePrincipale />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
