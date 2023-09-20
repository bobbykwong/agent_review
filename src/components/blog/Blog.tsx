import ReactMarkdown from 'react-markdown';

interface PostData {
    id: string
    date: string
    title: string
    content: string
}

interface BlogProps{
  blogData: PostData
}
  
export function Blog({ blogData }: BlogProps) {
  console.log(blogData)
  const {id, date, title, content} = blogData
  
  return (
    <div className="flex flex-col items-start gap-2 text-secondary w-fit">x
      <p>{id}</p>
      <p>{date}</p>
      <p>{title}</p>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
  