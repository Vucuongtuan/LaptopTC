import Image from "next/image";
import React from "react";

export default function BlogCard({ data }: { data: any }) {
  return (
    <div className="w-full h-full p-4">
      <Image
        src={data.thumbnail}
        alt={data.description}
        width={200}
        height={170}
        className="h-5/6"
      />
      <div className="h-1/6 w-full">
        <h2 className="text-sm">
          <b>{data.title}</b>
        </h2>
        <span className="text-sm">{data.author}</span>
      </div>
    </div>
  );
}
