"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Login from "./login";
import Resgiter from "./resgiter";

export default function LoginAndResigter() {
  return (
    <Dialog>
      <DialogTrigger>Đăng nhập</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <Tabs defaultValue="login" className="w-full">
              <TabsList>
                <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                <TabsTrigger value="signup">Đăng ký</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Login />
              </TabsContent>
              <TabsContent value="signup">
                <Resgiter />
              </TabsContent>
            </Tabs>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
