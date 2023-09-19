import Head from "next/head";

import { Salespersons } from "@/features/salespersons";
import { HorizontalLayout, PageLayout } from "@/components/layout";
import { getSortedPostsData } from '../../utils/posts';

interface allPostsData {
    id: string
    date: string
    title: string
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData } ) {
  return (
    <>
      <Head>
        <title>Better Agents</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Find the perfect property agent in Singapore with our app. Use real transaction data and agent expertise to make an informed decision. Say goodbye to biased advertising and hello to reliable recommendations."
        />
        <link rel="icon" href="/favicon_ver_1.png" />
      </Head>
      <div className="bg-gray-100">
        <PageLayout>
            <section>
                <h2>Blog</h2>
                <ul>
                {allPostsData.map(({ id, date, title }: allPostsData) => (
                    <li key={id}>
                    {title}
                    <br />
                    {id}
                    <br />
                    {date}
                    </li>
                ))}
                </ul>
            </section>
        </PageLayout>
      </div>
    </>
  );
}
