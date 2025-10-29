import { Suspense } from "react";
import PractitionersPage from "./PractitionersPageContent";

export default function PractitionersPageWrapper() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading practitioners...</div>}>
      <PractitionersPage />
    </Suspense>
  );
}