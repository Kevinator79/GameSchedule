import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './index.css'
import FlashMessage from './FlashMessage'

function ContactUs() {
    const navigate = useNavigate();
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

    const deselectFields = () => {
        document.getElementById("email").value = ""
        document.getElementById("first").value = ""
        document.getElementById("second").value = ""
        document.getElementById("desc").value = ""
    }

    const displayFlashMessage = (showGreen, text) => {
        setFlashMessageSuccess(showGreen)
        setFlashMessageText(text)
        setShowFlashMessage(true)
        window.scrollTo({top: 0, behavior: 'smooth'})
        setTimeout(() => {setShowFlashMessage(false)}, 2000)
    }

    const sendMessage = (email, fName, sName, message) => {
        var url = 'http://127.0.0.1:8000/api/send-contact-message/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'email': email, 'firstname': fName,'surname': sName, 'message': message})
        }).then((res) => {
            if (res.ok) {
                displayFlashMessage(true,'Success. We have received your message')
                deselectFields()
            }
            else {
                displayFlashMessage(false,'Error. Make sure all all fields are complete')
            }
            
        }).then((data) => {
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
                    <a href='/#' className='btns sure'>Sign Up</a>
                </div>
            </div>
            <div className='conlogo fn-clear'>
                <img className='fr' src={require('./assets/images/logo.png')}></img>
            </div>
            <div id="mainbox">
                <h1>Contact Us</h1>
                <input type="text" id="email" placeholder="Email"></input><br></br>
                <p className='btn-group'>
                    <input type="text" className="Username btn" id="first" placeholder="First Name"></input>
                    <input type="text" className="Username btn" id="second" placeholder="Last Name"></input>
                </p><br></br>
                <textarea id="desc" placeholder="What can we do for you?" rows="5"></textarea><br></br>
                <button onClick={() => {sendMessage(document.getElementById('email').value,document.getElementById('first').value,document.getElementById('second').value,document.getElementById('desc').value)}}>Send Feedback</button>

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
                        <p className='desc'><a href='/#'>About</a></p>
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

export default ContactUs