import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import AchieveBody from "./AchieveBody";
import AchieveList from "./AchieveList";
import LevelList from "./LevelList";
import Footer from "./Footer";
import InputWindow from "./InputWindow";
import Message from "./Message";
import AuthWindow from "./AuthWindow";

function App(props) {
    return (
        <>  
            {props.message ? <Message/> : null}
            {props.authorisate ? 
            <>
            <Header/>
            {props.open ? <InputWindow/> : null}
            <section className = "main_content">
                {
                    props.page === 1 ? <AchieveList/> :
                    props.page === 2 ? <AchieveBody/> :
                    <LevelList/>
                }
            </section>
            <Footer/>
            
            </>
            :<AuthWindow/>}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        page: state.page.page,
        open: state.window.open,
        message: state.message.open,
        authorisate: state.achievements.authorisate
    }
}

export default connect(mapStateToProps, null)(App)