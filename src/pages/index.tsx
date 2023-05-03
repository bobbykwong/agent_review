import _ from "lodash";
import clsx from "clsx";
import Link from "next/link";
import { ReactElement } from "react";

import { HorizontalLayout } from "@/components/layout";
import { Star } from "@/components/star";

export default function Page() {
  return (
    <div>
      <Banner />
      <Read />
      <Write />
      <Commitment />
    </div>
  );
}

interface ContainerProps {
  primaryComponent: ReactElement;
  secondaryComponent: ReactElement;
  primaryComponentDir: "left" | "right";
  className?: string;
}

function Container({
  primaryComponent,
  secondaryComponent,
  primaryComponentDir,
  className,
}: ContainerProps) {
  return (
    <div className={clsx("py-12 tablet:py-24", className)}>
      <HorizontalLayout>
        <div
          className={clsx(
            "flex flex-col gap-12",
            {
              "laptop:flex-row": primaryComponentDir === "left",
            },
            { "laptop:flex-row-reverse": primaryComponentDir === "right" }
          )}
        >
          <div className="flex-1">{primaryComponent}</div>
          <div className="flex-1">{secondaryComponent}</div>
        </div>
      </HorizontalLayout>
    </div>
  );
}

function Banner() {
  return (
    <Container
      className="bg-slate-800 text-white"
      primaryComponent={
        <div className="flex-1 max-w-[700px]">
          <h1 className="text-5xl font-semibold">
            Find the perfect real estate agent for you
          </h1>
          <p className="mt-8 text-gray-300">
            Find agents based on their experience, transaction history, and
            reviews from other users.
          </p>
          <div className="py-8">
            {_.range(5).map((i) => (
              <Star key={i} colored size="lg" />
            ))}
          </div>
        </div>
      }
      secondaryComponent={
        <div>
          <div className="flex-1 flex flex-col tablet:flex-row items-center tablet:items-start justify-center gap-4 tablet:gap-8">
            <Link
              href="/salespersons"
              className="block px-8 py-4 ring ring-teal-400 ring-inset text-white rounded-full font-semibold hover:bg-teal-400 duration-300"
            >
              View Profiles
            </Link>
            <Link
              href="/"
              className="block px-8 py-4 ring ring-teal-400 ring-inset text-white rounded-full font-semibold hover:bg-teal-400 duration-300"
            >
              Write Review
            </Link>
          </div>
        </div>
      }
      primaryComponentDir="left"
    />
  );
}

function Read() {
  return (
    <Container
      primaryComponent={
        <div className="flex-1 flex justify-center">
          <div>
            <h2 className="text-3xl font-semibold">
              Filter profiles by metrics that matter to you
            </h2>
            <p className="mt-2 text-gray-400 tracking-wide">
              {`No more sifting through irrelevant ads or flashy photos. Choose agents based on skills and competencies that are essential for a successful partnership. `}
            </p>
            <div className="mt-4 flex justify-center laptop:justify-start">
              <Link
                href="/salespersons"
                className="block px-8 py-4 bg-teal-400 text-white rounded-full font-semibold"
              >
                View Profiles
              </Link>
            </div>
          </div>
        </div>
      }
      secondaryComponent={
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8">
          {_.range(4).map((i) => (
            <div
              key={i}
              className="bg-gray-100 h-[240px] rounded-xl p-8 shadow"
            >
              <p className="font-bold text-xl">Name</p>
              <p className="">Estate Agent Name</p>
            </div>
          ))}
        </div>
      }
      primaryComponentDir="right"
    />
  );
}

function Write() {
  return (
    <Container
      className="bg-slate-50"
      primaryComponent={
        <div>
          <h2 className="text-3xl font-semibold">Share your experience</h2>
          <p className="mt-2 text-gray-500 tracking-wide">
            {`We believe that every user's experience is important and can help
               others make informed decisions. Leaving a review is quick and
               easy, and it makes a big difference to us and our community.`}{" "}
          </p>
          <div className="mt-8 w-fit">
            <Link
              href="/"
              className="block px-8 py-4 bg-teal-400 text-white rounded-full font-semibold"
            >
              Write Review
            </Link>
          </div>
        </div>
      }
      secondaryComponent={
        <div className="flex justify-center items-center">
          <img
            className="h-[300px] tablet:h-[400px] object-cover rounded"
            src="https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80"
          />
        </div>
      }
      primaryComponentDir="left"
    />
  );
}

function Commitment() {
  return (
    <Container
      primaryComponent={
        <div>
          <h2 className="text-3xl font-semibold">
            Commitment to remain fair and trustworthy
          </h2>
          <p className="mt-2 text-gray-400 tracking-wide">
            {`We take our commitment to being fair and trustworthy very seriously. As an independent review platform, we have no affiliation with any property agencies, which means we can remain impartial and unbiased. Our review system is designed to show all reviews, whether positive or negative, and we're constantly working to improve it to combat fake reviews.`}
          </p>
        </div>
      }
      secondaryComponent={
        <div className="flex justify-center items-center">
          <img
            className="h-[300px] tablet:h-[400px] object-cover rounded"
            src="https://images.unsplash.com/photo-1523586797235-580376c5d862?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1037&q=80"
          />
        </div>
      }
      primaryComponentDir="right"
    />
  );
}
