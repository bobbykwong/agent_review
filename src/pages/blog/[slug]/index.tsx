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

// export async function getStaticProps() {
//     const allPostsData = getSortedPostsData();
//     const slug = params.slug;
//     const markdownWithMetadata = fs.readFileSync(`posts/${slug}.md`, 'utf-8');
//     const { data, content } = matter(markdownWithMetadata);
  
//     return {
//       props: {
//         post: {
//           data,
//           content,
//         },
//       },
//     };
// }

export default function Page({allPostsData}: PageProps) {
  const router = useRouter();
  
  // Declaring a variable with curly braces obtains the key of the object.
  // In this case, router = {"query": {"a" : "b"}, "c" : {"d" : "e"}}
  // so query = {"a" : "b"}
  let { query } = router;

  return (
    <div className="bg-gray-100">
      <PageLayout>
        {/* <button onClick={handleBackClick}>Back</button> */}
        <p>Post: {router.query.slug}</p>
        {allPostsData.map((postData: PostData) => (
            <Blog blogData={postData} />
        ))}
      </PageLayout>
    </div>
  );
}
