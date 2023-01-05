import React from 'react';
// import {json, useLoaderData } from "react-router-dom";

// export type Post = {
//     id: string
//     createdAt: Date
//     title: string
//     content: string | null
//     authorId: string
// }
//
// export const loader = async () => {
//     return json({
//         posts: [
//             {
//                 slug: "my-first-post",
//                 title: "My First Post",
//             },
//             {
//                 slug: "90s-mixtape",
//                 title: "A Mixtape I Made Just For You",
//             },
//         ],
//     });
// };
//
// export default function Posts() {
//     const { posts } = useLoaderData<typeof loader>();
//     console.log(posts);
//     return (
//         <main>
//             <h1>Posts</h1>
//         </main>
//     );
// }