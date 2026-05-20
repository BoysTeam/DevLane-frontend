import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import SignInPage from './pages/SignInPage'

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signinpage" element={<SignInPage />} />
    </Routes>

  )
}