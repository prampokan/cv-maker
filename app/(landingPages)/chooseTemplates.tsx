"use client";

import { auth } from "@/lib/firebase/init";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ChooseTemplates() {
  const googleAuth = new GoogleAuthProvider();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  const ChooseTemplate = async () => {
    if (!user) {
      await signInWithPopup(auth, googleAuth);
    }
    router.push("/user/edit");
  };

  return (
    <div className="w-full flex justify-center h-screen py-20">
      <div className="w-[70rem] h-full">
        <h1 className="text-5xl font-bold tracking-tighter text-zinc-900 text-center">
          Choose our templates
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-10">
          <div
            onClick={ChooseTemplate}
            className="border rounded-xl h-72 cursor-pointer p-5"
          >
            TEMPLATE 1
          </div>
          <div className="border rounded-xl h-72 cursor-pointer"></div>
          <div className="border rounded-xl h-72 cursor-pointer"></div>
        </div>
      </div>
    </div>
  );
}
