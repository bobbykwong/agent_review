import Head from "next/head";

import { Salespersons } from "@/features/salespersons";
import { HorizontalLayout, PageLayout } from "@/components/layout";
import { getSortedPostsData } from '@/utils/posts';

interface PostData {
    id: string
    description: string
    date: string
    title: string
}

interface HomeProps{
    allPostsData: PostData[];
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}


export default function Home({ allPostsData }: HomeProps ) {
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
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <div className="grid grid-cols-1 gap-6">
                {allPostsData.map(({ id, description, date, title }: PostData) => (
                    <div key={id} className="bg-white rounded-lg shadow-md p-4">
                        <a href={`/blog/${id}`}>
                            <h3 className="text-xl font-semibold mb-2 hover:text-teal-400">{title}</h3>
                        </a>
                        <p>{description}</p>
                        <p className="text-gray-600">{date}</p>
                    </div>
                ))}
            </div>
        </PageLayout>
      </div>
    </>
  );
}
