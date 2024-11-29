import React from "react";

interface ChannelListProps {
  channels: string[];
  checking: boolean;
  onCheckChannels: () => void;
}

const ChannelList: React.FC<ChannelListProps> = ({ channels, checking, onCheckChannels }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-lg text-center space-y-4">
        <h2 className="mb-6">برای ادامه باید در کانال‌های زیر عضو شوید:</h2>
        {channels.map((channel, index) => (
          <a
            key={index}
            href={channel}
            className={`block border border-white rounded-lg py-2 px-4 ${
              checking ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-700"
            }`}
          >
            کانال شماره {index + 1}
          </a>
        ))}
        <button
          disabled={checking}
          onClick={onCheckChannels}
          className="w-full mt-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400"
        >
          بررسی
        </button>
      </div>
    </div>
  );
};

export default ChannelList;
