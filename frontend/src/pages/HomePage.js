import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import Header from '../components/Header'
import { useNavigate } from 'react-router'
import axios from "axios"

const HomePage = () => {
    const Navigate =useNavigate()
    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [exist, setExist] = useState(true)
    const {user} = useContext(AuthContext)

    useEffect(()=>{
      console.log("pppppppppppppppppppppppppppppppppp")
      const id = user.user_id
      axios.get(`http://127.0.0.1:8000/user/existapplication/${id}/`).then((response)=>{
        console.log(response.status) 
        if(response.status===200){
          setExist(false)
          console.log("status 200 esist ",exist)
        }
        else{
          console.log("status 403 not exist",exist)
        }
        console.log("gyjjguloyoyo8y888888888",exist)
      })
    },[])

    return (
        <div>
      <Header />
      <div className='containerhome'>
        <div className='row mt-3 mb-3'>
          <h1 className='text-white '>Fill up the form</h1>
          <div className='container' >

          { !exist? <p>You have a pending application.Wait for the approvel</p>
            
            : <button type="button" className="btn btn-primary btn-sm mt-2 mx-5 width210" onClick={() => Navigate('/application')}>APPLICATION FORM</button> }

          </div>
        </div>
      </div>
    </div>
    )
}

export default HomePage