import React from "react"
export default class Emoji extends React.Component{
    addEmoji = (text,emoji) =>`${emoji} ${text} ${emoji} `

    render(override){
        let text = "hey hello"
        if(override){
            text=override
        }
        
        return <div>{text}</div>
    }
}