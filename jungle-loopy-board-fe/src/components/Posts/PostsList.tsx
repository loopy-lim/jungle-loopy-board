import { RoutesLink } from "@/components/Link";
import { Button } from "@/components/ui/button";
import { useGetAllPostsQuery } from "@/hooks/react-query/usePostQuery";
import { useGetUserInfoQuery } from "@/hooks/react-query/useUserQuery";
import { unixtimeConvertorToKorean } from "@/lib/convertor";
import { generatePaginationIndexs } from "@/lib/generator";
import { cn } from "@/lib/utils";
import { Link, useSearchParams } from "react-router-dom";

const currentTime = new Date().getTime();

const PostsList = () => {
  const [searchParams, _] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const {
    data: { posts, meta },
  } = useGetAllPostsQuery({ page: +page, take: 10 });
  const { data: user } = useGetUserInfoQuery();

  return (
    <div className="m-auto max-w-[1200px] p-12 text-blue-950">
      <div className="flex justify-end py-2">
        {!!user && !!user.email && (
          <Button asChild>
            <RoutesLink to="/posts/create">New Post</RoutesLink>
          </Button>
        )}
      </div>
      <div className="divide-y-2">
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
              <div className="flex gap-2">
                {post.created_at.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                <span>
                  (
                  {unixtimeConvertorToKorean(
                    currentTime - post.created_at.getTime(),
                  )}
                  )
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="float-right flex">
        {generatePaginationIndexs(+page, meta.last_page).map((p) => (
          <Link
            key={p}
            to={`/?${new URLSearchParams({ page: `${p}` }).toString()}`}
            className="w-6 text-center"
          >
            <div
              className={cn("text-xl", p === +page ? "black" : "text-gray-400")}
            >
              {p}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const PostsSkeleton = () => {
  return (
    <div className="m-auto max-w-[1200px] p-12 text-blue-950">
      <div className="divide-y-2">
        <div className="flex items-center justify-between bg-blue-50 px-6 py-2 text-xl font-bold uppercase">
          <div>title</div>
          <div className="text-right text-base">
            <div>writer</div>
            <div>create date</div>
          </div>
        </div>
        {Array.from({ length: 10 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-6 py-4 hover:bg-slate-100"
          >
            <div className="h-8 w-[30rem] animate-pulse rounded-full bg-slate-300 text-2xl font-bold capitalize"></div>
            <div className="flex flex-col items-end gap-2">
              <div className="h-4 w-[12rem] animate-pulse rounded-full bg-slate-300"></div>
              <div className="h-4 w-[24rem] animate-pulse rounded-full bg-slate-300"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;
