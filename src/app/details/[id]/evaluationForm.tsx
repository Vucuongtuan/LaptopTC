"use client";
import {
  getComment,
  insertComment,
  likeComment,
  replyComment,
} from "@/api/product/index.api";
import { useToast } from "@/components/ui/use-toast";
import { RootState } from "@/lib/store";
import { IComment } from "@/types/data/index.types";
import { Button, debounce, IconButton, Rating } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const commentSchema = z.object({
  ratings: z.number().min(1).max(5),
  comment: z.string().min(1).max(100).nonempty(),
});
export type FormData = z.infer<typeof commentSchema>;
export default function EvaluationForm({ id }: { id: string }) {
  const [ratings, setRatings] = useState<number | null>(0);
  const [checkInput, setCheckInput] = useState<boolean>(false);
  const [ratingsCount, setRatingsCount] = useState<any[]>([]);
  const [reply, setReply] = useState<string>("");
  const { toast } = useToast();
  const { userName, authUser } = useSelector((name: RootState) => name.auth);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["/comment"],
    queryFn: () => getComment(id),
    staleTime: 3600000,
  });
  const newData = data?.data;
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(commentSchema),
  });
  useEffect(() => {
    setValue("ratings", ratings || 0);
    const newRatingsCount = [];
    for (let i = 1; i <= 5; i++) {
      newRatingsCount.push(newData?.ratingsCount[`${i}_star`]);
    }
    setRatingsCount(newRatingsCount);
  }, [newData?.ratingsCount, ratings, setValue]);
  const handleLike = async (idComment: string) => {
    const idUser =
      typeof window !== "undefined"
        ? localStorage.getItem("userID") ?? ""
        : null;
    await likeComment(idUser, idComment, id);
    refetch();
  };
  if (authUser === false || authUser === undefined) {
    return (
      <div className="w-full h-auto min-h-[700px]  ">
        {ratingsCount.map((count, index) => (
          <div key={index} className="flex">
            <span className="px-2">{count}</span>
            <Rating name={`rating-count-${index}`} value={index + 1} readOnly />
          </div>
        ))}
        <div className="flex justify-center">
          <AlertDialog>
            <AlertDialogTrigger className="px-14 py-4 rounded-md shadow-sm text-white m-auto bg-red-600 hover:bg-red-700">
              Đánh giá
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Ohh , Bạn chưa đăng nhập</AlertDialogTitle>
                <AlertDialogDescription>
                  Vui lòng đăng nhập đẻ có thể tham gia đánh giá sản phẩm
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: any) => {
    const idUser =
      typeof window !== "undefined" ? localStorage.getItem("userID") ?? "" : "";
    const comment = {
      idProduct: id,
      comments: {
        userId: idUser === "" ? null : idUser,
        name: userName === "" ? "Người lạ" : userName,
        comment: data.comment,
        rating: data.ratings,
      },
    } as IComment;

    const res = await insertComment(comment);
    if (res.status === 200) {
      refetch();
    } else if (res.status === 500) {
      toast({
        title: "Lỗi rồi !!",
        description: res.data.message,
      });
    }
  };

  const handleDateComment = (date: string) => {
    const pastDate = new Date(date);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - pastDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);

    if (secondsDifference < 60) {
      return `${secondsDifference} giây trước`;
    } else if (secondsDifference < 3600) {
      const minutesDifference = Math.floor(secondsDifference / 60);
      return `${minutesDifference} phút trước`;
    } else if (secondsDifference < 86400) {
      const hoursDifference = Math.floor(secondsDifference / 3600);
      return `${hoursDifference} giờ trước`;
    } else {
      const daysDifference = Math.floor(secondsDifference / 86400);
      return `${daysDifference} ngày trước`;
    }
  };
  const handleReply = async (idComment: string) => {
    const idUser =
      typeof window !== "undefined" ? localStorage.getItem("userID") ?? "" : "";
    const res = await replyComment(idComment, reply, userName, id, idUser);
    if (res.status === 200) {
      toast({
        title: "Trả lời bình luận thành công",
      });
      refetch();
    } else {
      toast({
        title: "Trả lời bình luận thất bại vui long thử lái sau",
      });
    }
  };
  return (
    <div className="w-full h-auto">
      <div className="h-auto w-full px-2">
        {ratingsCount.map((count, index) => (
          <div key={index} className="flex">
            <span className="px-2">{count}</span>
            <Rating name={`rating-count-${index}`} value={index + 1} readOnly />
          </div>
        ))}

        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mt-8"
        >
          <label htmlFor="Đánh giá" className="text-lg font-semibold">
            Đánh giá
          </label>
          <input
            type="text"
            id="comment"
            placeholder="comment"
            {...register("comment", { required: true })}
            className="w-full py-2 rounded-md px-1"
          />
          {errors.comment && (
            <span className="text-red-500">Bạn chưa nhập Comment</span>
          )}{" "}
          <div className="flex w-full justify-around items-center text-center px-20">
            <Rating
              name="simple-controlled"
              value={ratings}
              size="large"
              onChange={(event, newValue) => {
                setRatings(newValue);
              }}
            />
            {errors.ratings && (
              <span className="text-red-500">Bạn chưa chọn dánh giá sao</span>
            )}
          </div>
          <Button
            type="submit"
            className="float-right bg-red-600 hover:bg-red-700 text-white py-2 my-2"
          >
            Gửi đánh giá
          </Button>
        </form>

        <div className="w-full h-auto min-h-[200px] max-h-[1200px] overflow-y-scroll  rounded-md mt-2">
          <ul className="overflow-y-scroll py-2">
            {newData &&
              newData.data.comments.map((comment: any) => {
                const nameAvatar = comment?.name as string;

                return (
                  <li key={comment._id} className="h-auto min-h-[80px] ">
                    <div className="float-left text-xl flex justify-center items-center w-12 h-12 mx-2 bg-[#cbd1d6] text-white font-bold rounded-full">
                      <span>{nameAvatar.charAt(0).toUpperCase() || "KH"}</span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <label className="w-full text-md font-semibold ">
                        {comment.name}{" "}
                      </label>{" "}
                      <Rating
                        name={`rating-count-${comment._id}`}
                        value={comment.rating}
                        readOnly
                        className="py-1"
                        size="small"
                      />
                      <span className="mt-1">{comment.comment}</span>
                      <div className="flex">
                        {handleDateComment(comment.date_create)}
                        {" | "}
                        <div
                          className="flex cursor-pointer text-blue-500 hover:text-blue-700 mx-2"
                          onClick={() => handleLike(comment._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-4 h-4 mt-1"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                            />
                          </svg>
                          <span>
                            Thích {comment.likes.length && comment.likes.length}
                          </span>
                        </div>
                        {" | "}
                        <AlertDialog>
                          <AlertDialogTrigger className="flex cursor-pointer text-blue-500 hover:text-blue-700 mx-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-4 h-4 mt-1"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                              />
                            </svg>{" "}
                            <span>Trả lời</span>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Trản lời bình luận
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                <textarea
                                  id="comment"
                                  placeholder="comment"
                                  onChange={debounce(
                                    (e: ChangeEvent<HTMLTextAreaElement>) => {
                                      const sendTo = `@${comment?.name}_ ${e.target.value}`;
                                      setReply(sendTo);
                                    },
                                    2000
                                  )}
                                  className="w-full py-2 rounded-md px-1"
                                />
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogAction
                                onClick={() => handleReply(comment._id)}
                              >
                                Trả lời
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    {comment.replies && comment.replies.length !== 0
                      ? comment?.replies?.map((item: any) => {
                          const nameC = item.name;
                          return (
                            <div
                              className="w-full px-16 py-2 flex"
                              key={item._id}
                            >
                              <div className="float-left text-xl flex justify-center items-center w-12 h-12 mx-2 bg-[#cbd1d6] text-white font-bold rounded-full">
                                <span>
                                  {(nameC && nameC.charAt(0).toUpperCase()) ??
                                    "KH"}
                                </span>
                              </div>
                              <div className="flex flex-col justify-center">
                                <label className="w-full text-md font-semibold ">
                                  {item.name}{" "}
                                </label>{" "}
                                <span className="mt-1">{item.comment}</span>
                                <div className="flex">
                                  {handleDateComment(item.date_create)}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : ""}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
