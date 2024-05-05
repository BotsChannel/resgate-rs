import styles from "./Chat.module.css";

interface ChatHeaderProps {
  notificationNumber: number;
  ChatBotName: string;
}

const ChatHeader = ({ notificationNumber, ChatBotName }: ChatHeaderProps) => {
  return (
    <nav className={styles.chatNav}>
      <div className={styles.navContent}>
        {notificationNumber > 0 && (
          <div className={styles.notificationDot}>{notificationNumber}</div>
        )}
        <span>{ChatBotName}</span>
      </div>
    </nav>
  );
};

export default ChatHeader;
