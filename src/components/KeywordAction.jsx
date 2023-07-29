import { useEffect, useState } from "react";

export default function KeywordAction({
  topData,
  oneXdata,
  twoXdata,
  threeXdata,
}) {
  const [keywordType, setkeywordType] = useState(topData);
  const [activeKeywordType, setActiveKeywordType] = useState("TOP");

  useEffect(() => {
    setkeywordType(topData);
  }, [topData]);
  return (
    <div className="bg-[#f6f8fa] h-[100%] w-[100%] px-[10px]  max-lg:pb-[30px]">
      <div className="flex justify-between items-center  pt-[15px] max-md:px-[5px]">
        <h3 className="text-[13px] opacity-60 font-medium">KEYWORDS</h3>
        <div
          className="flex bg-white rounded-[5px]"
          style={{ border: "1px solid rgb(226 232 240)" }}
        >
          <h3
            className="text-[13px] opacity-60 font-medium py-[5px] px-[10px] cursor-pointer"
            style={{
              borderRight: "1px solid rgb(226 232 240)",
              backgroundColor:
                activeKeywordType == "TOP" ? "rgb(226 232 240)" : "",
            }}
            onClick={() => {
              setkeywordType(topData);
              setActiveKeywordType("TOP");
            }}
          >
            TOP
          </h3>
          <h3
            className="text-[13px] opacity-60 font-medium py-[5px] px-[10px] cursor-pointer"
            style={{
              borderRight: "1px solid rgb(226 232 240)",
              backgroundColor:
                activeKeywordType == "1X" ? "rgb(226 232 240)" : "",
            }}
            onClick={() => {
              setkeywordType(oneXdata);
              setActiveKeywordType("1X");
            }}
          >
            1X
          </h3>
          <h3
            className="text-[13px] opacity-60 font-medium py-[5px] px-[10px] cursor-pointer"
            style={{
              borderRight: "1px solid rgb(226 232 240)",
              backgroundColor:
                activeKeywordType == "2X" ? "rgb(226 232 240)" : "",
            }}
            onClick={() => {
              setkeywordType(twoXdata);
              setActiveKeywordType("2X");
            }}
          >
            2X
          </h3>
          <h3
            className="text-[13px] opacity-60 font-medium py-[5px] px-[10px] cursor-pointer"
            onClick={() => {
              setkeywordType(threeXdata);
              setActiveKeywordType("3X");
            }}
            style={{
              backgroundColor:
                activeKeywordType == "3X" ? "rgb(226 232 240)" : "",
            }}
          >
            3X
          </h3>
        </div>
      </div>
      <div className="pt-5">
        <div class="relative overflow-x-auto  flex items-center  ">
          {keywordType.length > 0 ? (
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                {keywordType?.map((item) => (
                  <tr
                    class="bg-white  dark:bg-gray-900  px-[10px]"
                    style={{ border: "1px solid rgb(226 232 240)" }}
                  >
                    <td
                      scope="row"
                      class="px-2 text-[13px] py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item?.word}
                    </td>
                    <td class="px-2 py-2 font-semibold">{item?.count}</td>
                    <td class="px-2 py-2 text-[13px]">{item?.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center opacity-50 pt-5 w-full">
              Enter text to display keywords
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
