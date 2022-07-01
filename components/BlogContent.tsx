import PortableText from "react-portable-text";
import { urlFor } from "../sanity";
import { PostProps } from "../typing";

export default function BlogContent({ post }: PostProps) {
  return (
    <section className=" max-w-3xl mx-auto p-5">
      <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
      <h2 className="text-xl font-light text-gray-500">{post.description}</h2>
      <div className="flex items-center space-x-4 mt-3">
        <img
          className="h-10 w-10 rounded-full"
          src={urlFor(post.author.image).url()}
          alt="author-image"
        />
        <p className=" font-extralight text-sm">
          Blog post by{" "}
          <span className=" text-green-600">{post.author.name}</span> -
          published at {new Date(post._createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="mt-10">
        <PortableText
          content={post.body}
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASE}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          serializers={{
            h1: (props: any) => (
              <h1 className=" text-2xl font-bold my-5" {...props} />
            ),
            h2: (props: any) => (
              <h2 className=" text-xl font-bold my-5" {...props} />
            ),
            li: (props: any) => <h1 className=" ml-4 list-disc " {...props} />,
            link: ({ href, children }: any) => (
              <a className=" text-blue-500 hover: underline" href={href}>
                {children}
              </a>
            ),
          }}
        />
      </div>
    </section>
  );
}
