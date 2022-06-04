let initialState = {
    open: false,
    status: "",
    content:""
}

export default function messageReducer(state = initialState, action) {
    switch(action.type) {
        case "ShowMessage": {
            return {
                ...state,
                open: true,
                status: action.header,
                content: action.content
            }
        }

        case "MessageClose": {
            return {
                ...state,
                open: false,
                status: "",
                content: ""
            }
        }
    }

    return state
}