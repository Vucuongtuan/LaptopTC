import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IApiBanner } from "@/types/data/index.types";
import Image from "next/image";
const Slide = ({ data }: { data: IApiBanner[] }) => {
  return (
    <Carousel
      className="w-full h-full rounded-md relative
    "
    >
      <CarouselContent>
        {data?.map((item) => (
          <CarouselItem key={item._id}>
            <div className=" h-full w-full rounded-md relative">
              <Image
                src={item.thumbnail}
                alt={item.description}
                width={800}
                height={400}
                className="h-full w-full "
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};
export default Slide;
