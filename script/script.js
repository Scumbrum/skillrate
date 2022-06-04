import React from "react";
import  ReactDOM  from "react-dom";
import {applyMiddleware, compose} from "redux"
import { Provider} from "react-redux";
import "../Styles/site.less"
import appReducer from "../redux/AppReducer";
import SkillApp from "./SkillApp";
import {saveRequest, sendDataRequest, sendReafreshRequest} from "../redux/actions.js"
import thunk from "redux-thunk"
import { parseCookie } from "../redux/additionals";

const store = createStore(appReducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
const {refreshToken} = parseCookie(document.cookie)
const accessToken = localStorage.getItem("accessToken")

sendDataRequest(accessToken,refreshToken)(store.dispatch)
.catch(() => {

    if(!store.getState().achievements.authorisate) {
        sendReafreshRequest(refreshToken)(store.dispatch)
    }
})
setInterval(()=> {
    const accessToken = localStorage.getItem("accessToken")
    const state = store.getState()

    if(!state.achievements.authorisate) {
        return
    }

    const rate = {achievements:state.achievements.achievements,
    requirements: state.achievements.requirements,
    progress: state.achievements.progress}

    const id = state.achievements.id

    saveRequest(accessToken, rate, id)
    .then((status) => {
        if(status!=200) {
            const {refreshToken} = parseCookie(document.cookie)
            sendReafreshRequest(refreshToken)(store.dispatch)
        } else {
            console.log("Saved")
        }
    })
}, 30000)

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <SkillApp/>
        </Provider>
    </React.StrictMode>,
    document.querySelector(".skillApp")
)
 
    