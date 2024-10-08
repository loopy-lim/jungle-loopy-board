import ErrorBoundary from "@/components/common/ErrorBundray";
import GlobalNavBar from "@/components/GNB";
import { Introdunction } from "@/components/Intro";
import { Posts } from "@/components/Posts";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <GlobalNavBar />
        </Suspense>
        <Introdunction />
        <Suspense fallback={<div>Loading...</div>}>
          <Posts />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default HomePage;
