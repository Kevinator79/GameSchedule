import React, {useEffect,Fragment} from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Vector from './logos/Vector.png';
import Vector1 from './logos/Vector (1).png';
import Avatar from './logos/avatar.png'
import Friend from './logos/add-friend.png'
import FlashMessage from './FlashMessage'

function AddFriends() {
    let navigate = useNavigate()
    const location = useLocation()
    const [friendsColumn1, setFriendsColumn1] = React.useState(location.state.send[0][0])
    const [friendsColumn2, setFriendsColumn2] = React.useState(location.state.send[0][1])
    const [showFlashMessage, setShowFlashMessage] = React.useState(false)
    const [flashMessageSuccess, setFlashMessageSuccess] = React.useState(false)
    const [flashMessageText, setFlashMessageText] = React.useState('')
    let userId = location.state.userId
    let username = location.state.username
    let friendsInfo = location.state.send[1]

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

    const registerKeyPress = (e) => {
        var enteredText = e.target.value
        var allFriends = location.state.send[0][0].concat(location.state.send[0][1])
        var filteredFriends = allFriends.filter((friend) => friend.toLowerCase().startsWith(enteredText.toLowerCase()))
        var splitAt = Math.ceil(filteredFriends.length / 2)
        setFriendsColumn1(filteredFriends.slice(0,splitAt))
        setFriendsColumn2(filteredFriends.slice(splitAt,filteredFriends.length))

    }

    const isMyFriend = (theirUsername) => {
        var myFriend = false
        for (var i=0;i<friendsInfo.length;i++) {
            if ((friendsInfo[i][0] == theirUsername) && (friendsInfo[i][1] == username)) {
                myFriend = true
                break
            }
            if ((friendsInfo[i][1] == theirUsername) && (friendsInfo[i][0] == username)) {
                myFriend = true
                break
            }
        }
        return myFriend
    }

    const displayFlashMessage = (showGreen, text) => {
        setFlashMessageSuccess(showGreen)
        setFlashMessageText(text)
        setShowFlashMessage(true)
        window.scrollTo({top: 0, behavior: 'smooth'})
        setTimeout(() => {setShowFlashMessage(false)}, 2000)
    }

    const makeFriendRequest = (theirUsername) => {
        var url = 'http://127.0.0.1:8000/api/make-friend-request/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'username1': username, 'username2': theirUsername})
        }).then((res) => {
            if (res.ok) {
                displayFlashMessage(true,'Success. Friend request has been sent')
                return res.json()
            }
            else if (res.status == 403) {
                displayFlashMessage(false, 'Error. Friend request already sent')
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
            <div className="pushLeft" >
                <img src={Vector} onClick={() => {navigate(`../home`,{state:{userId,username}})}} alt={"Home"} align="right" style={{cursor:'pointer'}}/>
                <img src={Vector1} alt={"Settings"} align="right" />
            </div>
        </div>
    </div>
    <div id="mainbox5">
        <h1>Friend list</h1>
        <input type="text" className="UserSearch" placeholder="Search by username" id="user_search" onChange={(e) => {registerKeyPress(e)}}></input><br></br>
        <div id="friend-row" class="row">
            <div id="friendbox1">
                {friendsColumn1.map((username,i) => {
                    return (
                    <Fragment>
                    <div id="friendcard">
                        <div id="friendcardinfo">
                        <img src={Avatar} align="left" className="friendAvatar"></img>
                    </div>
                    <div id="friendcardinfo2">
                        <h1>{username}</h1>
                    </div>
                    <div id="friendcardwrapper">
                        <div id={isMyFriend(username) ? "pushfriend": "leavefriend"}>
                            {isMyFriend(username) ? <h3>[Status: Friend]</h3> : <h3>[Status: Not friend]</h3>}
                        </div>
                        <div id="friendcardside2">
                            {!isMyFriend(username) ? <img src={Friend} onClick={() => {makeFriendRequest(username)}} style={{cursor:'pointer'}}></img>: null}
                        </div>
                    </div>
                </div>
                <div className="divider4" />
                </Fragment>);
                })}
            </div>
            <div id="friendbox2">
            {friendsColumn2.map((username,i) => {
                    return (
                    <Fragment>
                    <div id="friendcard">
                        <div id="friendcardinfo">
                        <img src={Avatar} align="left" className="friendAvatar"></img>
                    </div>
                    <div id="friendcardinfo2">
                        <h1>{username}</h1>
                    </div>
                    <div id="friendcardwrapper">
                        <div id={isMyFriend(username) ? "pushfriend": "leavefriend"}>
                            {isMyFriend(username) ? <h3>[Status: Friend]</h3> : <h3>[Status: Not friend]</h3>}
                        </div>
                        <div id="friendcardside2">
                        {!isMyFriend(username) ? <img src={Friend} onClick={() => {makeFriendRequest(username)}} style={{cursor:'pointer'}}></img>: null}
                        </div>
                    </div>
                </div>
                <div className="divider4" />
                </Fragment>);
                })}
            </div>
        </div>
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

export default AddFriends