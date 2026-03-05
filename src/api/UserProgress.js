// JavaScript Example: Reading Entities
// Filterable fields: user_email, path_id, completed_topics, quiz_scores, challenge_completions, current_topic_id, total_xp, streak_days, last_activity, started_at, completed_at, status
async function fetchUserProgressEntities() {
    const response = await fetch(`https://app.base44.com/api/apps/69726ab36e366d2b17db4b59/entities/UserProgress`, {
        headers: {
            'api_key': '4d72fd564a1d4ae68ce90259a829a2af', // or use await User.me() to get the API key
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
}

// JavaScript Example: Updating an Entity
// Filterable fields: user_email, path_id, completed_topics, quiz_scores, challenge_completions, current_topic_id, total_xp, streak_days, last_activity, started_at, completed_at, status
async function updateUserProgressEntity(entityId, updateData) {
    const response = await fetch(`https://app.base44.com/api/apps/69726ab36e366d2b17db4b59/entities/UserProgress/${entityId}`, {
        method: 'PUT',
        headers: {
            'api_key': '4d72fd564a1d4ae68ce90259a829a2af', // or use await User.me() to get the API key
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    });
    const data = await response.json();
    console.log(data);
}