import ErrorBoundary from "@/components/common/ErrorBundray";
import GlobalNavBar from "@/components/GNB";
import { Introdunction } from "@/components/Intro";
import { PostsList } from "@/components/Posts";
import { PostsSkeleton } from "@/components/Posts/PostsList";
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
          <PostsList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default HomePage;
