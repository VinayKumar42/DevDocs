// JavaScript Example: Reading Entities
// Filterable fields: user_email, badge_id, badge_name, badge_description, badge_icon, badge_color, earned_at, xp_reward
async function fetchAchievementEntities() {
    const response = await fetch(`https://app.base44.com/api/apps/69726ab36e366d2b17db4b59/entities/Achievement`, {
        headers: {
            'api_key': '4d72fd564a1d4ae68ce90259a829a2af', // or use await User.me() to get the API key
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
}

// JavaScript Example: Updating an Entity
// Filterable fields: user_email, badge_id, badge_name, badge_description, badge_icon, badge_color, earned_at, xp_reward
async function updateAchievementEntity(entityId, updateData) {
    const response = await fetch(`https://app.base44.com/api/apps/69726ab36e366d2b17db4b59/entities/Achievement/${entityId}`, {
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