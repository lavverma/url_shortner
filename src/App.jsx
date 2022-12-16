import { useState } from 'react'
import axios from 'axios'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import './App.css'

const serverUrl = import.meta.env.VITE_SERVER_URL

function App() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [show, setShow] = useState(true)

  const url =  (e) =>{
      setLongUrl(e.target.value)
  }

  const shortenUrl = async ()=>{
    try{
      const res = await axios.post(`${serverUrl}/url/shorten` , {longUrl : longUrl})
      console.log(res.data.data.shortUrl)
      setShortUrl(res.data.data.shortUrl)
      setLongUrl("")
      setShow(false)
    }catch(err){
       alert(err.response.data.message)
    }
  }

  return (
    <div className="App">
    <h1>URL Shortener</h1>

      {
        show  ? (<div className='longUrl'>
      <input type='text' name='longUrl' value={longUrl} onChange={(e)=>url(e)} />
      <button onClick={()=>shortenUrl()} className="btn1">Shorten Url</button>
      </div>
        ) : ( <div className='shortUrl'>
        <input type='text' name='shortUrl'  value={shortUrl} />
        <CopyToClipboard text={shortUrl} id="clip">
            <button>Copy Shorten URL</button>
          </CopyToClipboard>
        </div>)
      }
      
      </div>
  )
}

export default App
