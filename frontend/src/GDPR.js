import React from 'react'

function GDPR() {
    return (
        <div id="content">
            <div className='topline'>
                <div className='fl logo'>
                    <img src={require('./assets/images/logo.png')}></img>
                    gameschedule
                </div>
                <div className='fr'>
                </div>
            </div>
            <div className='conlogo fn-clear'>
               
            </div>
            <div id = "policy">
                <h1>GDPR Privacy Policy</h1><br></br><br></br>
                <p>This privacy policy aims to concisely show that we are adhering to the 7 GDPR principles as set out in the data protection and privacy laws. Through answering a series of relevant questions, it should become clear that we are processing data in a fair and transparent manner:<br></br><br></br>
                <u>What data do you collect?</u><br></br><br></br>
                We store data of your username, email and password.<br></br>
                We also keep data on who you are friends with and have access to their user details as well.<br></br>
                Data related to the posts you make are stored, including: how many people you are looking to play with, who you are looking to play with (public or friends only), the game you want to play and when you want to play.<br></br>
                We collect the user details of each person that joins your group.<br></br>
                Collect data on who wants to be your friend.<br></br><br></br>
                <u>How do you collect our data?</u><br></br><br></br>
                All of the data we collect on you is based on the forms you interact with on the website. This, for example, includes the instances of when you click on buttons named in ways such as ‘Register’, ‘Login’, ‘Submit’, ‘Post’, etc...<br></br> 
                In no way do we track your use of the website and behaviour; the only time we collect your data is when you know you are providing it .<br></br><br></br>
                <u>How will you use our data?</u><br></br><br></br>
                The data that you provide us will be interpreted as a request that you want a particular service. We will then process this data in a way that is specific to the service. For instance, if you wanted to join someone else’s group, we will process your data and the data on the user who made the post to make this happen.<br></br>
                To be clear, your data is only used to respond to the services that you want.<br></br><br></br>
                <u>How do you store our data?</u><br></br><br></br>
                The way in which we store your data depends on the subject of the data. For confidential information such as passwords, we will ensure that a hashing procedure is carried out on this data for your security.<br></br>
                The way we store all the other data is specific to its contents, and it is not hashed because there is no need to do that.<br></br>
                We will keep your data for 2 years and then remove it from our databases, since we want you to be access services as fast as possible in that time period.<br></br>
                If your data has been removed, we will never add it back unless you login and start using the website again.<br></br>
                <u>Marketing?</u><br></br><br></br>
                You will receive no marketing information from us<br></br>
                The only time we will ever contact you, is via email when you want to change password, confirm account creation or about changes to the privacy policy.<br></br><br></br>
                <u>What are your data protection rights?</u><br></br><br></br>
                The right to access – you can request your personal data, under certain conditions.<br></br>
                The right to rectification – you can request us to correct information that you believe is inaccurate, under certain conditions.<br></br>
                The right to erasure – you can request us to erase your personal data, under certain conditions.<br></br>
                The right to restrict processing – you can request us to restrict processing on your data, under certain conditions.<br></br>
                The right to object to processing – you can request us to stop processing your personal data, under certain conditions.<br></br>
                The right to data portability – you can request us to send your data to another organisation, under certain conditions.<br></br><br></br>
                <u>Cookies?</u><br></br><br></br>
                We do not store cookies, as we do not track how you use our website and keep you signed in with a token-based approach instead.<br></br><br></br>
                <u>How do you use cookies?</u><br></br><br></br>
                NA<br></br><br></br>
                <u>What types of cookies do you use?</u> <br></br><br></br>
                N/A<br></br><br></br>
                <u>How to manage cookies?</u><br></br><br></br>
                N/A<br></br><br></br>
                <u>Privacy policies of other websites?</u><br></br><br></br>
                Our website does not link to any other websites.<br></br><br></br>
                <u>Changes to your privacy policy?</u><br></br><br></br>
                We will inform you via email, when we make changes to the privacy policy.<br></br><br></br>
                <u>Changes to your privacy policy?</u><br></br><br></br>
                Through the Contact Us page on our website.<br></br><br></br><br></br><br></br>
                </p>
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
                        <p className='desc'><a href='/#'>GDPR</a></p>
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

export default GDPR