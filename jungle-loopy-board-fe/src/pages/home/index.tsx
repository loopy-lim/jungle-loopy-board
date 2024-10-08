import ErrorBoundary from "@/components/common/ErrorBundray";
import GlobalNavBar from "@/components/GNB";
import { Introdunction } from "@/components/Intro";
import { Posts } from "@/components/Posts";
import { PostsSkeleton } from "@/components/Posts/posts";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense>
          <GlobalNavBar />
        </Suspense>
        <Introdunction />
        <Suspense fallback={<PostsSkeleton />}>
          <Posts />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default HomePage;
