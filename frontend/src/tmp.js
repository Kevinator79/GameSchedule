import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './index.css'

function SignIn() {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div id="content">
            <div className='topline'>
                <div className='fl logo'>
                    <img src={require('./assets/images/logo.png')}></img>
                    Gamer's Calendar
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
                <h1>Sign In</h1>
                <input type="text" className="Username" placeholder="Username" id="username"></input><br></br>
                <input type="password" className="Password" placeholder="Password" id="password"></input><br></br><br></br>
                <button onClick={() => {
                        navigate(`/ContactUs`);
                }}>Sign In</button>

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

export default SignIn