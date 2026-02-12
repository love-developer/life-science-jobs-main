const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { profileText } = await req.json();

    if (!profileText || profileText.trim().length < 30) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please paste more profile content (at least a few lines).' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const lovableKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'AI gateway not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Extracting profile data with AI, input length:', profileText.length);

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          {
            role: 'system',
            content: `You are a precise data extraction assistant. You will receive text copied from a LinkedIn profile page. Extract information ONLY about the profile owner (the person whose profile this is), NOT about other people, companies, or suggested connections.

RULES:
- "location": Extract the location shown directly under the person's name/headline on LinkedIn. This is their city/region, NOT their company's location. Use the EXACT text shown.
- "name": The profile owner's full name (the large name at the top).
- "title": Their current headline/title shown right below their name.
- "bio": Summarize their About/Summary section in 1-2 sentences. If no About section, summarize from their experience.
- "expertise": Extract 5-8 specific professional skills from their Skills section, endorsements, headline, or experience descriptions. Include SPECIFIC technical skills (e.g. "FDA 510(k) Submissions", "GMP Auditing", "Clinical Trial Design"), NOT generic ones like "Leadership" or "Communication".
- "services": Extract 2-4 services they could offer as a consultant, inferred from their experience and skills.
- "yearsExperience": Calculate from their earliest work experience to now. If unclear, estimate from graduation year.
- "industries": Extract from their industry field or infer from their work history.

Return ONLY this JSON, no markdown formatting:
{
  "name": "string",
  "title": "string", 
  "location": "string",
  "bio": "string",
  "expertise": ["specific_skill_1", "specific_skill_2", ...],
  "services": ["service_1", "service_2", ...],
  "yearsExperience": number,
  "industries": ["industry_1", "industry_2"]
}
If a field truly cannot be determined, use null.`
          },
          {
            role: 'user',
            content: `Extract the profile owner's consultant data from this LinkedIn profile text. Pay special attention to their EXACT location and their SPECIFIC technical skills/expertise:\n\n${profileText.substring(0, 6000)}`
          }
        ],
        temperature: 0.05,
      }),
    });

    if (!aiResponse.ok) {
      console.error('AI extraction failed:', aiResponse.status);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to process profile data' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || '';

    let profileData;
    try {
      const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      profileData = JSON.parse(jsonStr);
    } catch {
      console.error('Failed to parse AI response:', content);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to parse extracted data' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Profile extracted successfully');
    return new Response(
      JSON.stringify({ success: true, data: profileData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: msg }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
