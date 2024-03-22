"use client";
import { IMenuItem } from "@/types/ui/index.types";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import SearchBox from "../searchBox";
import LoginAndResigter from "../loginAndResigter";
import Cart from "../Cart/Cart";

const NavBar = ({
  menuLaptop,
  menuMouse,
}: {
  menuLaptop: IMenuItem[];
  menuMouse: IMenuItem[];
}) => {
  const LoginElement = () => {
    if (typeof window !== "undefined") {
      const checkToken = Cookies?.get("userToken");
      const usernameLocal = localStorage?.getItem("userData") ?? "";
      const parseJson = JSON.parse(usernameLocal);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <span>
              {checkToken ? (
                <>
                  <DropdownMenuLabel>
                    Khách hàng : {parseJson.userName}
                  </DropdownMenuLabel>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      Cookies.remove("userToken");
                      window.location.reload();
                    }}
                  >
                    Đăng xuất
                  </DropdownMenuItem>
                </>
              ) : (
                <div className="text-center">
                  <LoginAndResigter />
                </div>
              )}
            </span>
            <DropdownMenuSeparator />
            {/* <Accordion type="single" collapsible>
              <AccordionItem value="item-2">
                <AccordionTrigger>Giao diện</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wap">
                    <RadioGroup defaultValue="option-one">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="option-one"
                          id="option-one"
                          onClick={() => setTheme("light")}
                        />
                        <Label htmlFor="option-one">Light mode</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="option-two"
                          id="option-two"
                          onClick={() => setTheme("dark")}
                        />
                        <Label htmlFor="option-two">Dark mode </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="option-three"
                          id="option-three"
                          onClick={() => setTheme("system")}
                        />
                        <Label htmlFor="option-three">System </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  };
  const menuMobile = () => (
    <Sheet>
      <SheetTrigger asChild>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 inline-block"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Laptop</AccordionTrigger>
            {menuLaptop?.map((laptop) => (
              <Link href={laptop.href} key={laptop.id}>
                <AccordionContent>{laptop.title}</AccordionContent>
              </Link>
            ))}
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Chuột</AccordionTrigger>
            {menuMouse?.map((mouse) => (
              <Link href={mouse.href} key={mouse.id}>
                <AccordionContent>{mouse.title}</AccordionContent>
              </Link>
            ))}
          </AccordionItem>
        </Accordion>
        <SheetFooter>
          <SheetClose asChild>
            <button type="submit">Save changes</button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
  return (
    <>
      <div className="flex justify-between items-center h-[50px] sm:h-[60px] ">
        <div className="w-[200px] flex justify-center items-center sm:w-[]">
          <div className=" ml-2">
            <h1>LaptopTC</h1>
          </div>
        </div>
        <div className="grow px-16 py-2 sm:hidden">
          <SearchBox />
        </div>
        <div className="w-[150px]">
          <div
            className="h-full w-full  text-center 
          "
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <div className="flex  items-center justify-around w-[200px]">
              {LoginElement()}
              <Cart />
            </div>
            <div className="hidden sm:block w-[50px]">{menuMobile()}</div>
          </div>
        </div>
      </div>
      <div className=" h-[40px] flex items-end sm:hidden">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Laptop</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-full grid gap-3 grid-cols-4 grid-rows-3 p-6 ">
                  <li className="row-span-2 col-span-2">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/product/laptop"
                      >
                        <Icons.logo className="h-6 w-6" />
                        <Link
                          href="product/laptop"
                          className="mb-2 mt-4 text-lg font-medium"
                        >
                          Laptop mới nhất
                        </Link>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Chuyên cung cấp các mặt hàng laptop văn
                          phòng,gaming,...
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {menuLaptop.map((menu) => (
                    <ListItem href={menu.href} title={menu.title} key={menu.id}>
                      {menu.models?.join(",")}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Chuột</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-full grid gap-3 grid-cols-3 grid-rows-3 p-6 ">
                  <li className="row-span-2 col-span-2">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/product/chuot"
                      >
                        <Icons.logo className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Chuột cao cấp
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Cung cấp các mặt hàng Chuột văn phòng,Chuột gaming,...
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {menuMouse.map((menu) => (
                    <ListItem href={menu.href} title={menu.title} key={menu.id}>
                      {menu.models?.join(",")}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
};

export default NavBar;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
