import Head from "next/head";

import { HorizontalLayout, PageLayout } from "@/components/layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Better Agents</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Find the perfect property agent in Singapore with our app. Use real transaction data and agent expertise to make an informed decision. Say goodbye to biased advertising and hello to reliable recommendations."
        />
        <link rel="icon" href="/graphics/hut.svg" />
      </Head>
      <div className="bg-gray-100">
        <PageLayout>
          <div className="py-12">
            <h1 className="text-5xl font-semibold">
             Reviews Policy
            </h1>
          </div>
          <div className="py-12">
              <h2 className="text-3xl font-medium py-4">
                Who can leave a review?
              </h2>
              <p className="mt-2 text-gray-500 tracking-wider text-lg max-w-screen-tablet text-justify">
                Anyone who has had an interaction with the agent in their capacity as an agent can create an account and leave a review. We think that every part of the experience with an agent is important for helping decide which agent to work with. This also ensures that agents cannot pre-screen who gets to leave a review or moderate the review itself. 
                <br></br>
                <br></br>
                Agents can invite clients to leave a review but are not allowed to provide an incentive or payment for clients to do so.
                <br></br>
                <br></br>
                People who have not had a genuine interaction with the agent in their capacity or service as an agent are not allowed to leave a review. 
              </p>  
          </div>
          <div className="py-12">
              <h2 className="text-3xl font-medium py-4">
                How we combat fake reviews
              </h2>
              <p className="mt-2 text-gray-500 tracking-wider text-lg max-w-screen-tablet text-justify">
                When we suspect that a review might be fake, we will ask for proof of interaction from the reviewer via the email provided during sign up. 
                <br></br>
                <br></br>
                Some things that serve as proof of interaction can be but are not limited to transaction records with names, text messages arranging appointments, email correspondence etc. Please be advised that we may request proof of an interaction, and failure to provide these records could lead to the removal of a review.
              </p>  
          </div>
          <div className="py-12">
              <h2 className="text-3xl font-medium py-4">
                When is a review taken down?
              </h2>
              <p className="mt-2 text-gray-500 tracking-wider text-lg max-w-screen-tablet text-justify">
                Agents are not allowed to delete reviews, they are only allowed to flag a review if there is doubt on whether the reviewer had an actual interaction with the agent. An agent cannot flag a review simply because a review is negative or unfavourable to them. 
                <br></br>
                <br></br>
                When a review has been flagged, we will investigate the review. If it is found to have flout the guidelines for reviews, the review will be taken down.          
              </p>  
          </div>
          <div className="py-12">
              <h2 className="text-3xl font-medium py-4">
                General review guidelines
              </h2>
              <p className="mt-2 text-gray-500 tracking-wider text-lg max-w-screen-tablet text-justify">
              Whatever the experience between client and agent, a review should always be respectful to the agent involved. Do not write reviews that are harmful, hateful, discriminatory, defamatory or obscene. 
              <br></br>
              <br></br>
              Do not make up an interaction or write a review for someone else.      
              </p>  
          </div>
        </PageLayout>
      </div>
    </>
  );
}