"use client";

import { auth } from "@/lib/firebase/init";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  ChevronsUpDown,
  UserRoundPen,
  LogOut,
  LogIn,
  FileUser,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Navbar() {
  const [user, loading, error] = useAuthState(auth);
  const googleAuth = new GoogleAuthProvider();

  const SignIn = async () => {
    await signInWithPopup(auth, googleAuth);
  };
  return (
    <nav className="w-full flex justify-center items-center h-20 border-b bg-white/70 backdrop-blur fixed px-5 2xl:px-0 z-50">
      <div className="w-[90rem] flex justify-between items-center">
        <div>
          <h1 className="font-semibold tracking-tight text-zinc-800 flex gap-2">
            cv maker indo.
          </h1>
        </div>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center cursor-pointer bg-zinc-50 hover:bg-zinc-100 transition-all border p-2 rounded-md gap-2">
                <Image
                  src={user.photoURL || "/shadcn.jpg"}
                  alt="shadcn"
                  width={35}
                  height={35}
                  className="rounded-lg"
                />
                <div>
                  <h1 className="font-semibold text-sm tracking-tight">
                    {user.displayName}
                  </h1>
                  <p className="text-xs">{user.email}</p>
                </div>
                <ChevronsUpDown className="ml-3" size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="p-0 min-w-64"
              side="right"
              align="start"
            >
              <DropdownMenuItem className="m-1.5">
                <Image
                  src={user.photoURL || "/shadcn.jpg"}
                  alt="shadcn"
                  width={35}
                  height={35}
                  className="rounded-lg"
                />
                <div>
                  <h1 className="font-semibold tracking-tight">
                    {user.displayName}
                  </h1>
                  <p className="text-xs">{user.email}</p>
                </div>
              </DropdownMenuItem>
              <Separator />
              <Link href={"/user"}>
                <DropdownMenuItem className="m-1.5">
                  <UserRoundPen />
                  <span>My CV✨</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="m-1.5"
                onClick={() => auth.signOut()}
              >
                <LogOut />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : loading ? (
          <div className="flex items-center bg-zinc-50 transition-all border p-2 rounded-md gap-2 h-[53px] w-52 animate-pulse">
            <div className="h-8 w-8 bg-zinc-200 rounded-lg"></div>
            <div className="flex flex-col gap-2">
              <div className="w-24 h-3 bg-zinc-200 rounded-lg"></div>
              <div className="w-32 h-2 bg-zinc-200 rounded-lg"></div>
            </div>
          </div>
        ) : (
          <Button className="font-bold" variant="outline" onClick={SignIn}>
            <LogIn />
            Sign in to make CV
          </Button>
        )}
      </div>
    </nav>
  );
}
