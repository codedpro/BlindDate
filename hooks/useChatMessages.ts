// hooks/useChatMessages.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Message {
  chat_id: number;
  key: string;
  name: string;
  text: string;
  time: number;
}

export function useChatMessages(
  appData: string,
  token: string,
  key: string,
  chatId: number,
  currentTime: number,
  setUser2ChatId: (id: number) => void,
  setUser2Key: (key: string) => void,
  setVotes: (votes: Message[]) => void
) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastId, setLastId] = useState<number | null>(null);
  const [length, setLength] = useState<number>(0);
  const [sending, setSending] = useState<boolean>(false);

  const checkMessages = async () => {
    const data = {
      app_data: appData,
      token,
      key,
    };
    const response = await axios.post(
      'https://api.blinddatepersian.site/index.php/CheckMessages',
      JSON.stringify(data)
    );
    setLastId(response.data.message_id);
  };

  const getMessages = async (to: number | null, from: number) => {
    const data = {
      app_data: appData,
      token,
      from: from,
      to: to,
    };
    const response = await axios.post(
      'https://api.blinddatepersian.site/index.php/GetMessages',
      JSON.stringify(data)
    );
    const newMessages: Message[] = response.data.data || [];
    const newLength = newMessages.length;

    setLength((prevLength) => newLength + prevLength);

    if (newMessages.length > 0) {
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);

      // Filter messages from the other user
      const filteredMessages = newMessages.filter(
        (message) => message.chat_id !== 0 && message.chat_id !== chatId
      );

      if (filteredMessages.length > 0) {
        setUser2ChatId(filteredMessages[0].chat_id);
        setUser2Key(filteredMessages[0].key);
      }

      if (filteredMessages.length > 0 && messages.length > 1) {
        const firstUserLastMessage = messages.filter(
          (message) => message.chat_id === chatId
        );
        const lastFirstUserMessage =
          firstUserLastMessage[firstUserLastMessage.length - 1];
        const lastFilteredMessage =
          filteredMessages[filteredMessages.length - 1];
        const lastMessages = [lastFirstUserMessage, lastFilteredMessage];
        setVotes(lastMessages);
      }
    }
    setSending(false);
  };

  const handleSend = async (typed: string) => {
    setSending(true);
    if (typed !== '') {
      const data = {
        app_data: appData,
        token,
        key,
        text: typed,
      };
      await axios.post(
        'https://api.blinddatepersian.site/index.php/SendMessage',
        JSON.stringify(data)
      );
      setSending(false);
      checkMessages();
    }
  };

  useEffect(() => {
    if (length) {
      getMessages(lastId, length + 1);
    } else {
      getMessages(lastId, 0);
    }
  }, [lastId]);

  useEffect(() => {
    checkMessages();
    if (currentTime === 23 || currentTime === 0) {
      const interval = setInterval(() => {
        checkMessages();
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [currentTime]);

  return {
    messages,
    handleSend,
    sending,
  };
}
