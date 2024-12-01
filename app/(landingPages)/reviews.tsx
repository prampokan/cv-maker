"use client";

import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import { db } from "@/lib/firebase/init";
import { getDocs, collection, query } from "firebase/firestore";
import { useState, useEffect } from "react";

export function Reviews() {
  const [reviews, setReviews] = useState<any>([]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      const q = query(collection(db, "reviews"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(data);
      console.log(data);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };
  return (
    <div className="w-full flex justify-center pt-20 pb-32">
      <div className="w-full 2xl:w-[95rem]">
        <h1 className="uppercase text-sm font-semibold text-zinc-500 tracking-[3px] text-center mb-5">
          Real Stories from People Who Landed Their Dream Jobs
        </h1>
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {reviews.map((review: any, i: any) => (
              <figure
                className={cn(
                  "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                  // light styles
                  "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                  // dark styles
                  "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
                )}
                key={i}
              >
                <div className="flex flex-row items-center gap-2">
                  <img
                    className="rounded-full"
                    width="32"
                    height="32"
                    alt=""
                    src={review.profile_photo}
                  />
                  <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                      {review.name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">
                      {review.email}
                    </p>
                  </div>
                </div>
                <blockquote className="mt-2 text-sm">
                  {"⭐".repeat(review.stars)}
                </blockquote>
                <blockquote className="mt-2 text-sm">
                  {review.review}
                </blockquote>
              </figure>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {reviews.map((review: any, i: any) => (
              <figure
                className={cn(
                  "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                  // light styles
                  "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                  // dark styles
                  "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
                )}
                key={i}
              >
                <div className="flex flex-row items-center gap-2">
                  <img
                    className="rounded-full"
                    width="32"
                    height="32"
                    alt=""
                    src={review.profile_photo}
                  />
                  <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                      {review.name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">
                      {review.email}
                    </p>
                  </div>
                </div>
                <blockquote className="mt-2 text-sm">
                  {"⭐".repeat(review.stars)}
                </blockquote>
                <blockquote className="mt-2 text-sm">
                  {review.review}
                </blockquote>
              </figure>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
      </div>
    </div>
  );
}
