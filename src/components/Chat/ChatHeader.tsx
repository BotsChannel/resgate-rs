import styles from "./Chat.module.css";

interface ChatHeaderProps {
  ChatBotName: string;
}

const ChatHeader = ({ ChatBotName }: ChatHeaderProps) => {
  return (
    <nav className={styles.chatNav}>
      <div className={styles.navContent}>
        <span>{ChatBotName}</span>
      </div>
    </nav>
  );
};

export default ChatHeader;
