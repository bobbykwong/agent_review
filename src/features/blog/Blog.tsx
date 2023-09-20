import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

interface PostData {
    id: string
    description: string
    date: string
    title: string
    content: string
}

interface BlogProps{
  blogData: PostData
}
  
export function Blog({ blogData }: BlogProps) {
  const {id, description, date, title, content} = blogData
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content={description}
        />
        <link rel="icon" href="/favicon_ver_1.png" />
      </Head>
      <div className="max-w-screen-md mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-400 text-sm mb-2">{date}</p>
        
        <div className="prose my-8">
          {/* Use the "prose" class for consistent typography and spacing */}
          <ReactMarkdown
            className="text-lg"
          >
            {content}
          </ReactMarkdown>
        </div>
        <div className="mt-4">
          <Link 
            href="/blog"
            className="text-teal-500 hover:underline"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    </>
  );
}
  