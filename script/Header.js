import { connect } from "react-redux"
import NavLink from "./NavLink"
import { reducer } from "./model/headerModel"
import { logoutHandler } from "./model/popupsModel"
import React from "react"
import { sendLogoutRequest } from "../redux/actions"


const Header = (props) => {

    return (
        <>
            <header className= "head">
                {props.page === 1 ?
                <h1 className = "greating">
                    Hello, {props.clientName}
                    <button
                        className="logout_button"
                        onClick={() => logoutHandler(props.logout)}>
                        Logout
                    </button> 
                </h1>:
                <NavLink/>
                }
            </header>
            <aside>
                {props.page === 1 ?
                <h2 className = "counter">
                    Score: {props.achievemets.reduce(reducer, 0)}
                </h2> : 
                <h2 className = "counter">
                    Level: {props.achievemets
                            .find((e) => e.name === props.name)
                            .level}
                </h2>}
            </aside>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        achievemets: state.achievements.achievements,
        page: state.page.page,
        name: state.page.achievement,
        clientName:state.achievements.name
    }
}

const mapDispatchToProps = {
    logout: sendLogoutRequest
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)