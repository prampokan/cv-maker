"use client";

import { db, auth } from "@/lib/firebase/init";
import {
  getDocs,
  collection,
  orderBy,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Page() {
  const [orders, setOrders] = useState<any>([]);
  const googleAuth = new GoogleAuthProvider();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      getOrdersByUid();
    }
  }, [user]);

  const getOrdersByUid = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "orders"),
        where("uid", "==", user?.uid),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(data);
    } catch (error) {
      console.error("Error getting documents: ", error);
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="w-full flex justify-center py-32 px-5 xl:px-0">
      <div className="w-[50rem]">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tighter text-zinc-600">
          Welcome, {user?.displayName}🤗
        </h1>
        <p className="w-full sm:w-[40rem] text-base sm:text-lg my-3 text-zinc-500 leading-relaxed">
          This is your playground where you can edit and modify your CV.
        </p>
        <Drawer>
          <DrawerTrigger asChild className="mt-5">
            <Button variant="outline">
              <CirclePlus />
              Make New CV
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-center">
                Choose your template
              </DrawerTitle>
              <DrawerDescription className="text-center">
                Choose your template.
              </DrawerDescription>
            </DrawerHeader>
            <div
              className="flex justify-center gap-4"
              onClick={() => ChooseTemplate("Template 1")}
            >
              <div className="h-auto w-auto overflow-hidden cursor-pointer transition-all relative flex justify-center items-center group border">
                <Image
                  src="/template1.png"
                  alt="template1"
                  width={300}
                  height={300}
                  className="transition-opacity duration-300 group-hover:opacity-70"
                />
                <Button className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Use this template
                </Button>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        {orders && (
          <div className="grid grid-cols-2 mt-10 gap-4">
            {orders.map((order: any) => (
              <Link
                key={order.id}
                href={`/user/edit/${order.id}`}
                className="border h-full w-full cursor-pointer hover:shadow-xl transition-all relative flex justify-center items-center group"
              >
                <h1 className="absolute -top-2 -right-2 py-2 px-3 z-10 rounded-full bg-red-500 text-white font-semibold text-xs shadow-xl">
                  {order.templateName}
                </h1>
                <Image
                  src="/template1.png"
                  alt="template1"
                  width={500}
                  height={500}
                  className="transition-opacity group-hover:opacity-70"
                />
                <Button className="absolute opacity-0 group-hover:opacity-100 transition-opacity">
                  Continue edit
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
