export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "name",

      type: "string",
    },
    {
      name: "approuved",
      title: "Approuved",
      type: "boolean",
      description: "only approuved comments will be displayed",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "comment",
      type: "text",
    },
    {
      name: "post",
      type: "reference",
      to: [{ type: "post" }],
    },
  ],
};
