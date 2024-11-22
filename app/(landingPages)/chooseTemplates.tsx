"use client";

import { db, auth } from "@/lib/firebase/init";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ChooseTemplates() {
  const googleAuth = new GoogleAuthProvider();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  const ChooseTemplate = async (templateName: string) => {
    try {
      let userData = user;

      if (!user) {
        const userCredential = await signInWithPopup(auth, googleAuth);
        userData = userCredential.user;
      }

      if (!userData) {
        console.error("User data not found");
        return;
      }

      const orderData = await addDoc(collection(db, "orders"), {
        uid: userData.uid,
        templateName: templateName,
        content: {
          name: "",
          jobField: "",
          phone: "",
          email: "",
          linkedin: "",
          website: "",
          address: "",
          about: "",
          education: [{ name: "", description: "" }],
          workExperience: [{ name: "", description: "" }],
          relatedExperience: [{ name: "", description: "" }],
          certification: [{ name: "", description: "" }],
          award: [{ name: "", description: "" }],
          skills: [{ name: "", description: "" }],
        },
        createdAt: new Date(),
      });

      router.push(`/user/edit/${orderData.id}`);
    } catch (error) {
      console.error("Error choosing template:", error);
    }
  };

  return (
    <div className="w-full flex justify-center h-screen py-32">
      <div className="w-[70rem] h-full">
        <h1 className="text-4xl font-bold tracking-tighter text-center bg-gradient-to-l from-zinc-900 to-zinc-400 bg-clip-text text-transparent">
          Choose Your Template
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-10">
          <div
            onClick={() => ChooseTemplate("Template 1")}
            className="border h-full w-full cursor-pointer hover:shadow-xl transition-all relative flex justify-center items-center group"
          >
            <Image
              src="/template1.png"
              alt="template1"
              width={500}
              height={500}
              className="transition-opacity duration-300 group-hover:opacity-70"
            />
            <Button className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Use this template
            </Button>
          </div>
          <div className="border h-full flex justify-center items-center font-medium text-zinc-500 font-mono">
            More to come...
          </div>
        </div>
      </div>
    </div>
  );
}
