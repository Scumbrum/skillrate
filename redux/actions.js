import { checkResponse, loadData, notificator } from "./additionals"
import URL from "../script/model/URL.js"

export function toMain() {
    return {
        type: "Main"
    }
}
export function toSecond(name) {
    return {
        type: "Second",
        payload: name
    }
}
export function toThird(name) {
    return {
        type: "Third",
        payload: name
    }
}

export function addCategory() {
    return {
        type: "AddCategory",
    }
}

export function cancel() {
    return {
        type: "Cancel",
    }
}

export function inputName(name) {
    return {
        type: "Input",
        payload: name
    }
}

export function saveCategory(name) {
    return {
        type: "SaveCategory",
        achievementName: name
    }
}

export function getInform(name) {
    return {
        type: "GetInform",
        payload:name
    }
}

export function deleteCategory(name) {
    return {
        type: "DeleteCategory",
        achievementName: name
    }
}

export function addLevel(name) {
    return {
        type: "AddLevel",
        name
    }
}

export function addRequirement() {
    return {
        type: "AddRequirement"
    }
}

export function deleteRequirement(index) {
    return {
        type: "DeleteRequirement",
        index:index
    }
}

export function inputNameRequirement(index, name) {
    return {
        type: "InputNameRequire",
        index: index,
        requirement: name
    }
}

export function inputValueRequirement(index, value) {
    return {
        type: "InputValueRequire",
        index,
        value
    }
}

export function saveLevel(requirements, achievement, level) {
    return {
        type: "SaveLevel",
        requirements,
        achievement,
        level
    }
}

export function deleteLevel(level, achievement) {
    return {
        type: "DeleteLevel",
        level,
        achievement
    }
}

export function editLevel(requirements, level) {
    return {
        type: "EditLevel",
        level,
        requirements
    }
}

export function saveEditedLevel(requirements, achievement, level) {
    return {
        type: "SaveEditedLevel",
        requirements,
        achievement,
        level
    }
}

export function markProgress(level, achievement) {
    return {
        type: "MarkProgress",
        level,
        achievement
    }
}

export function inputProgress(inputs) {
    return {
        type: "InputProgress",
        inputs
    }
}

export function sendCongratulation(level) {
    return {
        type: "ShowMessage",
        content: `You up to ${level} level`,
        header: "Well done"
    }
}

export function sendRegress(level) {
    return {
        type: "ShowMessage",
        content: `You down to ${level} level`,
        header: "Regress"
    }
}

export function showMessage(message, header) {
    return {
        type: "ShowMessage",
        content: message,
        header
    }
}

export function messageClose() {
    return {
        type: "MessageClose"
    }
}

export function setFetchData(achievements) {
    return {
        type: "FetchData",
        achievements
    }
}

export function toAuth() {
    return {
        type: "toAuth"
    }
}

export function toReg() {
    return {
        type: "toReg"
    }
}
export function inputClientName(name) {
    return {
        type: "inputName",
        name
    }
}

export function inputPassword(password) {
    return {
        type: "inputPassword",
        password
    }
}

export function sendLoginRequest(name, password) {
    return function(dispatch) {
        dispatch({type:"loading"})
        fetch(`${URL}signin`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, password})
        }).then(r => {
            return checkResponse(dispatch, r, "Invalid data")
        }).then(r => {
            loadData(dispatch, JSON.parse(r))
            } 
        ).catch((e) => {
      
            notificator(dispatch)
        })
    }
}

export function sendLogoutRequest(refreshToken) {
    return function(dispatch) {
        fetch(`${URL}logout`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({refreshToken})
        }).then(r => {
            if(r.status==200) {
                dispatch({type:"logout"}) 
            }
        })
    }
}

export function sendRegistrateRequest(name, password) {
    return function(dispatch) {
        dispatch({type:"loading"})
        return fetch(`${URL}signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, password})
        }).then(r => {
            return checkResponse(dispatch, r, "Exists name")
        }).then(r => {
            loadData(dispatch, JSON.parse(r))
            }
        )
    }
}

export function sendReafreshRequest(refreshToken) {
    return function(dispatch) {
        
        fetch(`${URL}refresh`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({refreshToken})
        }).then(r => {
           checkResponse(r)
        }).then(r => {
                loadData(dispatch, JSON.parse(r))
            }
        )
    
    }
}

export function sendDataRequest(accessToken, refreshToken) {
    return function(dispatch) {
        return fetch(`${URL}rate`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({accessToken, refreshToken})
        }).then(r => {
            return checkResponse(dispatch, r)
        }).then(r => {
            if(r) {
                dispatch({type:"loadData", userData: JSON.parse(r)})
            }
            }
        )     
    }
}

export function saveRequest(accessToken, rate, id) {
    
    return fetch(`${URL}save`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({rate, accessToken, id})
    }).then(r=>r.status)
}