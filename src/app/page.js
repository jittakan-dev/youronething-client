import { Suspense } from "react";
import ProductFeed from "@components/ProductFeed";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<p>Loading feed...</p>}>
        <ProductFeed />
      </Suspense>
    </main>
  );
}
