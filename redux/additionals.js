import { showMessage } from "./actions"

export function copyObjectArray(array) {
    const newArray = []
    array.forEach((e) => {
        newArray.push({...e})
    })
    return newArray
}
export function parseCookie(cookie) {
    return cookie.split(";")
    .map(cookie => cookie.split("="))
    .reduce((array, nextCookie) => {
        array[nextCookie[0]?.trim()] = nextCookie[1]?.trim()
        return array},
    {})
}
export function checkResponse(dispatch, response, message) {
    if(response.status==200) {
        return response.text()

    } else if(message){

        dispatch(showMessage(message, "Access error"))
    }
    return null
}

export function loadData(dispatcher, data) {
    
    if(data) {
        dispatcher({type:"login", userData:data})
    }
    dispatcher({type:"loaded"})
}

export function notificator(dispatch) {
    dispatch(showMessage("Bad connection", "Access error"))
    dispatch({type:"loaded"})
}