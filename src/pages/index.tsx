import _ from "lodash";
import clsx from "clsx";
import { differenceInMonths } from "date-fns";
import Link from "next/link";
import { ReactElement } from "react";

import { HorizontalLayout } from "@/components/layout";
import { Rating } from "@/components/rating";
import { Salesperson } from "@/features/salespersons";

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
          <p className="mt-8 text-gray-300 text-lg">
            Find agents based on their experience, transaction history, and
            reviews from other users.
          </p>
          <div className="py-8">
            <Rating value={5} size="lg" readOnly />
          </div>
        </div>
      }
      secondaryComponent={
        <div>
          <div className="flex-1 flex flex-col tablet:flex-row items-center tablet:items-start justify-center gap-4 tablet:gap-8">
            <Link
              href="/salespersons"
              className="block px-8 py-4 bg-teal-400 text-white rounded-full font-semibold hover:opacity-90 text-lg"
            >
              Find Agent
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
        <div className="flex flex-col justify-center h-full">
          <h2 className="text-3xl font-bold">
            Filter profiles by metrics that matter to you
          </h2>
          <p className="mt-2 text-gray-500 tracking-wider text-lg">
            {`No more sifting through irrelevant ads or flashy photos. Choose agents based on skills and competencies that are essential for a successful partnership. `}
          </p>
        </div>
      }
      secondaryComponent={
        <div className="flex gap-4 flex-wrap">
          {dummyProfiles.map((salesperson) => (
            <div
              key={salesperson.id}
              className="flex-1 max-h-[250px] min-w-[350px] bg-gray-100 rounded-xl p-4 shadow"
            >
              <div className="flex gap-6 h-full">
                <img
                  src={salesperson.photoURL}
                  className="h-full w-2/5 object-cover rounded-xl"
                  alt="salesperson"
                />
                <div className="truncate relative">
                  <p className="font-medium text-lg truncate">
                    {salesperson.name}
                  </p>
                  <p className="text-gray-500">{salesperson.registrationNum}</p>
                  <div className="mt-4 text-gray-500 truncate">
                    <p className="truncate">{salesperson.estateAgentName}</p>
                    <p>{`Experience - ${Math.ceil(
                      differenceInMonths(
                        new Date(),
                        new Date(salesperson.registrationStartDate)
                      ) / 12
                    )}Y`}</p>
                    <br />
                    <div className="absolute bottom-0">
                      <Rating
                        value={salesperson.rating || 0}
                        size="sm"
                        readOnly
                      />
                      <p>10 reviews</p>
                    </div>
                  </div>
                </div>
              </div>
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
        <div className="flex flex-col justify-center h-full">
          <h2 className="text-3xl font-bold">Share your experience</h2>
          <p className="mt-2 text-gray-500 tracking-wider text-lg">
            {`We believe that every user's experience is important and can help
               others make informed decisions. Leaving a review is quick and
               easy, and it makes a big difference to us and our community.`}{" "}
          </p>
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
        <div className="flex flex-col justify-center h-full">
          <h2 className="text-3xl font-bold">
            Commitment to remain fair and trustworthy
          </h2>
          <p className="mt-2 text-gray-500 tracking-wider text-lg">
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

const dummyProfiles: Salesperson[] = [
  {
    id: "profile-1",
    name: "Thomas Tan",
    photoURL:
      "https://images.unsplash.com/photo-1629272039203-7d76fdaf1324?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
    rating: 5,
    registrationNum: "R123456A",
    registrationStartDate: "2015-01-22T00:00:00.000Z",
    registrationEndDate: "2023-12-31T00:00:00.000Z",
    estateAgentName: "SG Realtors",
    estateAgentLicenseNum: "dummy",
  },
  {
    id: "profile-2",
    name: "Karen Koh",
    photoURL:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80",
    rating: 5,
    registrationNum: "R654321B",
    registrationStartDate: "2018-01-22T00:00:00.000Z",
    registrationEndDate: "2023-12-31T00:00:00.000Z",
    estateAgentName: "PropSG",
    estateAgentLicenseNum: "dummy",
  },
];
