import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function UserSettings(props) {
    let navigate = useNavigate()
    const location = useLocation();
    let userId = location.state.userId
    let username = location.state.username

    const [email, setEmail] = useState('')
    const [showFlashMessage, setShowFlashMessage] = React.useState(false)
    const [flashMessageSuccess, setFlashMessageSuccess] = React.useState(false)
    const [flashMessageText, setFlashMessageText] = React.useState('')

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

    const updateEmail = (email) => {
        var url = 'http://127.0.0.1:8000/api/update-email/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'username': username, 'email':email,'password': null})
        }).then((res) => {
            if (res.ok) {
                setFlashMessageSuccess(true)
                setFlashMessageText('Success. Email has been changed.')
                setShowFlashMessage(true)
                window.scrollTo({top: 0, behavior: 'smooth'})
                setTimeout(() => {setShowFlashMessage(false)}, 2000)
                return res.json()
            }
            else {
                setFlashMessageSuccess(false)
                setFlashMessageText('Error. Check email details are correct')
                setShowFlashMessage(true)
                window.scrollTo({top: 0, behavior: 'smooth'})
                setTimeout(() => {setShowFlashMessage(false)}, 2000)
            }
        }).then((data) => {
            setEmail(data.email)
        })
    }

    const updatePassword = (password, newPassword) => {
        var url = 'http://127.0.0.1:8000/api/update-password/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'username': username,'password': password, 'newPassword': newPassword})
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            else {
                setFlashMessageSuccess(false)
                setFlashMessageText('Error. Incorrect password')
                setShowFlashMessage(true)
                window.scrollTo({top: 0, behavior: 'smooth'})
                setTimeout(() => {setShowFlashMessage(false)}, 2000)
            }
        }).then((data) => {
            setEmail(data.email)
        })
    }

    return (
        <div id="content">
            <div className='topline'>
                <div className='fl logo'>
                    <img src={require('./assets/images/logo.png')}></img>
                    gameschedule
                </div>
                <div className='fr'>
                    <a className='btns'>Welcome, {username}!</a>
                </div>
            </div>
            <div id="mainbox3">
                <h1>Settings</h1>
                <h2>Update Email</h2>
                <input type="text" className="UpdateEmail" placeholder="Update Email" id="email"></input><br></br>
                <button onClick={() => updateEmail(document.getElementById('email').value)}>Update Email</button>
                <div className = "divider" />
                <h2>Change Password</h2>
                <input type="password" className="UpdatePassword" placeholder="New Password" id="newPassword"></input><br></br>
                <input type="password" className="password" placeholder="Current Password" id="password"></input><br></br>
                <button onClick={() => updatePassword(document.getElementById('password').value, document.getElementById('newPassword').value)}>Change Password</button>
                <div className = "divider" />
                <button onClick={() => navigate(`../home`,{state:{username}})}>Back</button>
                
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

export default UserSettings