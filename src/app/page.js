import { Suspense } from "react";
import ProductFeed from "@components/ProductFeed";

export default function Home() {
  return (
    <main className="h-auto min-h-screen text-rhapsodyInBlue">
      <Suspense fallback={<p>Loading feed...</p>}>
        <ProductFeed />
      </Suspense>
    </main>
  );
}
