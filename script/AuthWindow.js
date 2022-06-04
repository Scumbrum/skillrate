import { connect } from "react-redux"
import React from "react"
import { toAuth, toReg, inputClientName, inputPassword, sendLoginRequest, sendRegistrateRequest} from "../redux/actions"
import { useKey } from "./hooks/useKey"

const AuthWindow = (props) => {
    
    const register = (e) => {
        props.sendRegistrateRequest(props.name, props.password)
    }
    const login = (e) => {
        props.sendLoginRequest(props.name, props.password)
    }

    let handle = props.status == "login" ? login : register
    
    useKey("Enter", handle)
   
    return (
        <div className = "input_window down">
            <div className = "frame no-scroll">
                { !props.loading ? 
                <>
                    <section className="frame_name zero">
                        <span 
                            className= {props.status == "login" ? "auth active" : "auth"}
                            onClick = {props.toAuth}>
                            Authorisation
                        </span>
                        <span 
                            className={props.status == "login" ? "auth" : "auth active"}
                            onClick = {props.toReg}>
                            Registration
                        </span>
                    </section>
                    <section className = "frame_body">
                        <span className="client_data">
                            Name: 
                            <input
                                className="frame_input-name"
                                value={props.name}
                                onChange = {(e) => props.inputClientName(e.target.value)}/>
                        </span>
                        <span className="client_data">
                            Password: 
                            <input
                                className="frame_input-name"
                                type= "password"
                                onChange={(e) => props.inputPassword(e.target.value)}
                                value = {props.password}
                            />
                        </span>
                        {props.status == "login" ? 
                        <button 
                            className = "requirement_button"
                            onClick={()=>props.sendLoginRequest(props.name, props.password)}>
                            Login
                        </button>:
                        <button
                            className = "requirement_button"
                            onClick={()=>props.sendRegistrateRequest(props.name, props.password)}>
                            Registrate
                        </button>}
                    </section>
                </> : 
                <div className = "loader"></div>
                }
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        status: state.achievements.status,
        name: state.achievements.name,
        password: state.achievements.password,
        loading: state.window.loading
    }
}

const mapDispatchToProps = {
    toAuth,
    toReg,
    inputClientName,
    inputPassword,
    sendLoginRequest,
    sendRegistrateRequest
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthWindow)