import { GetStaticProps } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post, PostProps } from "../../typing";

import BlogContent from "../../components/BlogContent";
import CommentSection from "../../components/CommentSection";

const Post = ({ post }: PostProps) => {
  console.log(post);
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Header />
      <main>
        <header>
          <img
            className="w-full h-52 object-cover "
            src={urlFor(post.mainImage).url()}
            alt="header-image"
          />
        </header>
        <BlogContent post={post} />
        <hr className="max-w-lg my-5 mx-auto border border-black" />
        <CommentSection post={post} />
      </main>
    </>
  );
};

export default Post;
export const getStaticPaths = async () => {
  const query = `*[_type== "post"]{
        _id,
        slug{current}, 
      }`;
  const slugs: [Post] = await sanityClient.fetch(query);
  const paths = slugs.map((post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type== "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        author->{
        name,
        image
      },
      "comments":*[
        _type== "comment" && approuved == true 
        && post._ref == ^._id
      ]{
          _createdAt,
          name,
          email,
          comment,
          _id  
      },
      mainImage,
      body,
      description,
      title,
      slug
      }`;
  const post = await sanityClient.fetch(query, { slug: params?.slug });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
