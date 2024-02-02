import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Home(props) {
    let navigate = useNavigate()
    const location = useLocation();
    let userId = location.state.userId
    let username = location.state.username

    const getAllUsers= () => {
        var url = 'http://127.0.0.1:8000/api/user-list/'
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
        }).then((data) => {
            var withoutMe = data.slice()
            var meIndex = withoutMe.indexOf(username)
            withoutMe.splice(meIndex,1)
            var splitAt = Math.ceil(withoutMe.length / 2)
            var arr1 = withoutMe.slice(0,splitAt)
            var arr2 = withoutMe.slice(splitAt,withoutMe.length)
            return [arr1,arr2]
        })
    }

    const getAllFriends = () => {
        var url = 'http://127.0.0.1:8000/api/friend-list/'
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
        }).then((data) => {
            return data
        })
    }

    const goToFriends = () => {
        getAllUsers().then(data => {
            var col1 = data[0]
            var col2 = data[1]
            getAllFriends().then(data => {
                var send = [[col1,col2],data]
                navigate(`../add-friends`,{state:{userId, username, send}})
            })
        })
    }

    const goToMakeSession = () => {
        getAllFriends().then(data => {
            var friendsInfo = []
            for (var i=0;i<data.length;i++) {
                if (data[i][0] == username) friendsInfo.push(data[i][1])
                if (data[i][1] == username) friendsInfo.push(data[i][0])
            }
            navigate(`../create-session`,{state:{userId, username, friendsInfo}})
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
                <h1>What are you looking to do?</h1>
                <button onClick={() => goToMakeSession()}>Make session</button>
                <div className = "divider" />
                <button onClick={() => navigate(`../look-by-date`,{state:{userId, username}})}>Look for sessions</button>
                <div className = "divider" />
                <button onClick={() => navigate(`../show-my-sessions`,{state:{username}})}>View your sessions</button>
                <div className = "divider" />
                <button onClick={() => goToFriends()}>Add friends</button>
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

export default Home