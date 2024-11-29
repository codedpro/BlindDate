import React from "react";

const DecisionButtons: React.FC = () => {
  return (
    <div className="decision flex justify-between p-4">
      <button className="bg-gray-500 text-white px-4 py-2 rounded">!نه، بعدی</button>
      <button className="bg-red-600 text-white px-4 py-2 rounded">!آره، همین</button>
    </div>
  );
};

export default DecisionButtons;
