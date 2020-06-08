import React from "react";

type Props = {
  wordCount: number;
  seconds: number;
};

function Results({ wordCount, seconds }: Props) {
  console.log(wordCount, seconds);
  return <span>{wordCount / seconds} wpm</span>;
}

export default Results;
