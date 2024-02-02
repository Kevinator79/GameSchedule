import React, {useEffect, useState, useRef, Fragment} from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import FlashMessage from './FlashMessage'
import Vector from './logos/Vector.png';
import Vector1 from './logos/Vector (1).png';


function MakeSession(props) {
    const [unchosenFilters, setUnchosenFilters] = useState(['Casual', 'PC', 'Xbox Series X', 'Competitive', 'PS5', 'Xbox Series S', 'Newbie', 'PS4', 'Switch', 'Professional', 'PS3', 'Mobile', 'Intermediate', 'Xbox 360', 'Social', 'Streaming', 'Xbox One', 'Practice'])
    const [chosenFilters, setChosenFilters] = useState([])
    const [chosenFriends, setChosenFriends] = useState([])
    const [showFlashMessage, setShowFlashMessage] = React.useState(false)
    const [flashMessageSuccess, setFlashMessageSuccess] = React.useState(false)
    const [flashMessageText, setFlashMessageText] = React.useState('')
    const location = useLocation();
    let userId = location.state.userId
    let username = location.state.username
    let friendsInfo = location.state.friendsInfo
    let letterCount = 0
    let placeDots = false
    let moreDotsPlaced = false

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

    const displayFlashMessage = (showGreen, text) => {
        setFlashMessageSuccess(showGreen)
        setFlashMessageText(text)
        setShowFlashMessage(true)
        window.scrollTo({top: 0, behavior: 'smooth'})
        setTimeout(() => {setShowFlashMessage(false)}, 2000)
    }

    const deSelectAllFields = () => {
        document.getElementById("date").value = ""
        document.getElementById("time").value = ""
        document.getElementById("game").value = ""
        setChosenFilters([])
        setChosenFriends([])
        var elements = document.getElementById("select1").options;
        var elements2 = document.getElementById("select2").options;
        for(var i = 0; i < elements.length; i++){
            elements[i].selected = false;
        }
        for(var i = 0; i < elements2.length; i++){
            elements2[i].selected = false;
        }
    }

    const storeSession = (date, time, game) => {
        var url = 'http://127.0.0.1:8000/api/create-post/'
        var csrftoken = getCookie('csrftoken')
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'username':username,'date': date, 'time':time,'game': game})
        }).then((res) => {
            if (res.ok) {
                displayFlashMessage(true, 'Success. Session has been posted')
                deSelectAllFields()
                return res.json()
            }
            else {
                res.json().then(data => {
                    if (data == 'no-data') {
                        displayFlashMessage(false, 'Error. Not all required data provided')
                    }
                    else if (data == 'invalid-date') {
                        displayFlashMessage(false, 'Error. Date is not valid/needs leading zeroes')
                    }
                    else if (data == 'invalid-time') {
                        displayFlashMessage(false, 'Error. Time is incorrectly formatted')
                    }
                })
            }
        }).then((data) => {
            return data
        })
    }

    const storeFilters = (postId) => {
        var url = 'http://127.0.0.1:8000/api/create-post-filter/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'postId':postId,'filters':chosenFilters})
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
        }).then((data) => {
        })
    }
    
    const storeMember = (postId, username) => {
        var url = 'http://127.0.0.1:8000/api/store-session-members/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'postId':postId,'username':username})
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
        }).then((data) => {
        })
    }

    const storePost = (date, time, game) => {
        storeSession(date, time, game).then(postId => {
            if (chosenFilters.length > 0) storeFilters(postId) 
            storeMember(postId, username)
            for (var i=0;i<chosenFriends.length;i++) {
                storeMember(postId, chosenFriends[i])
            }
        })
    }

    const filterClicked = (e) => {
        letterCount = 0
        placeDots = false
        moreDotsPlaced = false
        var options = e.target.options
        var filters = []
        var tempFilters = chosenFilters.slice()
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected && !chosenFilters.includes(options[i].value)) {
                filters.push(options[i].value);
            }
            if (!options[i].selected && chosenFilters.includes(options[i].value)) {
                var removeIndex = chosenFilters.indexOf(options[i].value)
                tempFilters.splice(removeIndex, 1)
            }
        }
        setChosenFilters(tempFilters.concat(filters))
    }

    const friendClicked = (e) => {
        var options = e.target.options
        var chosen = []
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                chosen.push(options[i].value);
            }
        }
        console.log(chosen)
        setChosenFriends(chosen)
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
                    <div className="pushLeft" >
                        <img src={Vector} onClick={() => {navigate(`../home`,{state:{userId,username}})}} alt={"Home"} align="right" style={{cursor:'pointer'}}/>
                        <img src={Vector1} alt={"Settings"} align="right" />
                    </div>
                </div>
            </div>
            <div id="mainbox4">
                <h1>Create a game session</h1><br></br><br></br><br></br>
                <div id = "post-row" class = "row">
                    <div id="sidebox1">
                        <h2>Essential</h2>
                        <input type="text" className="Date" placeholder="Date (DD/MM/YYYY)" id="date"></input><br></br>
                        <input type="text" className="Time" placeholder="Time (e.g. 2pm)" id="time"></input><br></br>
                        <input type="text" className="Game" placeholder="Name of game" id="game"></input><br></br><br></br>
                    </div>   
                    <div id="sidebox2" className="custom-select">
                        <h2>Add tags</h2>
                        <select name="filterList" className="dropdownBox1" size="3" onChange={filterClicked} id="select1" multiple>
                        {unchosenFilters.map((filter, i) => {
                            return (
                            <option key={i}>
                                {filter}
                            </option>
                            );
                        })} 
                        </select>
                        {chosenFilters.length == 0 ? <div className="divider2" />: null}
                        {chosenFilters.map((filter, i) => {
                            letterCount = letterCount + filter.length
                            if (letterCount > 40 && placeDots) moreDotsPlaced = true
                            if (letterCount > 40 && !placeDots) placeDots = true
                            return (
                                <Fragment>
                                    {letterCount <= 40 ? <h4>{filter}</h4>: null}
                                    {letterCount > 40 && !moreDotsPlaced ? <h4>...</h4>: null}
                                </Fragment>
                            );
                        })} 
                        <br></br><br></br><br></br>
                        <h2>Add friends</h2>
                        <select className="dropdownBox2" size="3" onChange={friendClicked} id="select2" multiple>
                        {friendsInfo.map((friend, i) => {
                            return (
                            <option key={i}>
                                {friend}
                            </option>
                            );
                        })} 
                        </select>
                    </div>
                </div>
            </div>
            <div id="mainbox3">
                <button onClick={() => {storePost(document.getElementById('date').value,document.getElementById('time').value,document.getElementById('game').value)}}>Create</button>
                <div className = "divider" />
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

export default MakeSession