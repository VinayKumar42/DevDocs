const AnswerSchema = {
  name: "Answer",
  type: "object",
  properties: {
    question_id: {
      type: "string",
      description: "Reference to the question"
    },
    body: {
      type: "string",
      description: "Answer content"
    },
    author_name: {
      type: "string",
      description: "Author display name"
    },
    author_email: {
      type: "string",
      description: "Author email"
    },
    votes: {
      type: "number",
      default: 0
    },
    is_accepted: {
      type: "boolean",
      default: false
    },
    is_ai_generated: {
      type: "boolean",
      default: false
    }
  },
  required: [
    "question_id",
    "body"
  ]
};

export default AnswerSchema;