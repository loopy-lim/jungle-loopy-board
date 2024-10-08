import { useGetAllPostsQuery } from "@/hooks/react-query/usePostQuery";
import { Link, useSearchParams } from "react-router-dom";

const Posts = () => {
  const [searchParams, _] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const {
    data: { posts },
  } = useGetAllPostsQuery({ page: +page, take: 10 });

  return (
    <div className="m-auto max-w-[1200px] divide-y-2 p-12 text-blue-950">
      <div className="flex items-center justify-between bg-blue-50 px-6 py-2 text-xl font-bold uppercase">
        <div>title</div>
        <div className="text-right text-base">
          <div>writer</div>
          <div>create date</div>
        </div>
      </div>
      {posts.map((post) => (
        <Link
          to={`/posts/${post.id}`}
          key={post.id}
          className="flex items-center justify-between px-6 py-4 hover:bg-slate-100"
        >
          <div className="text-2xl font-bold capitalize">{post.title}</div>
          <div className="flex flex-col items-end gap-2">
            <div>{post.user.name}</div>
            <div>
              {post.created_at.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Posts;
