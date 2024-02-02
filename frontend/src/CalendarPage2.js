import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import { CardActionArea } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Vector from './logos/Vector.png';
import Back from './logos/back-arrow.png';
import Vector1 from './logos/Vector (1).png';
import Right from './logos/chevron-right.png';
import Left from './logos/Left.png';
import Avatar from './logos/avatar.png';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import PopUp from './PopUp'
import FlashMessage from './FlashMessage'

const useStyles = makeStyles((theme) => ({
    pos: {
        margin: theme.spacing(1),
        borderRadius: 10,
        backgroundColor: 'gray',
    },
    texttitle: {
        margin: theme.spacing(1),
        marginTop: 10,
        color: 'white',
        paddingLeft: 25,
    },
    textinbox: {
        color: "white",
        margin: theme.spacing(1),
    },
    textindate: {
        color: '#76A9FF',
        margin: theme.spacing(1),
    },
    textintime: {
        color: '#7A7585',
        margin: theme.spacing(1),
    },
    filterbox: {
        margin: theme.spacing(1),
        borderRadius: 20,
        backgroundColor: 'rgba(200, 192, 192, 1.0)',
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
        paddingLeft: 25,
    },
}));

export default function CalendarPage2() {
    const classes = useStyles();
    const [expandedID, setExpandedID] = React.useState(-1);
    const [popUp, setPopUp] = React.useState(false)
    const [timeSelected, setTimeSelected] = React.useState('')
    const [similarFilterNames, setSimilarFilterNames] = React.useState([])
    const [postMemberNames, setPostMemberNames] = React.useState([])
    const [storeData, setStoreData] = React.useState([])
    const [showFlashMessage, setShowFlashMessage] = React.useState(false)
    const [flashMessageSuccess, setFlashMessageSuccess] = React.useState(false)
    const [flashMessageText, setFlashMessageText] = React.useState('')
    const location = useLocation();
    let userId = location.state.sendData[0]
    let username = location.state.sendData[1]
    let strDate = location.state.sendData[2]
    let gameName = location.state.sendData[3]
    let selectedFilters = location.state.sendData[4]
    let allPosts = location.state.posts
    let postFilters = location.state.postFilters
    let postMembers = location.state.postMembers
    let items = []
    let navigate = useNavigate()

    const handleExpandClick = (idNum) => {
        if (expandedID === idNum) {
            setExpandedID(-1)
        }
        else {
            setExpandedID(idNum)
        }
    }

    const padDateWithZeroes = (sDate) => {
        let part1 = ''
        let ind = 0
        for (var i=0;i<sDate.length;++i) {
            if (sDate.charAt(i) == '/') {
                ind = i + 1
                break
            }
            part1 += sDate.charAt(i)
        }
        if (part1.length == 1) part1 = '0' + part1
        let part2 = ''
        for (var i=ind;i<sDate.length;++i) {
            if (sDate.charAt(i) == '/') {
                ind = i + 1
                break
            }
            part2 += sDate.charAt(i)
        }
        if (part2.length == 1) part2 = '0' + part2
        return (part1 + '/' + part2 + '/' + sDate.substring(ind,sDate.length))

        
    }

    const isMatchingFilter = (postId) => {
        let postFilterNames = []
        let oneMatch = false
        if (selectedFilters.length == 0) {
            return true;
        }
        for (var i=0;i<postFilters.length;i++) {
            if (postFilters[i][0] == postId) {
                postFilterNames.push(postFilters[i][1])
            }
        }
        if (postFilterNames.length == 0) {
            return true;
        }
        for (var i=0;i<selectedFilters.length;i++) {
            if (postFilterNames.includes(selectedFilters[i])) {
                oneMatch = true
                break
            }
        }
        return oneMatch
    }

    const getRelvPosts = () => {
        let temp = []
        for (var i=0;i<allPosts.length;++i) {
            let post = allPosts[i]
            if(post[3] === padDateWithZeroes(strDate) && gameName === post[4]) {
                temp.push(post)
            }
        }
        return temp
    }

    const onTimeSelected = (postId, time) => {
        setPopUp(true)
        setTimeSelected(time)
        setStoreData([postId, userId, username])
        let postFilterNames = []
        let similarFilters = []
        let postMemberNames = []
        for (var i=0;i<postFilters.length;i++) {
            if (postFilters[i][0] == postId) {
                postFilterNames.push(postFilters[i][1])
            }
        }
        for (var i=0;i<selectedFilters.length;i++) {
            if (postFilterNames.includes(selectedFilters[i])) {
                similarFilters.push(selectedFilters[i])
            }
        }
        for (var i=0;i<postMembers.length;i++) {
            if (postMembers[i][0] == postId) {
                postMemberNames.push(postMembers[i][1])
            }
        }
        setSimilarFilterNames(similarFilters)
        setPostMemberNames(postMemberNames)
    }

    const placePosts = (aTime,id) => {
        let tmp = []
        let relPosts = getRelvPosts()
        let show = false
        for (var i=0;i<relPosts.length;++i) {
            let post = relPosts[i]
            let postId = post[0]
            let name = post[1]
            let time = post[2]
            show = isMatchingFilter(postId) ? true: false
            if ((time == aTime) && show) items.push([aTime, <CardActionArea onClick={() => {onTimeSelected(postId, time)}}><Collapse in={expandedID === id} timeout="auto" unmountOnExit><Typography className={classes.textinbox}><img src={Avatar} alt={"Avatar"} align="left" />{name} has a session</Typography></Collapse></CardActionArea>])
        }
        
        for (var i=0;i<items.length;++i) {
            if (items[i][0] === aTime) {
                tmp.push(items[i][1])
            }
        }
        return tmp
    }

    const changeShow = (result) => {
        setPopUp(result)
    }

    const displayFlash = (success, messageText) => {
        setFlashMessageSuccess(success)
        setFlashMessageText(messageText)
        setShowFlashMessage(true)
        window.scrollTo({top: 0, behavior: 'smooth'})
        setTimeout(() => {setShowFlashMessage(false)}, 2000)
    }

    const displayPopUp = () => {
        return [<PopUp func={changeShow} func2={displayFlash} displayData={[gameName, strDate, timeSelected,'['.concat(similarFilterNames.toString()).concat(']'),'['.concat(postMemberNames.toString()).concat(']')]} storeData = {storeData}/>]
    }
      
    return (
        <div id="content">
            {showFlashMessage ? <FlashMessage sendData={[showFlashMessage, flashMessageSuccess, flashMessageText]}/>:<FlashMessage sendData={[showFlashMessage, flashMessageSuccess, flashMessageText]}/> }
            {popUp ? displayPopUp(): null}
            <div id={popUp? "popup-shade":"none"}>
                <div className='topline'>
                    <div className='fl logo'>
                        <img src={require('./assets/images/logo.png')}></img>
                        gameschedule
                    </div>
                    <div className='fr'>
                        <div className="pushLeft" >
                            <img src={Back} onClick={() => {navigate(`../look-by-date`,{state:{userId,username}})}} alt={"Home"} align="right" style={{cursor:'pointer'}} />
                            <img src={Vector1} alt={"Settings"} align="right" />
                        </div>
                    </div>
                </div>
            <div className = "divider" />
            <div className = "divider" />
            <Grid container >
                <Grid container direction="row" xs={12} spacing={1}>
                    <Typography className={classes.texttitle} variant="h4">
                        <b>Your Calendar</b>
                    </Typography>
                  
                </Grid>

                <Grid container direction="column" alignItems="flex-start">
                    <Grid item xs>
                        <Typography className={classes.texttitle}>
                            <b>Time Selector</b>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography className={classes.lightentext}>
                            Choose a time to schedule your game session.
                        </Typography>
                    </Grid>
                    <div className = "divider" />
                </Grid>

                <Grid item xs={12}>
                    <Card className={classes.pos}>
                        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
                            <Grid item xs={4}>
                                <Typography className={classes.textinbox} align="left" >
                                    <b>Select A Time Interval</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.textinbox} align="centre">
                                   
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.textindate} align="right"  >
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
                            <Grid item xs>
                                <Typography className={classes.textinbox} >
                                    <b>MORNING</b>
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography className={classes.textinbox} >
                                    <b>AFTERNOON</b>
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography className={classes.textinbox}   >
                                    <b> EVENING </b>
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography className={classes.textinbox} >
                                    <b> NIGHT </b>
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start"><Grid item xs>
                            <Card className={classes.filterbox}>
                                <CardActionArea expand={expandedID === 1} onClick={() => {handleExpandClick(1)}} aria-expanded={expandedID === 1} aria-label="show more">
                                    <Box className={classes.textintime} align="centre">
                                        7:00 AM
                                    </Box>
                                </CardActionArea>
                                {placePosts("7am", 1)}
                            </Card>
                        </Grid>
                            <Grid item xs>
                                <Card className={classes.filterbox}>
                                    <CardActionArea expand={expandedID === 2} onClick={() => {handleExpandClick(2)}} aria-expanded={expandedID === 2} aria-label="show more">
                                        <Box className={classes.textintime} align="centre">
                                            12:00 PM
                                        </Box>
                                    </CardActionArea>
                                    {placePosts("12pm", 2)}
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <Card className={classes.filterbox}>
                                    <CardActionArea expand={expandedID === 3} onClick={() => {handleExpandClick(3)}} aria-expanded={expandedID === 3} aria-label="show more">
                                        <Box className={classes.textintime} align="centre">
                                            5:00 PM
                                        </Box>
                                    </CardActionArea>
                                    {placePosts("5pm", 3)}
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <Card className={classes.filterbox}>
                                    <CardActionArea expand={expandedID === 4} onClick={() => {handleExpandClick(4)}} aria-expanded={expandedID === 4} aria-label="show more">
                                        <Box className={classes.textintime} align="centre">
                                            10:00 PM
                                        </Box>
                                    </CardActionArea>
                                    {placePosts("10pm", 4)}
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">                        <Grid item xs>
                            <Card className={classes.filterbox}>
                                <CardActionArea expand={expandedID === 5} onClick={() => {handleExpandClick(5)}} aria-expanded={expandedID === 5} aria-label="show more">
                                    <Box className={classes.textintime} align="centre">
                                        8:00 AM
                                    </Box>
                                </CardActionArea>
                                {placePosts("8am", 5)}
                            </Card>
                        </Grid>

                            <Grid item xs>
                                <Card className={classes.filterbox}>
                                    <CardActionArea expand={expandedID === 6} onClick={() => {handleExpandClick(6)}} aria-expanded={expandedID === 6} aria-label="show more">
                                        <Box className={classes.textintime} align="centre">
                                            1:00 PM
                                        </Box>
                                    </CardActionArea>
                                    {placePosts("1pm", 6)}
                                </Card>
                            </Grid>

                            <Grid item xs>
                                <Card className={classes.filterbox}>
                                    <CardActionArea expand={expandedID === 7} onClick={() => {handleExpandClick(7)}} aria-expanded={expandedID === 7} aria-label="show more">
                                        <Box className={classes.textintime} align="centre">
                                            6:00 PM
                                        </Box>
                                    </CardActionArea>
                                    {placePosts("6pm", 7)}
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <Card className={classes.filterbox}>
                                    <CardActionArea expand={expandedID === 8} onClick={() => {handleExpandClick(8)}} aria-expanded={expandedID === 8} aria-label="show more">
                                        <Box className={classes.textintime} align="centre">
                                            11:00 PM
                                        </Box>
                                    </CardActionArea>
                                    {placePosts("11pm", 8)}
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">                        <Grid item xs>
                            <Card className={classes.filterbox}>
                                <CardActionArea expand={expandedID === 9} onClick={() => {handleExpandClick(9)}} aria-expanded={expandedID === 9} aria-label="show more">
                                    <Box className={classes.textintime} align="centre">
                                        9:00 AM
                                    </Box>
                                </CardActionArea>
                                {placePosts("9am", 9)}
                            </Card>
                        </Grid>
                            <Grid item xs>
                                <Card className={classes.filterbox}>
                                    <CardActionArea expand={expandedID === 10} onClick={() => {handleExpandClick(10)}} aria-expanded={expandedID === 10} aria-label="show more">
                                        <Box className={classes.textintime} align="centre">
                                            2:00 PM
                                        </Box>
                                    </CardActionArea>
                                    {placePosts("2pm", 10)}
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <Card className={classes.filterbox}>
                                    <CardActionArea expand={expandedID === 11} onClick={() => {handleExpandClick(11)}} aria-expanded={expandedID === 11} aria-label="show more">
                                        <Box className={classes.textintime} align="centre">
                                            7:00 PM
                                        </Box>
                                    </CardActionArea>
                                    {placePosts("7pm", 11)}
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <Card className={classes.filterbox}>
                                    <CardActionArea expand={expandedID === 12} onClick={() => {handleExpandClick(12)}} aria-expanded={expandedID === 12} aria-label="show more">
                                        <Box className={classes.textintime} align="centre">
                                            12:00 AM
                                        </Box>
                                    </CardActionArea>
                                    {placePosts("12am", 12)}
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">                        <Grid item xs>
                            <Card className={classes.filterbox}>
                                <CardActionArea expand={expandedID === 13} onClick={() => {handleExpandClick(13)}} aria-expanded={expandedID === 13} aria-label="show more">
                                    <Box className={classes.textintime} align="centre">
                                        10:00 AM
                                    </Box>
                                </CardActionArea>
                                {placePosts("10am", 13)}
                            </Card>
                        </Grid>
                            <Grid item xs>
                                <Card className={classes.filterbox}>
                                    <CardActionArea expand={expandedID === 14} onClick={() => {handleExpandClick(14)}} aria-expanded={expandedID === 14} aria-label="show more">
                                        <Box className={classes.textintime} align="centre">
                                            3:00 PM
                                        </Box>
                                    </CardActionArea>
                                    {placePosts("3pm", 14)}
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <Card className={classes.filterbox}>
                                    <CardActionArea expand={expandedID === 15} onClick={() => {handleExpandClick(15)}} aria-expanded={expandedID === 15} aria-label="show more">
                                        <Box className={classes.textintime} align="centre">
                                            8:00 PM
                                        </Box>
                                    </CardActionArea>
                                    {placePosts("8pm", 15)}
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <Card className={classes.filterbox}>
                                    <CardActionArea expand={expandedID === 16} onClick={() => {handleExpandClick(16)}} aria-expanded={expandedID === 16} aria-label="show more">
                                        <Box className={classes.textintime} align="centre">
                                            1:00 AM
                                        </Box>
                                    </CardActionArea>
                                    {placePosts("1am", 16)}
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">                        <Grid item xs>
                            <Card className={classes.filterbox}>
                                <CardActionArea expand={expandedID === 17} onClick={() => {handleExpandClick(17)}} aria-expanded={expandedID === 17} aria-label="show more">
                                    <Box className={classes.textintime} align="centre">
                                        11:00 AM
                                    </Box>
                                </CardActionArea>
                                {placePosts("11am", 17)}
                            </Card>
                        </Grid>
                            <Grid item xs>
                                <Card className={classes.filterbox}>
                                    <CardActionArea expand={expandedID === 18} onClick={() => {handleExpandClick(18)}} aria-expanded={expandedID === 18} aria-label="show more">
                                        <Box className={classes.textintime} align="centre">
                                            4:00 PM
                                        </Box>
                                    </CardActionArea>
                                    {placePosts("4pm", 18)}
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <Card className={classes.filterbox}>
                                    <CardActionArea expand={expandedID === 19} onClick={() => {handleExpandClick(19)}} aria-expanded={expandedID === 19} aria-label="show more">
                                        <Box className={classes.textintime} align="centre">
                                            9:00 PM
                                        </Box>
                                    </CardActionArea>
                                    {placePosts("9pm", 19)}
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <Card className={classes.filterbox}>
                                    <CardActionArea expand={expandedID === 20} onClick={() => {handleExpandClick(20)}} aria-expanded={expandedID === 20} aria-label="show more">
                                        <Box className={classes.textintime} align="centre">
                                            2:00 AM
                                        </Box>
                                    </CardActionArea>
                                    {placePosts("2am", 20)}
                                </Card>
                            </Grid>
                        </Grid>
                        <div className = "divider" />
                    </Card>
                    <div className = "divider" />
                    <div className = "divider" />
                </Grid>
            </Grid>
            <div className = "divider" />
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
        </div >
        </div>

    );
}