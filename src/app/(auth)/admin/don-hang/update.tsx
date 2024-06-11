"use client";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateStatusCart } from "@/api/user/index.api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
interface ILocalData {
  adminId: string;
  adminName: string;
  email: string;
}
export default function Update({
  id,
  idUser,
  status,
}: {
  id: string;
  idUser: string;
  status: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [newStatus, setNewStatus] = useState<string | null>(status);
  const handleChangeStatus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await updateStatusCart(id, idUser, newStatus);
    if (res.status !== 200) {
      toast({ title: res.message, variant: "destructive" });
      return;
    }
    toast({
      title: res.message,
    });
    window.location.reload();
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(e.target.value);
  };
  return (
    <Dialog>
      <DialogTrigger className="bg-blue-500 px-2 py-2 rounded-lg text-black font-semibold">
        Cập nhật
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật</DialogTitle>
          <DialogDescription>
            <form
              action=""
              className="w-full text-left relative"
              onSubmit={(e) => handleChangeStatus(e)}
            >
              <div>
                <label htmlFor="Status">Status</label>
                <p>
                  <select
                    name=""
                    id=""
                    defaultValue={status}
                    className="py-2"
                    onChange={handleSelectChange}
                  >
                    <option
                      value="Giao hàng thành công"
                      className=" font-semibold bg-green-400 py-2 mb-2"
                    >
                      Giao hàng thành công
                    </option>
                    <option
                      value="Đang đóng gói"
                      className=" font-semibold bg-blue-400 py-2"
                    >
                      Đang đóng gói
                    </option>
                    <option
                      value="Đang giao hàng"
                      className=" font-semibold bg-yellow-400 py-2"
                    >
                      Đang giao hàng
                    </option>
                    <option
                      value="Giao hàng thất bại"
                      className=" font-semibold bg-red-400 py-2"
                    >
                      Giao hàng thất bại
                    </option>
                  </select>
                </p>
              </div>
              <button className=" absolute bottom-0 right-1 border-2 px-4 py-1 rounded-lg bg-blue-500 text-black font-medium">
                OK
              </button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
