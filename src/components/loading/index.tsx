import { Skeleton } from "@/components/ui/skeleton";
const LoadingElement = () => {
  return (
    <div className="h-full w-full relative">
      <Skeleton className="h-full w-full rounded-xl" />
      <span className="absolute justify-center items-center text-2xl">
        Loading ...
      </span>
    </div>
  );
};
export default LoadingElement;
