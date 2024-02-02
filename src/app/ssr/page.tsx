"use server";
// import db from "~/server/db";

// db.tb.users.insert({ username: "test", password: "test", name: "test" });
import Link from "next/link";
import {api} from "~/trpc/server";

export default async function SSR() {


    return (
        <>
            <div>
                <h1>this page is server side rendered</h1>
            </div>
            <Link href={"/"}>Go back</Link>
       
        </>
    )
}