import { Props } from "../typing";
import PostElt from "./Post";
const Posts = ({ posts }: Props) => {
  return (
    <article className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:p-6 gap-3 md:gap-6 p-2 max-w-7xl mx-auto">
      {posts.map((post) => (
        <PostElt post={post} />
      ))}
    </article>
  );
};

export default Posts;
