"use client";
import Link from "next/link";

import styles from "./index.module.css";
import { api} from "~/trpc/react";

export default  async function Home() {

  const data =  await api.post.me.query();

  console.log("data", data);

  

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to tRPC!</h1>
      <h3 className={styles.title}>You are now authenticated as {data.name}</h3>
      <Link href="/api/auth/signout">Logout</Link>
      <br />
      <Link href={"/ssr"}>Try out ssr</Link>
     

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
