const QuestionSchema = {
  name: "Question",
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Question title"
    },
    body: {
      type: "string",
      description: "Detailed question content"
    },
    category: {
      type: "string",
      description: "Related documentation category"
    },
    topic: {
      type: "string",
      description: "Related topic"
    },
    tags: {
      type: "array",
      items: {
        type: "string"
      },
      description: "Question tags"
    },
    author_name: {
      type: "string",
      description: "Author display name"
    },
    author_email: {
      type: "string",
      description: "Author email"
    },
    views: {
      type: "number",
      default: 0
    },
    votes: {
      type: "number",
      default: 0
    },
    status: {
      type: "string",
      enum: [
        "open",
        "answered",
        "closed"
      ],
      default: "open"
    },
    suggested_docs: {
      type: "array",
      items: {
        type: "string"
      },
      description: "AI suggested documentation links"
    }
  },
  required: [
    "title",
    "body",
    "category"
  ]
};

export default QuestionSchema;