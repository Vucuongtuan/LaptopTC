"use client";
import React, { useState } from "react";

export default function MakupHtml({ content }: { content: string }) {
  const [showFullContent, setShowFullContent] = useState(false);
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: showFullContent ? content : content.slice(0, 2500),
        }}
      ></div>
      {!showFullContent && (
        <button
          className="w-full text-center rounded-s-md -mt-8 h-12 bg-gradient-to-t font-semibold  from-white via-slate-300 to-transparent"
          onClick={toggleContent}
        >
          Xem thêm
        </button>
      )}
    </>
  );
}
