
import { createClient } from '@supabase/supabase-js'

// --- CONFIGURATION SUPABASE ---
// Remplacez 'VOTRE_CLE_ANON' par la clé publique trouvée dans :
// Settings > API > Project API keys > anon / public
// ------------------------------

const supabaseUrl = 'https://ulzoovznyxkjltfkuzxl.supabase.co'
const supabaseKey = 'sb_publishable_dpx2Tw68EFpdtAKcPqhlfg_lq3zhSYV'

export const supabase = createClient(supabaseUrl, supabaseKey)
