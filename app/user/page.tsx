"use client";

import { db, auth } from "@/lib/firebase/init";
import { getDocs, collection, orderBy, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

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
        <h1>Continue editing your CV</h1>
        {orders && (
          <div className="grid grid-cols-2 mt-10 gap-4">
            {orders.map((order: any) => (
              <Link
                key={order.id}
                href={`/user/edit/${order.id}`}
                className="h-72 border rounded-xl p-5 cursor-pointer"
              >
                <h1>{order.templateName}</h1>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
