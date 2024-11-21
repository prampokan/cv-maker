"use client";

import { db, auth } from "@/lib/firebase/init";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

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
    <div className="w-full flex justify-center h-screen py-20">
      <div className="w-[70rem] h-full">
        <h1 className="text-5xl font-bold tracking-tighter text-zinc-900 text-center">
          Choose our templates
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-10">
          <div
            onClick={() => ChooseTemplate("Template 1")}
            className="border rounded-xl h-72 cursor-pointer p-5"
          >
            TEMPLATE 1
          </div>
          <div
            onClick={() => ChooseTemplate("Template 2")}
            className="border rounded-xl h-72 cursor-pointer p-5"
          >
            TEMPLATE 2
          </div>
          <div
            onClick={() => ChooseTemplate("Template 3")}
            className="border rounded-xl h-72 cursor-pointer p-5"
          >
            TEMPLATE 3
          </div>
        </div>
      </div>
    </div>
  );
}
