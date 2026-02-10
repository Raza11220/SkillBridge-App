import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { work_history_id } = await req.json();
    console.log("Calculating credibility for work_history_id:", work_history_id);

    // Get the work history record
    const { data: workHistory, error: whError } = await supabase
      .from("work_history")
      .select("*, projects(*)")
      .eq("id", work_history_id)
      .single();

    if (whError || !workHistory) {
      throw new Error("Work history not found");
    }

    const freelancerId = workHistory.freelancer_id;

    // Get all verified work history for this freelancer
    const { data: allWork } = await supabase
      .from("work_history")
      .select("*, projects(*)")
      .eq("freelancer_id", freelancerId)
      .eq("status", "verified");

    const verifiedWork = allWork || [];
    const totalProjects = verifiedWork.length;
    const onTimeDeliveries = verifiedWork.filter(w => w.delivered_on_time).length;

    // Calculate scores (0-100 scale)
    const deliveryScore = totalProjects > 0 ? (onTimeDeliveries / totalProjects) * 100 : 50;
    
    const qualityRatings = verifiedWork.filter(w => w.quality_rating).map(w => w.quality_rating);
    const avgQuality = qualityRatings.length > 0 
      ? qualityRatings.reduce((a, b) => a + b, 0) / qualityRatings.length 
      : 3;
    const qualityScore = (avgQuality / 5) * 100;

    // Consistency: bonus for regular work over time
    const consistencyScore = Math.min(100, 50 + (totalProjects * 5));

    // Skill match: based on project complexity completed
    const avgComplexity = verifiedWork.length > 0
      ? verifiedWork.reduce((sum, w) => sum + (w.projects?.complexity || 3), 0) / verifiedWork.length
      : 3;
    const skillMatchScore = (avgComplexity / 5) * 100;

    // Overall score: weighted average
    const overallScore = (
      deliveryScore * 0.30 +
      qualityScore * 0.35 +
      consistencyScore * 0.15 +
      skillMatchScore * 0.20
    );

    console.log("Calculated scores:", { overallScore, deliveryScore, qualityScore, consistencyScore, skillMatchScore });

    // Update credibility score
    const { error: updateError } = await supabase
      .from("credibility_scores")
      .upsert({
        user_id: freelancerId,
        overall_score: Math.round(overallScore * 100) / 100,
        delivery_score: Math.round(deliveryScore * 100) / 100,
        quality_score: Math.round(qualityScore * 100) / 100,
        consistency_score: Math.round(consistencyScore * 100) / 100,
        skill_match_score: Math.round(skillMatchScore * 100) / 100,
        total_projects: totalProjects,
        on_time_deliveries: onTimeDeliveries,
        last_calculated_at: new Date().toISOString(),
      });

    if (updateError) throw updateError;

    return new Response(
      JSON.stringify({ success: true, overall_score: overallScore }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error:", message);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
