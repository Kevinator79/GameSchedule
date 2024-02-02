import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import FlashMessage from './FlashMessage'

function SignIn() {
    const [userId, setUserId] = useState(-1)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [showFlashMessage, setShowFlashMessage] = React.useState(false)
    const [flashMessageSuccess, setFlashMessageSuccess] = React.useState(false)
    const [flashMessageText, setFlashMessageText] = React.useState('')
    const isFirstRender = useRef(true)

    let navigate = useNavigate()

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

    useEffect(() => {
        if (isFirstRender.current) {
          isFirstRender.current = false // toggle flag after first render/mounting
          return;
        }
        navigate(`../home`,{state:{userId, username}})
      }, [username])

    const login = (username,password) => {
        var url = 'http://127.0.0.1:8000/api/login/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'username': username, 'email':null,'password': password})
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            else {
                setFlashMessageSuccess(false)
                setFlashMessageText('Error. Check username/password details are correct')
                setShowFlashMessage(true)
                window.scrollTo({top: 0, behavior: 'smooth'})
                setTimeout(() => {setShowFlashMessage(false)}, 2000)
            }
        }).then((data) => {
            setUserId(data.id)
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
                    <a href='/#' className='btns'>Features</a>
                    <a href='/#' className='btns'>About</a>
                    <a href='/#' className='btns'>Launch</a>
                    <a href= '/create-account' className='btns sure'>Sign Up</a>
                </div>
            </div>
            <div className='conlogo fn-clear'>
                <img className='fr' src={require('./assets/images/logo.png')}></img>
            </div>
            <div id="mainbox">
                <h1>Sign In</h1>
                <input type="text" className="Username" placeholder="Username" id="username"></input><br></br>
                <input type="password" className="Password" placeholder="Password" id="password"></input><br></br><br></br>
                <button onClick={() => login(document.getElementById('username').value, document.getElementById('password').value)}>Sign In</button>
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

export default SignIn