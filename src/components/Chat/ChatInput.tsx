import styles from "./Chat.module.css";
import { SendIcon } from "./Icons";

interface ChatInputProps {
  authorValue: string;
  setAuthorValue: (value: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  placeholder?: string;
  setIsTyping: (value: boolean) => void;
  autorValue: string;
  setAutorValue: (value: string) => void;
}

const ChatInput = ({
  authorValue,
  setAuthorValue,
  inputValue,
  autorValue,
  setInputValue,
  setAutorValue,
  handleSendMessage,
  placeholder,
  setIsTyping,
}: ChatInputProps) => {
  return (
    <div className={styles.inputArea}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.autorField}
          value={autorValue}
          onChange={(e) => {
            setAutorValue(e.target.value);
          }}
          placeholder="Seu nome (opcional)"
        />
        <input
          type="text"
          className={styles.inputField}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (e.target.value.length > 0) {
              setIsTyping(true);
            } else {
              setIsTyping(false);
            }
          }}
          placeholder={placeholder ?? "Sua mensagem"}
        />
      </div>
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
