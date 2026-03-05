
function getBase44() {
  const base44 = {
    integrations: {
      Core: {
        InvokeLLM: async ({ prompt, response_json_schema }) => {
          try {
            // Always use the local API route
            const response = await fetch('/api/openai/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                prompt,
                response_json_schema
              }),
            });

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({}));
              console.error('API error:', errorData);
              return {};
            }

            const data = await response.json();
            
            // Check for error responses
            if (data.error) {
              console.error('LLM error:', data.error);
              return {};
            }

            return data;
          } catch (error) {
            console.error('InvokeLLM error:', error);
            return {};
          }
        },
      },
    },
  };

  // Add safe fallbacks for auth and entities
  base44.auth = {
    me: async () => ({ email: 'demo@user.com', name: 'Demo User', full_name: 'Demo User' })
  };
  
  base44.entities = {
    LearningPath: {
      list: async () => {
        try {
          const res = await fetch('/api/learning-paths');
          const data = await res.json();
          return data.paths || [];
        } catch (error) {
          console.error('Failed to fetch learning paths:', error);
          return [];
        }
      },
      create: async (pathData) => {
        try {
          const res = await fetch('/api/learning-paths', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pathData)
          });
          const data = await res.json();
          return data.path || pathData;
        } catch (error) {
          console.error('Failed to create learning path:', error);
          return pathData;
        }
      }
    },
    UserProgress: {
      filter: async (query) => {
        try {
          const params = new URLSearchParams(query);
          const res = await fetch(`/api/user/progress?${params}`);
          const data = await res.json();
          return Object.values(data.progress || {});
        } catch (error) {
          console.error('Failed to fetch user progress:', error);
          return [];
        }
      },
      get: async (pathId) => {
        try {
          const res = await fetch(`/api/user/progress?email=demo@user.com`);
          const data = await res.json();
          return data.progress?.[pathId] || null;
        } catch (error) {
          console.error('Failed to get user progress:', error);
          return null;
        }
      },
      create: async (progressData) => {
        try {
          const res = await fetch(`/api/learning-paths/${progressData.path_id}/progress`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(progressData)
          });
          const data = await res.json();
          return data.progress || progressData;
        } catch (error) {
          console.error('Failed to create progress:', error);
          return progressData;
        }
      },
      update: async (progressId, progressData) => {
        try {
          // The progressId here is actually the path_id in most cases
          const pathId = progressData.path_id || progressId;
          const res = await fetch(`/api/learning-paths/${pathId}/progress`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(progressData)
          });
          const data = await res.json();
          return data.progress || progressData;
        } catch (error) {
          console.error('Failed to update progress:', error);
          return progressData;
        }
      }
    },
    Achievement: {
      filter: async (query) => {
        try {
          const params = new URLSearchParams(query);
          const res = await fetch(`/api/user/progress?${params}`);
          const data = await res.json();
          return data.achievements || [];
        } catch (error) {
          console.error('Failed to fetch achievements:', error);
          return [];
        }
      },
      create: async (achievementData) => {
        try {
          const res = await fetch('/api/user/achievements', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(achievementData)
          });
          const data = await res.json();
          return data.achievement || achievementData;
        } catch (error) {
          console.error('Failed to create achievement:', error);
          return achievementData;
        }
      }
    },
    Question: {
      list: async (sortOrder, limit) => {
        try {
          const sort = sortOrder || '-createdAt';
          const res = await fetch(`/api/questions?sort=${sort}&limit=${limit || 50}`);
          const data = await res.json();
          return data.questions || [];
        } catch (error) {
          console.error('Failed to fetch questions:', error);
          return [];
        }
      },
      create: async (questionData) => {
        try {
          const res = await fetch('/api/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(questionData)
          });
          const data = await res.json();
          return data.question || { id: Date.now(), ...questionData, createdAt: new Date().toISOString() };
        } catch (error) {
          console.error('Failed to create question:', error);
          return { id: Date.now(), ...questionData, createdAt: new Date().toISOString() };
        }
      },
      get: async (id) => {
        try {
          const res = await fetch(`/api/questions/${id}`);
          const data = await res.json();
          return data.question || null;
        } catch (error) {
          console.error('Failed to fetch question:', error);
          return null;
        }
      },
      update: async (id, updateData) => {
        try {
          const res = await fetch(`/api/questions/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
          });
          const data = await res.json();
          return data.question || updateData;
        } catch (error) {
          console.error('Failed to update question:', error);
          return updateData;
        }
      },
      vote: async (id, direction) => {
        try {
          const res = await fetch(`/api/questions/${id}/vote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ direction })
          });
          const data = await res.json();
          return data.question || null;
        } catch (error) {
          console.error('Failed to vote on question:', error);
          return null;
        }
      }
    },
    Answer: {
      list: async () => {
        try {
          // Get all questions first, then aggregate answers
          const res = await fetch('/api/questions?limit=100');
          const data = await res.json();
          // Note: This is a simplified approach. In production, you'd want a dedicated endpoint
          return [];
        } catch (error) {
          console.error('Failed to fetch answers:', error);
          return [];
        }
      },
      create: async (answerData) => {
        try {
          const res = await fetch(`/api/questions/${answerData.question_id}/answer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(answerData)
          });
          const data = await res.json();
          return data.answer || { id: Date.now(), ...answerData, createdAt: new Date().toISOString() };
        } catch (error) {
          console.error('Failed to create answer:', error);
          return { id: Date.now(), ...answerData, createdAt: new Date().toISOString() };
        }
      },
      filter: async (query) => {
        try {
          if (query.question_id) {
            const res = await fetch(`/api/questions/${query.question_id}`);
            const data = await res.json();
            return data.answers || [];
          }
          return [];
        } catch (error) {
          console.error('Failed to filter answers:', error);
          return [];
        }
      },
      vote: async (id, direction) => {
        try {
          const res = await fetch(`/api/answers/${id}/vote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ direction })
          });
          const data = await res.json();
          return data.answer || null;
        } catch (error) {
          console.error('Failed to vote on answer:', error);
          return null;
        }
      }
    }
  };

  return base44;
}

export const base44 = getBase44();

