import React, {useEffect, useState, useRef} from 'react'
import { useNavigate } from "react-router-dom";
import './index.css'
import FlashMessage from './FlashMessage'

function CreateAccount() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const isFirstRender = useRef(true)
    const [showFlashMessage, setShowFlashMessage] = React.useState(false)
    const [flashMessageSuccess, setFlashMessageSuccess] = React.useState(false)
    const [flashMessageText, setFlashMessageText] = React.useState('')
    
    let navigate = useNavigate();

    const getCookie = (name) => {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const displayFlashMessage = (showGreen, text) => {
        setFlashMessageSuccess(showGreen)
        setFlashMessageText(text)
        setShowFlashMessage(true)
        window.scrollTo({top: 0, behavior: 'smooth'})
        setTimeout(() => {setShowFlashMessage(false)}, 2000)
    }

    useEffect(() => {
        if (isFirstRender.current) {
          isFirstRender.current = false // toggle flag after first render/mounting
          return;
        }
        navigate(`../home`,{state:{username, email}})
      }, [username,email])
      
    const signUp = (email, username, password) => {
        var url = 'http://127.0.0.1:8000/api/signup/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'email':email,'username': username, 'password': password})
        }).then((res) => {
            console.log(res)
            if (res.ok) {
                return res.json()
            }
            else {
                res.json().then(data => {
                    console.log(data)
                    if (data == 'email-exists') displayFlashMessage(false, 'Error. Email is already in use')
                    if (data == 'username-exists') displayFlashMessage(false, 'Error. Username is taken')
                    if (data == 'empty-field') displayFlashMessage(false, 'Error. Not all data provided')
                })
            }
        }).then((data) => {
            setUsername(data.username)
            setEmail(data.email)
        })
    }

    return (
        <div id="content">
            {showFlashMessage ? <FlashMessage sendData={[showFlashMessage, flashMessageSuccess, flashMessageText]}/>:<FlashMessage sendData={[showFlashMessage, flashMessageSuccess, flashMessageText]}/> }
            <div className='topline'>
                <div className='fl logo'>
                    <img src={require('./assets/images/logo.png')}></img>
                    gameschedule
                </div>
                <div className='fr'>
                </div>
            </div>
            <div className='conlogo fn-clear'>
                <img className='fr' src={require('./assets/images/logo.png')}></img>
            </div>
            <div id="mainbox2">
                <h1>Create Your Account</h1>
                <input type="text" className="Email" placeholder="Email" id="email"></input><br></br>
                <input type="text" className="Username" placeholder="Username" id="username"></input><br></br>
                <input type="password" className="Password" placeholder="Password" id="password"></input><br></br>

                <button onClick={() => {signUp(document.getElementById('email').value,document.getElementById('username').value,document.getElementById('password').value)}}>Register</button>
            </div>
            <div id = "smallbox">
                <h3><a href='../sign-in'>Already have an account? Login</a></h3>
            </div>
            <div className='footer fn-clear'>
                <div className='fl leftbox'>
                    <img className='flogo' src={require('./assets/images/footlogo.png')}></img>
                    <p className='line fn-clear'>
                        <img className='fl' src={require('./assets/images/b1.png')}></img>
                        <img className='fl' src={require('./assets/images/b2.png')}></img>
                        <img className='fl' src={require('./assets/images/b3.png')}></img>
                        <img className='fl' src={require('./assets/images/b4.png')}></img>
                    </p>
                    <p className='desc'>Copyright 2022 Gamer's Calendar</p>
                </div>
                <div className='fr'>
                    <div className='fl'>
                        <p className='tit'>ABOUT</p>
                        <p className='desc'><a href='/privacy-policy'>GDPR</a></p>
                        <p className='desc'><a href='/#'>Terms</a></p>
                        <p className='desc'><a href='/#'>Legal</a></p>
                    </div>
                    <div className='fl'>
                        <p className='tit'>CONTACT</p>
                        <p className='desc'><a href='/#'>Press</a></p>
                        <p className='desc'><a href='/#'>Support</a></p>
                    </div>
                    <div className='fl'>
                        <p className='tit'>SOCIAL</p>
                        <p className='desc'><a href='/#'>Twitter</a></p>
                        <p className='desc'><a href='/#'>Instagram</a></p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CreateAccount