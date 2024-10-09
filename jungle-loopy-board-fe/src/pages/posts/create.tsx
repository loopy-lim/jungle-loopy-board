import ErrorBoundary from "@/components/common/ErrorBundray";
import GlobalNavBar from "@/components/GNB";
import { PostCreate } from "@/components/Posts";
import { Suspense } from "react";

const PostCreatePage = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense>
          <GlobalNavBar />
        </Suspense>
      </ErrorBoundary>
      <div className="m-auto max-w-[1280px] px-12">
        <PostCreate />
      </div>
    </>
  );
};

export default PostCreatePage;
