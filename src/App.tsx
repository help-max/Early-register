import { useState } from 'react'
import Welcome from './components/Welcome'
import Signup from './components/Signup'
import RegistrationComplete from './components/RegistrationComplete'

function App() {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'signup' | 'complete'>('welcome')
  const [userEmail, setUserEmail] = useState<string>('')
  const [userName, setUserName] = useState<string>('')

  return (
    <>
      {currentPage === 'welcome' && <Welcome onGetStarted={() => setCurrentPage('signup')} />}
      {currentPage === 'signup' && (
        <Signup 
          onComplete={(email, name) => {
            setUserEmail(email);
            setUserName(name);
            setCurrentPage('complete');
          }} 
        />
      )}
      {currentPage === 'complete' && <RegistrationComplete userEmail={userEmail} userName={userName} />}
    </>
  )
}

export default App
