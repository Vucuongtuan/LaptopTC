"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Update({ id, status }: { id: string; status: string }) {
  return (
    <Dialog>
      <DialogTrigger className="bg-blue-500 px-2 py-2 rounded-lg text-black font-semibold">
        Cập nhật
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật</DialogTitle>
          <DialogDescription>
            <form action="" className="w-full text-left relative">
              <div>
                <label htmlFor="Status">Status</label>
                <p>
                  <input
                    type="text"
                    defaultValue={status}
                    className="border-2 outline-none py-1 rounded-lg px-2"
                  />
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
