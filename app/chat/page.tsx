'use client';
import { useEffect, useState } from 'react';
import NavBar from '@/components/navBar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useTime } from '@/hooks/useTime';
import { useChatMessages } from '@/hooks/useChatMessages';
import { usePreventOverscroll } from '@/hooks/usePreventOverscroll';
import MessageList from '@/components/Chat/MessageList';
import ChatInput from '@/components/Chat/ChatInput';
import { useUserStore, useAppStore } from '@/store';

const ChatRoom = () => {
  const [typed, setTyped] = useState('');
  const [liked, setLiked] = useState(false);
  const [voted, setVoted] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [votes, setVotes] = useState<any[]>([]);

  const [user2img1, setUser2Img1] = useState<string | null>(null);
  const [user2img2, setUser2Img2] = useState<string | null>(null);
  const [user2img3, setUser2Img3] = useState<string | null>(null);
  const [user2img4, setUser2Img4] = useState<string | null>(null);
  const [user2ChatId, setUser2ChatId] = useState<number | null>(null);
  const [user2key, setUser2Key] = useState<string | null>(null);

  const {
    key,
    img1,
    img2,
    img3,
    img4,
    chatId,
    name,
    bio,
    telegramId,
    setTelegramId,
    token,
  } = useUserStore();

  const { appData } = useAppStore();

  const router = useRouter();

  usePreventOverscroll();

  const { time } = useTime(setCurrentTime);

  const { messages, handleSend, sending } = useChatMessages(
    appData ?? '',
    token ?? '',
    key ?? '',
    chatId ?? 0,
    currentTime,
    setUser2ChatId,
    setUser2Key,
    setVotes
  );

  const changeTime = (stamp: number) => {
    const date = new Date(stamp * 1000);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    return `${hours}:${minutes.substr(-2)}`;
  };

  const handleVote = async (vote: string) => {
    if (!appData || !token || !key) {
      console.error('Missing required data for voting');
      return;
    }
    setVoted(true);
    const data = {
      app_data: appData,
      token,
      key,
      text: vote === 'like' ? 'BLINDDATELIKE' : 'BLINDDATEDISLIKE',
    };
    await axios.post(
      'https://api.blinddatepersian.site/index.php/SendMessage',
      JSON.stringify(data)
    );
  };

  useEffect(() => {
    if (!votes || votes.length < 2) return;
    if (time === '00:05') {
      if (
        votes[0]?.text === 'BLINDDATELIKE' &&
        votes[1]?.text === 'BLINDDATELIKE'
      ) {
        setLiked(true);
      }
    }
  }, [votes, time]);

  useEffect(() => {
    if (user2ChatId && user2key) {
      showPvButton();
    }
  }, [user2ChatId, user2key]);

  const showPvButton = async () => {
    if (!user2ChatId || !user2key || !appData) {
      console.error('Missing required data for showPvButton');
      return;
    }
    try {
      const data = {
        chat_id: user2ChatId,
        app_data: appData,
        key: user2key,
      };
      const getSecondProfile = await axios.post(
        'https://api.blinddatepersian.site/index.php/GetProfile',
        JSON.stringify(data)
      );
      const profile = getSecondProfile.data.data[0];
      setUser2Img1(
        `https://api.blinddatepersian.site/images/${profile.photos}/1.png`
      );
      setUser2Img2(
        `https://api.blinddatepersian.site/images/${profile.photos}/2.png`
      );
      setUser2Img3(
        `https://api.blinddatepersian.site/images/${profile.photos}/3.png`
      );
      setUser2Img4(
        `https://api.blinddatepersian.site/images/${profile.photos}/4.png`
      );
      setTelegramId(profile.user_name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (bio === '') router.push(`/#${appData}`);
  }, [bio, appData]);

  return (
    <div className="center" style={{ backgroundColor: 'black' }}>
      {(currentTime === 23 || currentTime === 0) && token !== '' ? (
        <>
          <div
            className="chat"
            style={{
              backgroundColor: '#1E2126',
            }}
          >
            <div
              className="header flex justify-between w-full "
              style={{
                height: 'max-content',
                padding: '12px 0.8rem',
                backgroundColor: 'black !important',
                alignItems: 'center',
              }}
            >
              <div
                className=""
                style={{
                  fontSize: 'smaller',
                  backgroundImage: 'url(/icons/logo.svg)',
                  width: '45px',
                  height: '45px',
                }}
              ></div>

              <p
                style={{
                  fontFamily: 'cursive !important',
                  fontStyle: 'italic',
                }}
              >
                BlindDate
              </p>
            </div>
            <MessageList
              messages={messages}
              chatId={chatId ?? 0}
              changeTime={changeTime}
              currentTime={currentTime}
              user2img1={user2img1}
              user2img2={user2img2}
              user2img3={user2img3}
              user2img4={user2img4}
              liked={liked}
              telegramId={telegramId ?? ''}
            />
          </div>
          <ChatInput
            typed={typed}
            setTyped={setTyped}
            handleSend={() => handleSend(typed)}
            sending={sending}
            currentTime={currentTime}
            voted={voted}
            handleVote={handleVote}
          />
        </>
      ) : (
        <>
          <div
            className="text-xl text-center text-white"
            style={{
              marginTop: '20px',
            }}
          >
            {(currentTime === 23 || currentTime === 0) && token === ''
              ? 'برای شما دیتی ثبت نشده. لطفا فردا ساعت 11 تشریف بیارید'
              : ' ❤️دیت هامون ساعت 11 شروع میشن . منتظرتونیم'}
          </div>
          <div className="text-white gap-nav">
            <NavBar active={'gap'} />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatRoom;
