export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = {};
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }

  if (!body?.topic && !body?.prompt && !body?.messages) {
    return res.status(400).json({ error: 'topic, prompt, or messages is required' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key missing' });
  }

  try {
    // Build system prompt based on whether a schema is provided
    let systemPrompt = 'You are a helpful assistant. Return ONLY valid JSON. No markdown, no explanations, no extra text - just the JSON object.';
    
    // If response_json_schema is provided, use it to guide the response format
    if (body.response_json_schema) {
      const schemaExample = generateSchemaExample(body.response_json_schema);
      systemPrompt = `You are a helpful assistant. You MUST return ONLY valid JSON matching this exact structure (no markdown, no extra text):
${JSON.stringify(schemaExample, null, 2)}

Important: Return ONLY the JSON object, nothing else.`;
    }

    // Build messages array
    let messages = [];
    if (body.messages && Array.isArray(body.messages)) {
      // Use provided messages but ensure system prompt
      messages = [
        { role: 'system', content: systemPrompt },
        ...body.messages.filter(m => m.role !== 'system')
      ];
    } else {
      messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: body.topic || body.prompt }
      ];
    }

    const groqRes = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages,
          temperature: 0.7,
          max_tokens: 4096,
        }),
      }
    );

    const data = await groqRes.json();
    
    if (data.error) {
      console.error('Groq API error:', data.error);
      return res.status(500).json({ error: 'AI provider error', details: data.error });
    }

    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      console.error('No content in response:', data);
      return res.status(500).json({ error: 'No content in AI response' });
    }

    // Try to parse as JSON, handling markdown code blocks
    try {
      let jsonContent = content.trim();
      
      // Remove markdown code blocks if present
      if (jsonContent.startsWith('```json')) {
        jsonContent = jsonContent.slice(7);
      } else if (jsonContent.startsWith('```')) {
        jsonContent = jsonContent.slice(3);
      }
      if (jsonContent.endsWith('```')) {
        jsonContent = jsonContent.slice(0, -3);
      }
      jsonContent = jsonContent.trim();
      
      const parsed = JSON.parse(jsonContent);
      return res.status(200).json(parsed);
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Content:', content);
      return res.status(500).json({ error: 'Invalid AI response format', raw: content });
    }
  } catch (err) {
    console.error('API handler error:', err);
    return res.status(500).json({ error: 'Failed to contact AI provider', details: err.message });
  }
}

// Helper function to generate example from JSON schema
function generateSchemaExample(schema) {
  if (!schema || typeof schema !== 'object') return {};
  
  const result = {};
  const properties = schema.properties || {};
  
  for (const [key, prop] of Object.entries(properties)) {
    if (prop.type === 'string') {
      result[key] = `example_${key}`;
    } else if (prop.type === 'number') {
      result[key] = 10;
    } else if (prop.type === 'boolean') {
      result[key] = true;
    } else if (prop.type === 'array') {
      if (prop.items?.type === 'object') {
        result[key] = [generateSchemaExample(prop.items)];
      } else if (prop.items?.type === 'string') {
        result[key] = ['item1', 'item2'];
      } else {
        result[key] = [];
      }
    } else if (prop.type === 'object') {
      result[key] = generateSchemaExample(prop);
    } else if (prop.enum) {
      result[key] = prop.enum[0];
    }
  }
  
  return result;
}
