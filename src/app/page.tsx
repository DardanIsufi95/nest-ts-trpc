"use client";
import Link from "next/link";
import { api } from "~/trpc/react";
import styles from "./index.module.css";

export default  function Home() {
  // noStore();
  const {data , isLoading} =  api.post.hello.useQuery({
    text: "from tRPC",
  });

  const test = api.post.hello.useQuery({
    text: "from tRPC",
  })

  // const test = await api.post.testfunction.query({ text: "from tRPC" });

  // const session = await getServerAuthSession();

  return (
    <main className={styles.main}>
      <Link href="/api/auth/signout">Logout</Link>
      <br />
      <Link href={"/ssr"}>Try out ssr</Link>
      <h1>hello {isLoading ? "loading" : data?.greeting}</h1>

    </main>
  );
}

// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = await api.post.getLatest.query();

//   return (
//     <div className={styles.showcaseContainer}>
//       {latestPost ? (
//         <p className={styles.showcaseText}>
//           Your most recent post: {latestPost.name}
//         </p>
//       ) : (
//         <p className={styles.showcaseText}>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
