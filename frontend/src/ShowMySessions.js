import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

function ShowMySessions(props) {

    const useStyles = makeStyles((theme) => ({
        entire: {
            backgroundColor: 'black',
        },
        pos: {
            margin: theme.spacing(1),
            borderRadius: 10,
            backgroundColor: 'gray',
        },
        texttitle: {
            margin: theme.spacing(1),
            marginTop: 10,
            color:'white',
        },
        textinbox: {
            color: "white",
            margin: theme.spacing(1),
        },
        filterbox: {
            margin: theme.spacing(1),
            borderRadius: 20,
            backgroundColor: 'rgba(200, 192, 192, 1.0)',
            variant: "outlined",
            borderColor: "black",
        },
        textinfilter: {
            color: "black",
            margin: theme.spacing(1),
        },
        selectbuttontext: {
            color: "white",
            marginRight: 50,
            marginLeft: 50,
            marginTop: 10,
            marginBottom: 10,
        },
        button: {
            margin: theme.spacing(3),
            backgroundColor: "#20df7f",
            borderRadius: 10,
        },
        lightentext: {
            margin: theme.spacing(1),
            marginTop: 10,
            color: '#706d6d',
        },
    }));

    const classes = useStyles();
    let navigate = useNavigate()
    const location = useLocation();
    const [postList, setPostList] = useState(['You have no posts.'])
    let username = location.state.username

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

    fetch('http://127.0.0.1:8000/api/show-my-posts/', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({'username':username})
    }).then((res) => {
        if (res.ok) {
            //return res.json()
        }
        else {
            console.log('Could not retrieve data')
        }
    }).then((data) => {
        setPostList(data.posts)
        console.log('Data set')
    })


    return (
        <div id="content">
            <div className='topline'>
                <div className='fl logo'>
                    <img src={require('./assets/images/logo.png')}></img>
                    gameschedule
                </div>
            </div>
            <div id="mainbox3">
                <h1>Available Sessions</h1>
                <div id="post-wrapper"> 
                    {postList.map(function(post, index){
                        return(
                            <div key={index} className="post-wrapper flex-wrapper">
                                <span>
                                    <Card className={classes.pos}>
                                        <Typography className={classes.textinbox} align="left">
                                            {post}
                                        </Typography>
                                    </Card>
                                    <div className = "divider" />
                                </span>
                            </div>
                        )
                    })}

                </div>
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

export default ShowMySessions