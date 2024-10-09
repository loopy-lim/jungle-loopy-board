import { useGetPostQuery } from "@/hooks/react-query/usePostQuery";
import { useRandomImageQuery } from "@/hooks/react-query/useRandomImageQuery";

interface PostProps {
  id: number;
}

const Post = ({ id }: PostProps) => {
  const { data: post } = useGetPostQuery({ id });
  const { data: randomImage } = useRandomImageQuery();

  return (
    <div className="relative">
      <div className="fixed top-0 -z-50 h-full w-full text-white">
        <img
          src={randomImage}
          alt="random"
          className="h-full w-full object-cover brightness-75 filter"
        />
        <h1 className="absolute h-full w-full -translate-y-1/2 transform text-center text-8xl font-bold capitalize">
          {post.title}
        </h1>
        <div className="absolute bottom-12 right-12 text-right">
          <div className="text-2xl">{post.user.name}</div>
          <div className="text-xl">
            {`${post.updated_at.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}`}
          </div>
        </div>
      </div>
      <div className="h-screen"></div>
      <div className="min-h-screen bg-white">
        <div className="h-24"></div>
        {post.content}
      </div>
    </div>
  );
};

export default Post;
