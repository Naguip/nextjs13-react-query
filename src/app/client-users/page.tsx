import ListRandomAPI from "./users-api";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      {/* <Suspense
        fallback={
          <p style={{ textAlign: "center" }}>loading... on initial request</p>
        }
      > */}
      <ListRandomAPI />
      {/* </Suspense> */}
    </main>
  );
}
