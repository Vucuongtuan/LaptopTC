import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IApiKeyboard, IApiMouse, IApiProduct } from "@/types/data/index.types";
import Image from "next/image";

type CarouselProps = {
  item: IApiProduct | IApiKeyboard | IApiMouse;
};
export default function CarouselProduct({ item }: CarouselProps) {
  return (
    <div className=" w-full rounded-md  h-full px-14 py-12 md:py-2 overflow-hidden ">
      <Carousel className="rounded-md  w-full">
        <CarouselContent>
          {item?.thumbnail.map((img, index) => (
            <CarouselItem
              key={index}
              className="h-full w-full relative rounded-md"
            >
              <Image
                src={img}
                alt={item.name}
                width={500}
                height={300}
                className="h-full w-full  rounded-md

                "
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="" />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
