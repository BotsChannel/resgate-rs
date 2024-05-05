import React from "react"
import styles from "./Chat.module.css"
import { ChatProps } from "./widget-types"

const WaitingMessageBubble = React.memo(function WaitingMessageBubble({
  classnames,
  waitingForResponse,
  isTyping,
}: {
  classnames?: ChatProps["classnames"]
  waitingForResponse: boolean
  isTyping: boolean
}) {
  if (!waitingForResponse && !isTyping) return null
  return (
    <div className={`${waitingForResponse ? styles.botMessage : styles.userMessage} ${classnames?.messageBubble}`}>
      <div className={`${styles.waitingMessageBubble} ${classnames?.messageBubble}`}>
        <div className={`${styles.dotTyping} ${classnames?.messageBubble}`}></div>
      </div>
    </div>
  )
})

export default WaitingMessageBubble
