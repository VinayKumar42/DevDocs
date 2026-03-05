const UserProgressSchema = {
  name: "UserProgress",
  type: "object",
  properties: {
    user_email: {
      type: "string",
      description: "User email"
    },
    path_id: {
      type: "string",
      description: "Learning path ID"
    },
    completed_topics: {
      type: "array",
      items: {
        type: "string"
      },
      description: "List of completed topic IDs"
    },
    quiz_scores: {
      type: "object",
      description: "Quiz scores by topic ID"
    },
    challenge_completions: {
      type: "array",
      items: {
        type: "string"
      },
      description: "Completed challenge IDs"
    },
    current_topic_id: {
      type: "string",
      description: "Currently active topic"
    },
    total_xp: {
      type: "number",
      default: 0
    },
    streak_days: {
      type: "number",
      default: 0
    },
    last_activity: {
      type: "string",
      format: "date-time"
    },
    started_at: {
      type: "string",
      format: "date-time"
    },
    completed_at: {
      type: "string",
      format: "date-time"
    },
    status: {
      type: "string",
      enum: [
        "not_started",
        "in_progress",
        "completed"
      ],
      default: "not_started"
    }
  },
  required: [
    "user_email",
    "path_id"
  ]
};

export default UserProgressSchema;