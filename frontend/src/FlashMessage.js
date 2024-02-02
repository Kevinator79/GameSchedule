import React from 'react'

const FlashMessage = (props) => {
  return (
    <div id={props.sendData[1] ? "flash-container-good":"flash-container-bad"} className={!props.sendData[0] ? "flash-message-hidden": ""}>
        <p>{props.sendData[2]}</p>
    </div>
  )
}

export default FlashMessage