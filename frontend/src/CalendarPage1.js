import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { CardActionArea } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Vector from './logos/Vector.png';
import Vector1 from './logos/Vector (1).png';
import VectorCopy from './logos/Vector copy.png';
import Navigation from './logos/navigation.png';
import CalendarIcon from './logos/calendar.png';
import PlusIcon from './logos/plusicon.png';
import Correct from './logos/Correct.png';
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import FlashMessage from './FlashMessage'
//import MonthPicker from '@mui/lab/MonthPicker';
//import YearPicker from '@mui/lab/YearPicker';

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
        paddingLeft: 25,
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
        paddingLeft: 25,
    },
}));

export default function CalendarPage1() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [ticks, setTicks] = React.useState(Array(18).fill(false))
    const [filters, setFilters] = React.useState([])
    const [sendData, setSendData] = React.useState([])
    const [showFlashMessage, setShowFlashMessage] = React.useState(false)
    const [flashMessageSuccess, setFlashMessageSuccess] = React.useState(false)
    const [flashMessageText, setFlashMessageText] = React.useState('')
    const isFirstRender = React.useRef(true)

    let navigate = useNavigate()
    const location = useLocation();
    let userId = location.state.userId
    let username = location.state.username

    React.useEffect(() => {
        if (isFirstRender.current) {
          isFirstRender.current = false // toggle flag after first render/mounting
          return;
        }
        let posts = []
        let postFilters = []
        getThePosts().then(data => {
            for (var i=0;i<data.length;i++) {
                posts.push(data[i])
            }
            getPostsFilters().then(data => {
                for (var i=0;i<data.length;i++) {
                    postFilters.push(data[i])
                }
                getPostsMembers().then(data => {
                    let postMembers = data
                    navigate(`../look-by-time`,{state:{sendData, posts, postFilters, postMembers}})
                })
            })
        })
      }, [sendData])

    const getDateAsString = () => {
        return date.getDate() + '/' + (parseInt(date.getMonth())+1).toString() + '/' + date.getFullYear()
    }

    const getThePosts = () => {
        var url = 'http://127.0.0.1:8000/api/session-list/'
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
    
    const getPostsFilters = () => {
        var url = 'http://127.0.0.1:8000/api/post-filters/'
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

    const getPostsMembers = () => {
        var url = 'http://127.0.0.1:8000/api/post-members-list/'
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

    const prepareNext = () => {
        let temp = []
        let strDate = getDateAsString(date)
        let game = document.getElementById('Game').value
        if (game.length == 0) {
            setFlashMessageSuccess(false)
            setFlashMessageText('Error. Game field is empty')
            setShowFlashMessage(true)
            window.scrollTo({top: 0, behavior: 'smooth'})
            setTimeout(() => {setShowFlashMessage(false)}, 2000)
            return;
        }
        let myFilters = []
        temp.push(userId)
        temp.push(username)
        temp.push(strDate)
        temp.push(game)
        for (var i=0;i<filters.length;i++) {
            myFilters[i] = filters[i]
        }
        temp.push(myFilters)
        setSendData(temp)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const getNewTicks = (id) => {
        var newTicks = ticks.slice()
        newTicks[id-1] = !newTicks[id-1]
        return newTicks 
    }

    const registerClick = (id, filterName) => {
        var newTicks = getNewTicks(id)
        var currentFilters = filters.slice()
        setTicks(newTicks)
        if (newTicks[id-1]) {
            currentFilters.push(filterName)
        }
        else {
            var removeIndex = currentFilters.indexOf(filterName)
            currentFilters.splice(removeIndex, 1)
        }
        setFilters(currentFilters)
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
            <div className = "divider" />
            <div className = "divider" />
            <Grid container>
                <Grid container direction="row" xs={12} spacing={1}>
                    <Typography className={classes.texttitle} variant="h4">
                        <b>Your Calendar</b>
                    </Typography>
                </Grid>
                <Grid container direction="column" alignItems="flex-start" spacing={1}>
                    <Grid item xs>
                        <Typography className={classes.texttitle}>
                            <b>Day Selector</b>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography className={classes.lightentext}>
                            Choose a day to schedule your game session
                        </Typography>
                    </Grid>
                    <div className = "divider" />
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.pos}>
                        <CardActionArea expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                            <Grid direction="row">
                                <Typography className={classes.textinbox} align="left">
                                    <b>Filters</b>
                                    <img src={VectorCopy} alt={"Filter"} align="right" />
                                </Typography>
                            </Grid>
                            <Grid>
                            </Grid>
                        </CardActionArea>

                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Typography className={classes.textinbox} align="left">
                                Select Preferences
                            </Typography>
                            <Grid container direction="row" alignItems="flex-start">
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(1, 'Casual')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[0] ? <img src={Correct} alt={"Correct"} align="right" />: null}
                                                Casual
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(2, 'Competitive')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[1] ? <img src={Correct} alt={"Correct"} align="right" />: null}
                                                Competitive
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(3, 'Newbie')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[2] ? <img src={Correct} alt={"Correct"} align="right" />: null}
                                                Newbie
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(4, 'Professional')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[3] ? <img src={Correct} alt={"Correct"} align="right" />: null}  
                                                Professional
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(5, 'Intermediate')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[4] ? <img src={Correct} alt={"Correct"} align="right" />: null}
                                                Intermediate
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(6, 'Streaming')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[5] ? <img src={Correct} alt={"Correct"} align="right" />: null}
                                                Streaming
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container direction="row" alignItems="flex-start">
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(7, 'PC')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[6] ? <img src={Correct} alt={"Correct"} align="right" />: null}
                                                PC
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(8, 'PS5')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[7] ? <img src={Correct} alt={"Correct"} align="right" />: null}
                                                PS5
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(9, 'PS4')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[8] ? <img src={Correct} alt={"Correct"} align="right" />: null}
                                                PS4
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(10, 'PS3')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[9] ? <img src={Correct} alt={"Correct"} align="right" />: null}
                                                PS3
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(11, 'Xbox 360')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[10] ? <img src={Correct} alt={"Correct"} align="right" />: null}
                                                Xbox 360
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(12, 'Xbox One')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[11] ? <img src={Correct} alt={"Correct"} align="right" />: null}
                                                Xbox One
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            </Grid>

                            <Grid container direction="row" alignItems="flex-start">
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(13, 'Xbox Series X')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[12] ? <img src={Correct} alt={"Correct"} align="right" />: null}
                                                Xbox Series X
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(14, 'Xbox Series S')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[13] ? <img src={Correct} alt={"Correct"} align="right" />: null}
                                                Xbox Series S
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(15, 'Switch')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[14] ? <img src={Correct} alt={"Correct"} align="right" />: null}
                                                Switch
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(16, 'Mobile')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[15] ? <img src={Correct} alt={"Correct"} align="right" />: null}
                                                Mobile
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(17, 'Social')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[16] ? <img src={Correct} alt={"Correct"} align="right" />: null}
                                                Social
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card className={classes.filterbox}>
                                        <CardActionArea onClick = {() => {registerClick(18, 'Practice')}}>
                                            <Typography className={classes.textinfilter} align="centre">
                                                {ticks[17] ? <img src={Correct} alt={"Correct"} align="right" />: null}
                                                Practice
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Collapse>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card className={classes.pos}>
                        <Typography className={classes.textinbox}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
                                    </Grid>
                                </Grid>
                            </LocalizationProvider>
                        </Typography>
                    </Card>
                </Grid>

                <Grid container>
                    <Grid item xs={8}>
                        <div id="littlebox">
                            <input type="text" className="Game" placeholder="Enter game name" id="Game"></input>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <Card className={classes.pos}>
                            <Typography className={classes.textinbox} align="left">
                                {getDateAsString()}
                                <img src={CalendarIcon} alt={"CalendarIcon"} align="right" />
                            </Typography>
                        </Card>
                    </Grid>

                </Grid>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Button className={classes.button} onClick = {() => {prepareNext()}} variant="contained">
                        <Typography className={classes.selectbuttontext}>
                            SELECT
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
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
    );
}