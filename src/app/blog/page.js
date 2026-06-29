import { Suspense } from "react";
import BlogGrid from "./BlogGrid";

export default function BlogPage() {
  return (
    <Suspense fallback={null}>
      <BlogGrid />
    </Suspense>
  );
}
