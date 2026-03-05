// JavaScript Example: Reading Entities
// Filterable fields: title, description, category, difficulty, estimated_hours, topics, prerequisites, tags, icon, color, total_xp
async function fetchLearningPathEntities() {
    const response = await fetch(`https://app.base44.com/api/apps/69726ab36e366d2b17db4b59/entities/LearningPath`, {
        headers: {
            'api_key': '4d72fd564a1d4ae68ce90259a829a2af', // or use await User.me() to get the API key
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
}

// JavaScript Example: Updating an Entity
// Filterable fields: title, description, category, difficulty, estimated_hours, topics, prerequisites, tags, icon, color, total_xp
async function updateLearningPathEntity(entityId, updateData) {
    const response = await fetch(`https://app.base44.com/api/apps/69726ab36e366d2b17db4b59/entities/LearningPath/${entityId}`, {
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