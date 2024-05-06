import React from "react";
import styles from "./Chat.module.css";

const WaitingMessageBubble = React.memo(function WaitingMessageBubble({
  waitingForResponse,
  isTyping,
}: {
  waitingForResponse: boolean;
  isTyping: boolean;
}) {
  if (!waitingForResponse && !isTyping) return null;
  return (
    <div className={styles.waitingMessageBubble}>
      <div className={styles.dotTyping}></div>
    </div>
  );
});

export default WaitingMessageBubble;
