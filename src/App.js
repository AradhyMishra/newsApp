import './App.css';
import Navbar from './component/Navbar';
import React,{useState} from 'react'
import News from './component/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
 
const App = () =>{

  const API_KEY = "d5fe8b427bb046ec9f9dc28fd5856ffd";
  const pageSize = 10;
  const [progress,setProgress] = useState(0);
  
  
    return (
      <>
      <div >
      
      <BrowserRouter>
      <LoadingBar
        color='#f95959'
        progress={progress}
        /* onLoaderFinished={() => setProgress(0)} */
      />
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<News API_KEY = {API_KEY} setProgress = {setProgress} key = "general" pageSize = {pageSize} country = "us" category = "general"/>}/>
        <Route exact path="/technology" element={<News API_KEY = {API_KEY} setProgress = {setProgress} key = "technology" pageSize = {pageSize} country = "us" category = "technology"/>}/>
        <Route exact path="/general" element={<News API_KEY = {API_KEY} setProgress = {setProgress} key = "general" pageSize = {pageSize} country = "us" category = "general"/>}/>
        <Route exact path="/sports" element={<News API_KEY = {API_KEY} setProgress = {setProgress} key = "sports" pageSize = {pageSize} country = "us" category = "sports"/>}/>
        <Route exact path="/science" element={<News API_KEY = {API_KEY} setProgress = {setProgress} key = "science" pageSize = {pageSize} country = "us" category = "science"/>}/>
        <Route exact path="/entertainment" element={<News API_KEY = {API_KEY} setProgress = {setProgress}  key = "entertainment"pageSize = {pageSize} country = "us" category = "entertainment"/>}/>
        <Route exact path="/business" element={<News API_KEY = {API_KEY} setProgress = {setProgress}  key = "business"pageSize = {pageSize} country = "us" category = "business"/>}/>
        <Route exact path="/health" element={<News API_KEY = {API_KEY} setProgress = {setProgress}  key = "health"pageSize = {pageSize} country = "us" category = "health"/>}/>
         <Route index element={<News API_KEY = {API_KEY} setProgress= {setProgress}  pageSize = {pageSize} country = "us" category = "general"/>}> 
        </Route> 
       </Routes>
    </BrowserRouter> 
      </div>
      </>
    )
  
}
export default App