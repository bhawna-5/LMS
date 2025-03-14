import React from "react";
import { assets } from "../../assets/assets";

const CallToActions = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 pc-8 md:px-0 ">
      <h1 className="text-xl md:text-4xl">Learn anything, anytime, anywhere</h1>
      <p className="text-gray-500 sm:text-sm">
         Modi animi
        consectetur reiciendis quis alias cupiditate assumenda voluptatibus
        ipsum laboriosam fugiat.
      </p>
      <div className="flex items-center font-medium gap-6 mt-4">
        <button className="px-10 py-3 rounded-md text-white bg-blue-600">Get started</button>
        <button className="flex items-center gap-2">Learn more <img  src={assets.arrow_icon} alt="" /></button>
      </div>
    </div>
  );
};

export default CallToActions;
