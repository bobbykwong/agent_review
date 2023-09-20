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
    <div className="flex flex-col items-start gap-2 text-secondary w-fit">
      <p>{id}</p>
      <p>{description}</p>
      <p>{date}</p>
      <p>{title}</p>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
  