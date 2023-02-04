import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField, Loader } from "../components";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";

const {
  sec,
  h1,
  p_f,
  form_design,
  form_filed,
  img1,
  img2,
  img_div,
  loader,
  btn_generate,
  btn_submit,
  p_l,
} = {
  sec: "max-w-7xl mx-auto",
  h1: "font-extrabold text-[#222328] text-[32px]",
  p_f: "mt-2 text-[#666e75] text-[14px] max-w-[500px]",
  form_design: "mt-16 max-w-3xl",
  form_filed: "flex flex-col gap-5",
  img_div:
    "relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center",
  img1: "w-full h-full object-contain",
  img2: "w-9/12 h-9/12 object-contain opacity-40",
  loader:
    "absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg",
  btn_generate:
    "text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center",
  btn_submit:
    "mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center",
  p_l: "mt-2 text-[#666e75] text-[14px]",
};

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await response.json();
        navigate("/");
      } catch (err) {
        console.log(err);
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an Image");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/imagee", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        console.log(err);
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  return (
    <section className={sec}>
      <div>
        <h1 className={h1}>Create</h1>
        <p className={p_f}>
          Generate an imaginative image through Imagee and share it with the
          community
        </p>
      </div>
      <form className={form_design} onSubmit={handleSubmit}>
        <div className={form_filed}>
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="panda mad scientist mixing sparkling chemicals, digital art"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className={img_div}>
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className={img1} />
            ) : (
              <img src={preview} alt="image_preview" className={img2} />
            )}
            {generatingImg && (
              <div className={loader}>
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className={btn_generate}
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className={p_l}>
            ** Once you have created the image you want, you can share it with
            others in the community **
          </p>
          <button className={btn_submit}>
            {loading ? "Sharing..." : "Share with the Community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
