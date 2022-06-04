import React, { useEffect } from "react"

export function useKey(key, callBack) {

    useEffect(() => {
        function gg(e) {
            
            if(e.code == key) {
                callBack(e)
            }
        }
        document.addEventListener("keypress", gg)
        return () => document.removeEventListener("keypress", gg)
    }, [key, callBack])
}