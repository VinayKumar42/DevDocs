// JavaScript Example: Reading Entities
// Filterable fields: title, body, category, topic, tags, author_name, author_email, views, votes, status, suggested_docs
async function fetchQuestionEntities() {
    const response = await fetch(`https://app.base44.com/api/apps/69726ab36e366d2b17db4b59/entities/Question`, {
        headers: {
            'api_key': '4d72fd564a1d4ae68ce90259a829a2af', // or use await User.me() to get the API key
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
}

// JavaScript Example: Updating an Entity
// Filterable fields: title, body, category, topic, tags, author_name, author_email, views, votes, status, suggested_docs
async function updateQuestionEntity(entityId, updateData) {
    const response = await fetch(`https://app.base44.com/api/apps/69726ab36e366d2b17db4b59/entities/Question/${entityId}`, {
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