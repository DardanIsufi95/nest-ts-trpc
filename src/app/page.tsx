
import Link from "next/link";

import styles from "./index.module.css";
import { api} from "~/trpc/server";
import { signOut } from "next-auth/react";
import { Suspense } from "react";
import { LogoutButton } from "./_components/LogoutButton";







export default  async function Home() {

  const data =  await api.auth.me().catch((err) => {
    console.error(err);
    return null;
  });


  console.log("data", data);

  

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to tRPC!</h1>
      <h3 className={styles.title}>You are now authenticated as {data?.name}</h3>
      
      <LogoutButton name={data?.name} />
 
      
      <br />
      <Link className="m-2" href={"/ssr"}>Try out ssr</Link>
      <Link className="m-2" href={"/dashboard"}>Try out dashboard</Link>
     

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
