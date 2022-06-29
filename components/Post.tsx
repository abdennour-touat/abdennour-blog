import Link from "next/link";
import { urlFor } from "../sanity";
import { PostProps } from "../typing";

export default function Post({ post }: PostProps): JSX.Element {
  return (
    <Link href={`/post/${post.slug.current}`} key={post._id}>
      <div className="group cursor-pointer border rounded-lg overflow-hidden">
        <img
          className=" h-60 w-full  object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
          src={urlFor(post.mainImage).url()}
          alt={post.title}
        />
        <div className="flex justify-between p-5 bg-white">
          <div>
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-sm">
              {post.description} by {post.author.name}
            </p>
          </div>
          <img
            className="h-12 w-12 rounded-full"
            src={urlFor(post.author.image).url()}
            alt="author image"
          />
        </div>
      </div>
    </Link>
  );
}
