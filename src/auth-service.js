import { supabase } from './supabase-client.js'

// --- SERVICE D'AUTHENTIFICATION ---

export const authService = {

    /**
     * Inscription d'un nouvel utilisateur
     * @param {string} email 
     * @param {string} password 
     * @param {object} metaData (nom, prenom, role)
     */
    async signUp(email, password, metaData) {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: metaData // Stocké dans 'raw_user_meta_data'
            }
        })
        return { data, error }
    },

    /**
     * Connexion d'un utilisateur existant
     * @param {string} email 
     * @param {string} password 
     */
    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        return { data, error }
    },

    /**
     * Déconnexion
     */
    async signOut() {
        const { error } = await supabase.auth.signOut()
        return { error }
    },

    /**
     * Récupérer l'utilisateur courant (et ses métadonnées)
     */
    async getCurrentUser() {
        const { data: { user } } = await supabase.auth.getUser()
        return user
    },

    /**
     * Écouter les changements d'état (Login, Logout)
     * @param {function} callback 
     */
    onAuthStateChange(callback) {
        supabase.auth.onAuthStateChange((event, session) => {
            callback(event, session)
        })
    }
}
