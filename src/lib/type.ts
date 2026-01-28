// src/lib/types.ts

// Correspond à OfficialProfileResponse
export interface OfficialProfile {
    id: string;
    firstName: string;
    lastName: string;
    photoUrl: string;

    cvUrl?: string;
    cniNumber: string;       // ex: "102938475"
    cniRectoUrl?: string;
    cniVersoUrl?: string;
    licenseNumber: string;   // ex: "LT-2024-X"
    licenseRectoUrl?: string;
    licenseVersoUrl?: string;

    isVerified: boolean;     // Le badge bleu
}

// Correspond à ComplianceResponse.ComplianceDetails
export interface ComplianceDetails {
    licenseValid: boolean;
    insuranceValid: boolean;
    membershipCurrent: boolean;
    medicalCheck: boolean;
}

// Correspond à ComplianceResponse
export interface ComplianceResponse {
    syndicatDriverId: string;
    verificationTimestamp: string; // Instant formaté ISO

    // Scénarios possibles selon tes règles
    globalStatus: 'AUTHORIZED' | 'RESTRICTED' | 'BANNED' | 'NOT_A_MEMBER';

    details: ComplianceDetails;
    restrictions: string[];
}