"use client";

import { db, auth } from "@/lib/firebase/init";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FilePlus2 } from "lucide-react";

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
        const token = await userData.getIdToken();
        document.cookie = `token=${token}; path=/; secure; samesite=strict`;
      }

      if (!userData) {
        console.error("User data not found");
        return;
      }

      const orderData = await addDoc(collection(db, "orders"), {
        uid: userData.uid,
        templateName: templateName,
        content: {
          name: user?.displayName,
          jobField: "",
          phone: "",
          email: user?.email,
          linkedin: "",
          website: "",
          address: "",
          about: "",
          education: [
            {
              university: "",
              degree: "",
              location: "",
              gpa: "",
              start: "",
              end: "",
              description: "",
            },
          ],
          workExperience: [
            {
              company: "",
              jobField: "",
              location: "",
              start: "",
              end: "",
              description: "",
            },
          ],
          relatedExperience: [
            {
              company: "",
              field: "",
              location: "",
              start: "",
              end: "",
              description: "",
            },
          ],
          certification: [{ certificate: "" }],
          award: [{ award: "" }],
          skills: [{ skill: "", detail: "" }],
        },
        createdAt: new Date(),
      });

      router.push(`/user/edit/${orderData.id}`);
    } catch (error) {
      console.error("Error choosing template:", error);
    }
  };

  return (
    <div
      className="w-full flex justify-center py-32 px-5 xl:px-0"
      id="templates"
    >
      <div className="w-[70rem] h-full">
        <h1 className="font-noto text-2xl font-bold text-zinc-600 mb-20 text-center">
          ✨Choose Your Template
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 mt-5">
          <div
            onClick={() => ChooseTemplate("Template 1")}
            className="border h-full w-full rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all relative flex justify-center items-center group"
          >
            <Image
              src="/template1.png"
              alt="template1"
              width={500}
              height={500}
              className="transition-opacity duration-300 group-hover:opacity-70"
            />
            <Button className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FilePlus2 />
              Use this template
            </Button>
          </div>
          <div className=" h-full rounded-lg flex justify-center items-center font-medium text-zinc-500 font-[family-name:var(--font-geist-mono)]">
            More to come...
          </div>
        </div>
      </div>
    </div>
  );
}
