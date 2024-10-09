import ErrorBoundary from "@/components/common/ErrorBundray";
import GlobalNavBar from "@/components/GNB";
import Post from "@/components/Posts/Post";
import { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id || isNaN(Number(id)) || Number(id) < 1) {
    alert("잘못된 접근입니다.");
    navigate("/");
  }

  return (
    <>
      <ErrorBoundary>
        <Suspense>
          <GlobalNavBar />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense>
          <Post id={Number(id)} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default PostsPage;
