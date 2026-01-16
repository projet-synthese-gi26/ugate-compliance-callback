import { ComplianceResponse, OfficialProfile } from './types';
import {
    MOCK_PROFILE_VALID, MOCK_COMPLIANCE_VALID,
    MOCK_PROFILE_INVALID, MOCK_COMPLIANCE_INVALID,
    delay
} from './mock-data';

// Utilisation de 127.0.0.1 par défaut pour éviter les problèmes de résolution DNS Node.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8091';

// Liste des IDs de test pour la démo
const MOCK_IDS = ['driver-123', 'driver-456', 'mock-valid', 'mock-invalid'];

/**
 * Récupère le profil officiel (Jumeau Numérique)
 * @param driverId UUID du chauffeur
 * @param token (Optionnel) Token JWT pour l'authentification Admin
 */
export async function getOfficialProfile(driverId: string, token?: string): Promise<OfficialProfile | null> {
    // 1. Si c'est un ID de test, on renvoie le Mock (Bypass Auth)
    if (MOCK_IDS.includes(driverId)) {
        await delay(800);
        return driverId === 'driver-456' ? MOCK_PROFILE_INVALID : MOCK_PROFILE_VALID;
    }

    // 2. Sinon, appel RÉEL au Backend
    try {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        // 🔑 Injection du Token s'il est fourni (Cas Super Admin)
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`${API_BASE_URL}/compliance/details/${driverId}`, {
            method: 'GET',
            headers: headers,
            next: { revalidate: 60 }, // Cache court (Next.js)
        });

        if (!res.ok) {
            console.error(`API Error Profile [${res.status}]: ${res.statusText}`);
            return null;
        }
        return await res.json();
    } catch (e) {
        console.error("API Connection Error (Profile):", e);
        return null;
    }
}

/**
 * Vérifie le statut de conformité en temps réel
 * @param driverId UUID du chauffeur
 * @param token (Optionnel) Token JWT pour l'authentification Admin
 */
export async function checkCompliance(driverId: string, token?: string): Promise<ComplianceResponse | null> {
    // 1. Si c'est un ID de test, on renvoie le Mock
    if (MOCK_IDS.includes(driverId)) {
        await delay(1500);
        return driverId === 'driver-456' ? MOCK_COMPLIANCE_INVALID : MOCK_COMPLIANCE_VALID;
    }

    // 2. Sinon, appel RÉEL au Backend
    try {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        // 🔑 Injection du Token s'il est fourni
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`${API_BASE_URL}/compliance/check/${driverId}`, {
            method: 'GET',
            headers: headers,
            cache: 'no-store', // Pas de cache pour le check (Critique)
        });

        if (!res.ok) {
            console.error(`API Error Compliance [${res.status}]: ${res.statusText}`);
            return null;
        }
        return await res.json();
    } catch (e) {
        console.error("API Connection Error (Check):", e);
        return null;
    }
}