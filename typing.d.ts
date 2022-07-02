import Comments from "./components/Comments";

export interface Post {
  _id: string;
  description: string;
  author: {
    image: string;
    name: string;
  };
  comments: [Comment];
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

export interface FormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}
export interface Comment {
  _createdAt: string;
  _id: string;
  comment: string;
  email: string;
  name: string;
}

export interface CommentsProps {
  comments: Comment[];
}
