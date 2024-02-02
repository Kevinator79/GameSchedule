import React, {useEffect,useRef} from 'react'
import { useNavigate } from 'react-router-dom';

const PopUp = (props) => {
    const [userId, setUserId] = React.useState(-1)
    const [username, setUsername] = React.useState('')

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

    const storeSessionRequest = (postId, userId) => {
        var url = 'http://127.0.0.1:8000/api/create-session-request/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'postId': postId, 'senderId': userId})
        }).then((res) => {
            if (res.ok) {
                props.func(false)
                props.func2(true, 'Success. Request to join has been sent')
            }
            else {
                return res.json()
            }
        }).then((data) => {
            if (data == 'duplicate') {
                props.func(false)
                props.func2(false, 'Error. Request has already been sent')
            }
            else if (data == 'time-issue'){
                props.func(false)
                props.func2(false, 'Error. You are potentially booked at this time')
            }
        })
    }

    const handleRequestSubmit = () => {
        let postId = props.storeData[0]
        let userId = props.storeData[1]
        let username = props.storeData[2]
        storeSessionRequest(postId, userId)
    }

    return (
    <div className="PopUp">
        <div id="pu-content-container">
            {/*<img className="pu-img" src={bone} alt="bone" />*/}
            <h1><u>Make a request</u></h1>
        </div>
        <br></br>
        <div id="pu-content-container">
            <h2>The details for this session can be found below</h2>
        </div>
        <br></br>
        <div id="pu-content-container">
            <h3>Game</h3>
        </div>
        <div id="pu-content-container">
            <p>{props.displayData[0]}</p>
        </div>
        <br></br>
        <div id="pu-content-container">
            <h3>Date of session</h3>
        </div>
        <div id="pu-content-container">
            <p>{props.displayData[1]}</p>
        </div>
        <br></br>
        <div id="pu-content-container">
            <h3>Starting time</h3>
        </div>
        <div id="pu-content-container">
            <p>{props.displayData[2]}</p>
        </div>
        <br></br>
        <div id="pu-content-container">
            <h3>Relevant tags</h3>
        </div>
        <div id="pu-content-container">
            <p>{props.displayData[3]}</p>
        </div>
        <br></br>
        <div id="pu-content-container">
            <h3>Gamers</h3>
        </div>
        <div id="pu-content-container">
            <p>{props.displayData[4]}</p>
        </div>
        <br></br>
        <div id="pu-button-container">
            <button onClick={()=> handleRequestSubmit()}>Request</button>
            <button onClick={()=> props.func(false)}>Cancel </button>
        </div>
        <br></br>
    </div>
  )}

export default PopUp