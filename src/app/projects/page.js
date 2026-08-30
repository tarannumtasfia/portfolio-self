import { Suspense } from "react";
import ProjectsGrid from "./ProjectsGrid";

export default function ProjectsPage() {
  return (
    <Suspense fallback={null}>
      <ProjectsGrid />
    </Suspense>
  );
}
