import { useRouter } from "next/router";
import fs from "fs"
import matter from "gray-matter";
import ReactMarkdown from 'react-markdown';

import { Spinner } from "@/components/spinner";
import { Blog } from "@/components/blog";
import { PageLayout } from "@/components/layout";
import { getSortedPostsData } from '@/utils/posts';
import { id } from "date-fns/locale";

interface PostData {
    id: string
    date: string
    title: string
    content: string
}

interface PageProps{
    allPostsData: PostData[];
}


export async function getStaticPaths() {
    const allPostsData = getSortedPostsData();
    // const files = fs.readdirSync('posts');
    
    const paths = allPostsData.map( (postData)  => (
        {
            params: {
                slug: postData.id
            }
        }
    ))
  
    return {
      paths,
      fallback: false,
    };
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
      props: {
        allPostsData,
      },
    };
}

export default function Page({allPostsData}: PageProps) {
  const router = useRouter();
  
  // Declaring a variable with curly braces obtains the key of the object.
  // In this case, router = {"query": {"a" : "b"}, "c" : {"d" : "e"}}
  // so query = {"a" : "b"}
  let { query } = router;

  return (
    <div className="bg-gray-100">
      <PageLayout>
        {allPostsData.map(( postData ) => 
            postData.id === router.query.slug ? <Blog blogData={postData}/> : null         
        )}
      </PageLayout>
    </div>
  );
}
