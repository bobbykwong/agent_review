import Head from "next/head";
import Link from "next/link";
import Script from 'next/script'

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
      {/* Google tag (gtag.js) */}
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}></Script>
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `
        }
      </Script>
      <div className="max-w-screen-md mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-400 text-sm mb-2">{date}</p>
        
        <div className="prose my-8">
          {/* Use the "prose" class for consistent typography and spacing */}
          <ReactMarkdown
            className="text-lg"
            components={{
              // Define custom components for styling
              p: ({ children }) => <p className="mb-4">{children}</p>, // Adds spacing between paragraphs
              h2: ({ children }) => <h2 className="text-2xl font-bold mb-3 mt-10">{children}</h2>, // Style for h2
              h3: ({ children }) => <h3 className="text-xl font-bold mb-2">{children}</h3>, // Style for h3
              a: ({ href, children }) => (
                <a href={href} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ), // Style for links
              img: ({src, children}) => (
                <img src={src} className="mb-10">
                  {children}
                </img>
              )
            }}
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
  