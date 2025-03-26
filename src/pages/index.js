import React, {useState} from "react";
import Dropdown from "@/components/Dropdown";
import {model} from "@/utils/ai";
import {IoMdSwap} from "react-icons/io";
import {RiRobot2Fill} from "react-icons/ri";
import LoadingDots from "@/components/LoadingDots";
import {FaTrashCan} from "react-icons/fa6";

const languageOptions = [
  {value: "ar", label: "Arabic"},
  {value: "en", label: "English"},
  {value: "es", label: "Spanish"},
  {value: "fi", label: "Finnish"},
  {value: "fr", label: "French"},
  {value: "ja", label: "Japanese"},
  {value: "no", label: "Norwegian"},
  {value: "pt", label: "Portuguese"},
  {value: "se", label: "Swedish"},
  {value: "tr", label: "Turkish"},
];

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [languageFrom, setLanguageFrom] = useState("en");
  const [languageTo, setLanguageTo] = useState("se");
  const [loading, setLoading] = useState(false);

  async function handleTranslate() {
    if (!inputText.trim()) {
      return alert("Please enter text to translate.");
    }

    setLoading(true);

    const prompt = ` Text: "${inputText}". Translate the following text strictly from ${languageFrom} to ${languageTo}. 
    If the text does not exist in ${languageFrom}, reply only with: "This word does not exist in this language." 
    If it is more than two words, reply only with: "These words do not exist in this language."
    Do not add any explanations or additional text.`;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      setTranslatedText(response);
    } catch (error) {
      console.error("Translation error:", error);
      alert("AI Translation is currently unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  // Swap function
  function handleSwap() {
    setLanguageFrom(languageTo);
    setLanguageTo(languageFrom);

    setInputText(translatedText);
    setTranslatedText(inputText);
  }

  return (
    <div className="flex flex-col items-center justify-center m-2">
      <h1 className=" flex flex-row gap-3 text-3xl font-bold">
        <RiRobot2Fill className="text-blue-500 hover:animate-spin" />
        AI Translator
      </h1>
      <div className=" flex flex-col  md:flex-row  justify-center items-center gap-4 justify-items-center  h-full m-6 ">
        <div className="flex flex-col  rounded-lg p-4 bg-slate-100  shadow-lg">
          <div className="flex flex-row justify-between">
            {/* language from dropdown */}
            <Dropdown
              options={languageOptions}
              value={languageFrom}
              onChange={(e) => setLanguageFrom(e.target.value)}
            />
            {/* Delete all button */}
            <button
              onClick={() => {
                setInputText("");
                setTranslatedText("");
              }}
              className="mr-2 hover:text-red-500"
            >
              <FaTrashCan />
            </button>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to translate..."
            type="text"
            className="border border-slate-300 bg-white rounded-lg p-2 h-52  w-64 md:w-80  lg:w-96  resize-none shadow-lg focus:outline-none"
          />
        </div>

        {/* Swap button and loading dots */}
        <div className="m-5">
          {loading ? (
            <LoadingDots />
          ) : (
            <button
              onClick={handleSwap}
              className=" hover:opacity-85 text-3xl "
            >
              <IoMdSwap className="size-10 rotate-90 md:rotate-0 transition-transform duration-300" />
            </button>
          )}
        </div>
        <div className="flex flex-col rounded-lg h-fit w-full p-4 bg-slate-100  shadow-lg">
          {/* Language To dropdown */}
          <Dropdown
            options={languageOptions}
            value={languageTo}
            onChange={(e) => setLanguageTo(e.target.value)}
          />

          <textarea
            readOnly
            value={translatedText}
            placeholder="Translated text here..."
            type="text"
            className="border border-slate-300 bg-white rounded-lg p-2 h-52 w-64  md:w-80 lg:w-96   resize-none shadow-lg focus:outline-none "
          />
        </div>
      </div>
      {/* Transalte button */}
      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg  hover:bg-blue-600"
        onClick={handleTranslate}
      >
        Translate
      </button>
    </div>
  );
}
