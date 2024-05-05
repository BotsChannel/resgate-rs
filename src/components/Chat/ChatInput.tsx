import styles from "./Chat.module.css";
import { SendIcon } from "./Icons";

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  placeholder?: string;
  setIsTyping: (value: boolean) => void;
}

const ChatInput = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  placeholder,
  setIsTyping,
}: ChatInputProps) => {
  return (
    <div className={styles.inputArea}>
      <input
        type="text"
        className={styles.inputField}
        value={inputValue}
        onChange={(e) => {
          if (e.target.value.length > 0) {
            setInputValue(e.target.value);
            setIsTyping(true);
          } else {
            setIsTyping(false);
          }
        }}
        placeholder={placeholder ?? "Type your message..."}
      />
      <button
        onClick={handleSendMessage}
        className={styles.sendButton}
      >
        {<SendIcon />}
      </button>
    </div>
  );
};

export default ChatInput;
