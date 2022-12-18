import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from "axios";

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    //let [admin, setAdmin] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true);
    const Swal = require("sweetalert2")
    
    const [viewdetail, setviewdetails] = useState([])
    const Navigate = useNavigate ()

    let userSignup = async (e) => {
        console.log(e)
        let response = await axios.post("http://127.0.0.1:8000/user/register/",
          { 'username': e.username, 'email': e.email, 'password': e.password,'password2': e.password2 ,'first_name':e.first_name,'last_name':e.last_name })
        if (response.status === 201 || response.status === 200) {
          toast.success('You have succesfully Registered !', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          Navigate('/login')
        }
        else {
          console.log('something')
    
        }
      }

    let loginUser = async (e) => {
        
        console.log("loged in......");
        let response = await fetch("http://127.0.0.1:8000/user/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: e.username,
            password: e.password,
          }),
        });
    


        let data = await response.json();

        if(response.status === 200){
            console.log("logged in succekkkkkkkkkkkkkkkkkkkkkkkkss")
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            console.log("logged in sytfuygu76t",jwt_decode(data.access).is_superuser)
            console.log('daiuhfihrufh9ehy9',user,"jjjjjjjjjjjjjjjjjjj")

            localStorage.setItem("authTokens", JSON.stringify(data));
            if(jwt_decode(data.access).is_superuser){

              toast.success('You have successfully aaaaaaaaaaaaaa logged in ! ',{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              Navigate('/adminhome')

            }
            else{
              toast.success('You have successfully uuuuuuuuuuuuuuu logged in ! ',{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              Navigate('/')
            }
        }else{
          toast.error('Invalid Credentials', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      };

    
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        Navigate('/login')
    }



    let updateToken = async () => {
      console.log("update token......");
      let response = await fetch("http://127.0.0.1:8000/user/login/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'refresh': authTokens?.refresh })
      });
      let data = await response.json();
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
       // setAdmin(jwt_decode(data.access))
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        logoutUser();
      }
      if (loading) {
        setLoading(false)
      }
    };


    let viewDetails = (id) => {
      axios.get(`http://127.0.0.1:8000/user/viewdetail/${id}`).then((response) => {
        setviewdetails(response.data)
  
      })
  
    }

  //   let updateAdminToken = async () =>{
  //     console.log('update token');
  //     let response = await fetch('http://127.0.0.1:8000/user/login/refresh/',{
  //         method:'POST',
  //         headers:{
  //             'Content-Type':'application/JSON'
  //         },
  //         body:JSON.stringify({'refresh':authTokens?.refresh})
  //     })

  //     let data = await response.json()

  //     if (response.status === 200) {

  //         setAuthTokens(data)
  //         setAdmin(jwt_decode(data.access))
  //         localStorage.setItem('authTokens',JSON.stringify(data))
          
  //     } else {
  //         logoutAdmin()
          
  //     }

  // }


    let contextData = {
        user:user,
      //  admin:admin,
        authTokens:authTokens,
        viewdetail: viewdetail,
       
        userSignup:userSignup,
        viewDetails: viewDetails,
        loginUser:loginUser,
        logoutUser:logoutUser,
      
    }


    useEffect(()=> {

        if(loading){
            updateToken()
           // updateAdminToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
              //  updateAdminToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}