import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInput, PostProps } from "../typing";
import Comments from "./Comments";

const CommentSection = ({ post }: PostProps) => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const response = await fetch("/api/createComment", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response) {
        setSubmitted(true);
      }
    } catch (error) {
      console.log(error);
      setSubmitted(false);
    }
  };

  return submitted ? (
    <div className="flex flex-col p-10 my-10  bg-yellow-500 text-white max-w-2xl  mx-auto">
      <h3 className="text-3xl font-bold">
        Thank you for submitting your comment !
      </h3>
      <p>Once we approuved it, it will appear below </p>
    </div>
  ) : (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-5  max-w-2xl mx-auto mb-10"
      >
        <h3 className="text-sm text-yellow-500"> Enjoyed the article?</h3>
        <h4 className="text-3xl font-bold">Leave a comment below!</h4>
        <hr className="py-3 mt-2" />
        <input type="hidden" {...register("_id")} value={post._id} />
        <label className="block mb-5  " htmlFor="name">
          <span className=" text-gray-700">name</span>
          <input
            {...register("name", { required: true })}
            className="shadow border  py-2 px-3 form-input mt-1 block w-full  ring-yellow-500 focus:ring outline-none"
            type="text"
            name="name"
            placeholder="saad eddinne jesus "
          />
        </label>
        <label className="block mb-5  " htmlFor="email">
          <span className=" text-gray-700">email</span>
          <input
            {...register("email", { required: true })}
            className="shadow border  py-2 px-3 form-input mt-1 block w-full  ring-yellow-500 focus:ring outline-none"
            type="text"
            name="email"
            placeholder="jesus@blog.com "
          />
        </label>
        <label className="block mb-5  " htmlFor="comment">
          <span className=" text-gray-700">comment</span>
          <textarea
            {...register("comment", { required: true })}
            className="shadow border  py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 focus:ring outline-none  "
            name="comment"
            placeholder="write your comment here"
            rows={8}
          />
        </label>
        {/* handling when the required forms aren't filled */}
        <div className="flex flex-col p-5">
          {errors.name && (
            <p className="text-red-500">the name field is required</p>
          )}
          {errors.email && (
            <p className="text-red-500">the email field is required</p>
          )}
          {errors.comment && (
            <p className="text-red-500">the comment field is required</p>
          )}
        </div>
        <input
          type="submit"
          className="shadow bg-yellow-500 hover:bg-yellow-400 
        focus:shadow-outline focus:outline-none text-white 
        font-bold py-2 px-4 rounded cursor-pointer"
        />
      </form>
      <Comments comments={post.comments} />
    </>
  );
};

export default CommentSection;
