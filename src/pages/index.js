import { useEffect, useRef, useState } from "react";

import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import toast from "react-hot-toast";
import WhatWordCounter from "@/components/WhatWordCounter";
import ActionBox from "@/components/ActionBox";
import KeywordAction from "@/components/KeywordAction";
import { commonWords } from "@/constants/commonWords";

export default function Home() {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [whiteSpaceCount, setWhiteSpaceCount] = useState(0);
  const [readingTime, setReadingTime] = useState("0 min, 0 sec");
  const [speackTime, setSpeackTime] = useState("0 min, 0 sec");
  const [keywordDensity, setKeywordDensity] = useState([]);
  const [keyword2Density, setKeyword2Density] = useState([]);
  const [keyword3Density, setKeyword3Density] = useState([]);
  const [highCountKeywords, setHighCountKeywords] = useState([]);
  const [activeFontSize, setActiveFontSize] = useState("17px");
  const [activeFontFamily, setActiveFontFamily] = useState(
    "'Inter', sans-serif"
  );
  const [grammerCheck, setGrammerCheck] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  console.log("grammerCheck: ", grammerCheck);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Text copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  useEffect(() => {
    const combinedKeywords = [
      ...keywordDensity,
      ...keyword2Density,
      ...keyword3Density,
    ];

    combinedKeywords.sort((a, b) => b.count - a.count);

    const topTenWords = combinedKeywords.slice(0, 10);

    setHighCountKeywords(topTenWords);
  }, [keywordDensity, keyword2Density, keyword3Density]);

  useEffect(() => {
    const autoSave = localStorage.getItem("autoSave");
    console.log("autoSavesss: ", autoSave);

    if (autoSave === "true") {
      const savedText = localStorage.getItem("text");
      setText(savedText || "");
    } else {
      localStorage.removeItem("text");
      setText("");
    }

    setActiveFontSize(localStorage.getItem("activeFontSize") || "17px");
    setActiveFontFamily(
      localStorage.getItem("activeFontFamily") || "'Inter', sans-serif"
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("text", text);
  }, [text]);

  const removePunctuation = (word) => {
    return word.replace(/[^\w\s]/g, "").toLowerCase();
  };

  const calculateWordFrequency = (text) => {
    const words = text.trim().split(/\s+/);

    const wordFrequency = words.reduce((frequency, word) => {
      const lowercaseWord = removePunctuation(word);
      if (lowercaseWord.length >= 3 && !commonWords.includes(lowercaseWord)) {
        frequency[lowercaseWord] = (frequency[lowercaseWord] || 0) + 1;
      }
      return frequency;
    }, {});

    const sortedWords = Object.entries(wordFrequency).sort(
      (a, b) => b[1] - a[1]
    );

    const topTenWords = sortedWords.slice(0, 10);

    const totalWords = Object.values(wordFrequency).reduce(
      (sum, count) => sum + count,
      0
    );

    const formattedData = topTenWords.map(([word, count]) => ({
      word,
      count,
      percentage: ((count / totalWords) * 100).toFixed(2),
    }));

    return formattedData;
  };

  const calculatetwoWordFrequency = (text) => {
    const words = text.trim().split(/\s+/);

    const wordFrequency = words.reduce((frequency, word, index) => {
      const nextWord = removePunctuation(words[index + 1] || "");
      const bigram = `${removePunctuation(word)} ${nextWord}`;

      if (
        bigram &&
        bigram.length >= 3 &&
        !commonWords.includes(removePunctuation(word)) &&
        !commonWords.includes(nextWord)
      ) {
        frequency[bigram] = (frequency[bigram] || 0) + 1;
      }
      return frequency;
    }, {});

    const sortedWords = Object.entries(wordFrequency).sort(
      (a, b) => b[1] - a[1]
    );

    const topTenWords = sortedWords.slice(0, 10);

    const totalWords = Object.values(wordFrequency).reduce(
      (sum, count) => sum + count,
      0
    );

    const formattedData = topTenWords.map(([word, count]) => ({
      word,
      count,
      percentage: ((count / totalWords) * 100).toFixed(2),
    }));

    return formattedData;
  };

  const calculateThreeWordFrequency = (text) => {
    const words = text.trim().split(/\s+/);

    const wordFrequency = words.reduce((frequency, word, index) => {
      const nextWord = removePunctuation(words[index + 1] || "");
      const nextNextWord = removePunctuation(words[index + 2] || "");
      const trigram = `${removePunctuation(word)} ${nextWord} ${nextNextWord}`;

      if (
        trigram &&
        trigram.length >= 5 &&
        !commonWords.includes(removePunctuation(word)) &&
        !commonWords.includes(nextWord) &&
        !commonWords.includes(nextNextWord)
      ) {
        frequency[trigram] = (frequency[trigram] || 0) + 1;
      }
      return frequency;
    }, {});

    const sortedWords = Object.entries(wordFrequency).sort(
      (a, b) => b[1] - a[1]
    );

    const topTenWords = sortedWords.slice(0, 10);

    const totalWords = Object.values(wordFrequency).reduce(
      (sum, count) => sum + count,
      0
    );

    const formattedData = topTenWords.map(([word, count]) => ({
      word,
      count,
      percentage: ((count / totalWords) * 100).toFixed(2),
    }));

    return formattedData;
  };

  useEffect(() => {
    const words = text.trim().split(/\s+/);
    const count = words.length;
    setWordCount(count);
    const charCount = text.length;
    setCharCount(charCount);
    const sentences = text.split(/[.!?]+/);
    const sentenceCount = sentences.length - 1;
    setSentenceCount(sentenceCount);
    const paragraphs = text.trim().split(/\n\n|\n/);
    const paragraphCount = paragraphs.length;
    setParagraphCount(paragraphCount);
    const averageCharsPerPage = 1700;
    const pageCount = (charCount / averageCharsPerPage).toFixed(1);
    setPageCount(pageCount);

    const whiteSpaces = text.match(/\s/g);
    const whiteSpaceCount = whiteSpaces ? whiteSpaces.length : 0;
    setWhiteSpaceCount(whiteSpaceCount);

    const wordsPerMinute = 280; // Adjust this value according to your reading speed
    const totalWords = count;
    const readingTimeInMinutes = totalWords / wordsPerMinute;
    const readingTimeInSeconds = readingTimeInMinutes * 60;
    console.log("readingTimeInSeconds: ", readingTimeInSeconds);
    const minutes = Math.floor(readingTimeInSeconds / 60);
    const seconds = Math.floor(readingTimeInSeconds % 60);
    console.log("seconds: ", seconds);
    setReadingTime(`${minutes} min, ${seconds} sec`);

    const speacksMinute = 200; // Adjust this value according to your reading speed

    const speackingTimeInMinutes = totalWords / speacksMinute;
    const speackingTimeInSeconds = speackingTimeInMinutes * 60;
    console.log("speackingTimeInSeconds: ", speackingTimeInSeconds);
    const speackMinutes = Math.floor(speackingTimeInSeconds / 60);
    const speackSeconds = Math.floor(speackingTimeInSeconds % 60);
    console.log("seconds: ", seconds);
    setSpeackTime(`${speackMinutes} min, ${speackSeconds} sec`);

    const keywordDensityData = calculateWordFrequency(text);
    setKeywordDensity(keywordDensityData);

    const keyword2DensityData = calculatetwoWordFrequency(text);
    setKeyword2Density(keyword2DensityData);

    const keyword3DensityData = calculateThreeWordFrequency(text);
    setKeyword3Density(keyword3DensityData);
  }, [text, charCount]);

  return (
    <Grammarly clientId={"client_BG3SNYF36Rc4mSdeziduFY"}>
      <div>
        <div className="pt-[20px] pb-[50px] lg:pt-[50px]">
          <div className="block xl:hidden w-[95%] md:w-[85%] xl:w-[70%] mx-auto">
            <ActionBox
              setText={setText}
              activeFontSize={activeFontSize}
              setActiveFontSize={setActiveFontSize}
              activeFontFamily={activeFontFamily}
              setActiveFontFamily={setActiveFontFamily}
              grammerCheck={grammerCheck}
              setGrammerCheck={setGrammerCheck}
              autoSave={autoSave}
              setAutoSave={setAutoSave}
            />
          </div>
          <div
            className="w-[95%] md:w-[85%] xl:w-[70%] mx-auto bg-white  rounded-[4px] relative shadow-lg"
            style={{ border: "1px solid rgb(226 232 240)" }}
          >
            <div className="hidden xl:block">
              <ActionBox
                setText={setText}
                activeFontSize={activeFontSize}
                setActiveFontSize={setActiveFontSize}
                activeFontFamily={activeFontFamily}
                setActiveFontFamily={setActiveFontFamily}
                grammerCheck={grammerCheck}
                setGrammerCheck={setGrammerCheck}
                autoSave={autoSave}
                setAutoSave={setAutoSave}
              />
            </div>
            <div
              className="flex justify-between py-[15px] px-[15px] md:px-[25px] max-lg:flex-col"
              style={{ borderBottom: "1px solid rgb(226 232 240)" }}
            >
              <div className="max-lg:flex justify-between items-center">
                <p className="text-[14px] opacity-70">WORDS</p>
                <h2 className="text-[20px] md:text-[25px] font-semibold">
                  {text === "" ? 0 : wordCount}
                </h2>
              </div>
              <div className="max-lg:flex justify-between items-center">
                <p className="text-[14px] opacity-70">CHARACTERS</p>
                <h2 className="text-[20px] md:text-[25px] font-semibold">
                  {charCount}
                </h2>
              </div>
              <div className="max-lg:flex justify-between items-center">
                <p className="text-[14px] opacity-70">SENTENCES</p>
                <h2 className="text-[20px] mt-1 font-semibold">
                  {sentenceCount}
                </h2>
              </div>
              <div className="max-lg:flex justify-between items-center">
                <p className="text-[14px] opacity-70">PARAGRAPHS</p>
                <h2 className="text-[20px] mt-1 font-semibold">
                  {text === "" ? 0 : paragraphCount}
                </h2>
              </div>

              <div className="max-lg:hidden justify-between items-center">
                <p className="text-[14px] opacity-70">
                  TWITTER{" "}
                  <i class="fa-brands fa-twitter text-[#00acee] mx-2"></i>
                </p>
                <h2 className="text-[20px] font-semibold mt-1 flex items-center">
                  <i class="fa-solid fa-circle text-[12px] mx-2 text-[#00acee]"></i>
                  {280 - charCount}/
                  <span className="text-[16px] opacity-60">280</span>
                </h2>
              </div>
              <div className="max-lg:hidden justify-between items-center">
                <p className="text-[14px] opacity-70">
                  FACEBOOK{" "}
                  <i class="fa-brands fa-facebook-f text-[#3b5998] mx-2"></i>
                </p>
                <h2 className="text-[20px] font-semibold mt-1 flex items-center">
                  <i class="fa-solid fa-circle text-[12px] mx-2 text-[#3b5998]"></i>
                  {250 - charCount}/
                  <span className="text-[16px] opacity-60">250</span>
                </h2>
              </div>
              <div className="max-lg:hidden justify-between items-center">
                <p className="text-[14px] opacity-70">
                  GOOGLE <i class="fa-brands fa-google text-[#db3236] mx-2"></i>
                </p>
                <h2 className="text-[20px] font-semibold mt-1 flex items-center">
                  <i class="fa-solid fa-circle text-[12px] mx-2 text-[#db3236]"></i>
                  {300 - charCount}/
                  <span className="text-[16px] opacity-60">300</span>
                </h2>
              </div>
            </div>
            <div className=" flex max-lg:flex-col">
              <div
                className="w-[100%] lg:w-[70%]"
                style={{
                  borderRight: "1px solid rgb(226 232 240)",
                  position: "relative",
                }}
              >
                {grammerCheck ? (
                  <GrammarlyEditorPlugin>
                    <textarea
                      className="custome_scroll"
                      name="content"
                      value={text}
                      placeholder="Enter text here for word count"
                      style={{
                        width: "100%",
                        height: "450px",
                        padding: "20px",
                        fontSize: activeFontSize,
                        fontFamily: activeFontFamily,
                      }}
                      onChange={(e) => setText(e.target.value)}
                    ></textarea>
                  </GrammarlyEditorPlugin>
                ) : (
                  <textarea
                    name="content"
                    value={text}
                    placeholder="Enter text here for word count"
                    style={{
                      width: "100%",
                      height: "450px",
                      padding: "20px",
                      fontSize: activeFontSize,
                      fontFamily: activeFontFamily,
                    }}
                    onChange={(e) => setText(e.target.value)}
                  ></textarea>
                )}

                <div
                  className="flex lg:hidden flex-col gap-[15px] py-[15px] px-[15px] md:px-[25px]  "
                  style={{ borderTop: "1px solid rgb(226 232 240)" }}
                >
                  <div className="flex items-center justify-end gap-[5px]">
                    <div
                      className="  cursor-pointer mt-[-78px]  "
                      onClick={handleCopyClick}
                    >
                      <i class="fa-regular fa-clipboard text-[25px] opacity-100"></i>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-[7px]">
                    <p className="text-[14px] opacity-70">Pages:</p>
                    <p className="text-[14px] font-semibold">
                      {pageCount > 0 ? pageCount : 0}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-[7px]">
                    <p className="text-[14px] opacity-70">Reading:</p>
                    <p className="text-[14px] font-semibold">{readingTime}</p>
                  </div>
                  <div className="flex items-center justify-between gap-[7px]">
                    <p className="text-[14px] opacity-70">speacking</p>
                    <p className="text-[14px] font-semibold">{speackTime}</p>
                  </div>
                  <div className="flex items-center justify-between gap-[7px]">
                    <p className="text-[14px] opacity-70">White Spaces:</p>
                    <p className="text-[14px] font-semibold">
                      {whiteSpaceCount}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="w-[100%] lg:w-[30%]"
                style={
                  {
                    // padding: "10px",
                  }
                }
              >
                <KeywordAction
                  topData={highCountKeywords}
                  oneXdata={keywordDensity}
                  twoXdata={keyword2Density}
                  threeXdata={keyword3Density}
                />
              </div>
            </div>
            <div
              className="hidden lg:flex gap-[50px] py-[15px] px-[25px] "
              style={{ borderTop: "2px solid rgb(226 232 240)" }}
            >
              <div className="flex items-center gap-[7px]">
                <div className="  cursor-pointer" onClick={handleCopyClick}>
                  <i class="fa-solid fa-clipboard text-[20px] opacity-60"></i>
                </div>
              </div>
              <div className="flex items-center gap-[7px]">
                <p className="text-[14px] opacity-70">Pages:</p>
                <p className="text-[14px] font-semibold">
                  {pageCount > 0 ? pageCount : 0}
                </p>
              </div>
              <div className="flex items-center gap-[7px]">
                <p className="text-[14px] opacity-70">Reading:</p>
                <p className="text-[14px] font-semibold">{readingTime}</p>
              </div>
              <div className="flex items-center gap-[7px]">
                <p className="text-[14px] opacity-70">speacking</p>
                <p className="text-[14px] font-semibold">{speackTime}</p>
              </div>
              <div className="flex items-center gap-[7px]">
                <p className="text-[14px] opacity-70">White Spaces:</p>
                <p className="text-[14px] font-semibold">{whiteSpaceCount}</p>
              </div>
            </div>
          </div>
        </div>

        <WhatWordCounter />
      </div>
    </Grammarly>
  );
}
