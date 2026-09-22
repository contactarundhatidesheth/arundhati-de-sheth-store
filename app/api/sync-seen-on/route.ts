import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/utils/supabase-admin";

/**
 * POST /api/sync-seen-on
 * Revalidates all Seen-On related pages and optionally
 * returns the latest seen_on_features data from Supabase.
 * Can be called from external tools or scripts to bust cache.
 */
export async function GET() {
    try {
        const supabase = getSupabaseAdmin();
        const { data, error } = await supabase
            .from("seen_on_features")
            .select("id, title, sequence")
            .order("sequence", { ascending: true });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Revalidate all Seen-On surfaces
        revalidatePath("/pages/whats-new");
        revalidatePath("/pages/seen-on/[id]");
        revalidatePath("/admin/blogs");
        revalidatePath("/");

        return NextResponse.json({
            success: true,
            message: `Synced ${data?.length ?? 0} Seen-On features`,
            features: data
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message || "Sync failed" }, { status: 500 });
    }
}
