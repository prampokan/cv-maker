"use client";

import { db, auth } from "@/lib/firebase/init";
import { getDocs, collection, orderBy, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [orders, setOrders] = useState<any>([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      getOrdersByUid();
    }
  }, [user]);

  const getOrdersByUid = async () => {
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
    }
  };

  return (
    <div className="w-full flex justify-center py-32">
      <div className="w-[50rem]">
        <h1 className="text-4xl font-bold tracking-tighter text-center bg-gradient-to-l from-zinc-900 to-zinc-400 bg-clip-text text-transparent">
          Continue editing your CV
        </h1>
        {orders && (
          <div className="grid grid-cols-2 mt-16 gap-4">
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
