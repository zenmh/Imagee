import React from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";

const { div_c, img_1, div_g, p_1, div_p, div_s, div_gs, p_2, btn, img_2 } = {
  div_c: "rounded-xl group relative shadow-card hover:shadow-cardhover card",
  img_1: "w-full h-auto object-cover rounded-xl",
  div_g:
    "group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md",
  p_1: "text-white text-sm overflow-y-auto prompt",
  div_p: "mt-5 flex justify-between items-center gap-2",
  div_s: "flex items-center gap-2",
  div_gs:
    "w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold",
  p_2: "text-white text-sm",
  btn: "outline-none bg-transparent border-none",
  img_2: "w-6 h-6 object-contain invert",
};

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className={div_c}>
      <img className={img_1} src={photo} alt={prompt} />
      <div className={div_g}>
        <p className={p_1}>{prompt}</p>
        <div className={div_p}>
          <div className={div_s}>
            <div className={div_gs}>{name[0]}</div>
            <p className={p_2}>{name}</p>
          </div>
          <button
            className={btn}
            type="button"
            onClick={() => downloadImage(_id, photo)}
          >
            <img src={download} alt="download" className={img_2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
