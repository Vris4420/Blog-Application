import Post from "./components/post"
import Header from "./components/header"
import Layout from "./components/layout"
import {Route, Routes} from "react-router-dom"
import './App.css'
import IndexPage from "./components/pages/indexPage"
import LoginPage from "./components/pages/loginPage"
import RegisterPage from "./components/pages/registerPage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<IndexPage />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/register'} element={<RegisterPage/>}/>

      </Route>

    </Routes>
  )
}

export default App
