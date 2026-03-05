const LearningPathSchema = {
  name: "LearningPath",
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Learning path title"
    },
    description: {
      type: "string",
      description: "Path description"
    },
    category: {
      type: "string",
      description: "Main category"
    },
    difficulty: {
      type: "string",
      enum: [
        "beginner",
        "intermediate",
        "advanced"
      ],
      default: "beginner"
    },
    estimated_hours: {
      type: "number",
      description: "Estimated completion time in hours"
    },
    topics: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          title: {
            type: "string"
          },
          level: {
            type: "string"
          },
          description: {
            type: "string"
          },
          order: {
            type: "number"
          }
        }
      },
      description: "Ordered list of topics in the path"
    },
    prerequisites: {
      type: "array",
      items: {
        type: "string"
      },
      description: "Required knowledge before starting"
    },
    tags: {
      type: "array",
      items: {
        type: "string"
      }
    },
    icon: {
      type: "string",
      description: "Icon name for the path"
    },
    color: {
      type: "string",
      description: "Gradient color class"
    },
    total_xp: {
      type: "number",
      default: 0
    }
  },
  required: [
    "title",
    "category",
    "difficulty"
  ]
};

export default LearningPathSchema;