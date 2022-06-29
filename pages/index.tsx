import type { NextPage } from "next";
import Head from "next/head";
import { urlFor, sanityClient } from "../sanity";
import Banner from "../components/Banner";
import Header from "../components/Header";
import { Post, Props } from "../typing";
import Posts from "../components/Posts";

const Home = ({ posts }: Props) => {
  return (
    <div className="">
      <Head>
        <title>Abdennour's blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* {header} */}
      <Header />
      {/* Banner */}
      <Banner />
      {/* posts */}
      <Posts posts={posts} />
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type== "post"]{
    _id,
    title,
    slug,
    author->{
    name, image
  }, 
  description,
  mainImage,slug
  }`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
