export interface Post {
  _id: string;
  description: string;
  author: {
    image: string;
    name: string;
  };
  mainImage: {
    assets: {
      _ref: string;
    };
  };
  slug: {
    current: string;
  };
  title: string;
  body: [object];
  _createdAt: string;
}
export interface Props {
  posts: Post[];
}
export interface PostProps {
  post: Post;
}
