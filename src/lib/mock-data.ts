// src/lib/mock-data.ts
import { ComplianceResponse, OfficialProfile } from './type';

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const MOCK_PROFILE_VALID: OfficialProfile = {
    id: 'driver-123',
    firstName: 'Paul',
    lastName: 'EKTO',
    photoUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop',
    isVerified: true,

    // Détails officiels
    cniNumber: '1122334455',
    cniRectoUrl: 'https://images.unsplash.com/photo-1555617778-9243729cab0f?w=600&h=400&fit=crop', // Fake ID Card image
    cniVersoUrl: 'https://images.unsplash.com/photo-1555617778-9243729cab0f?w=600&h=400&fit=crop',
    licenseNumber: 'LT-2309-AB',
    licenseRectoUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=400&fit=crop', // Fake License
    licenseVersoUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=400&fit=crop',
    cvUrl: 'https://example.com/cv.pdf'
};

export const MOCK_COMPLIANCE_VALID: ComplianceResponse = {
    syndicatDriverId: 'synd-001',
    verificationTimestamp: new Date().toISOString(),
    globalStatus: 'AUTHORIZED',
    details: {
        licenseValid: true,
        insuranceValid: true,
        membershipCurrent: true,
        medicalCheck: true
    },
    restrictions: []
};


export const MOCK_PROFILE_INVALID = { ...MOCK_PROFILE_VALID, id: 'driver-456', firstName: 'Jean' };
export const MOCK_COMPLIANCE_INVALID: ComplianceResponse = {
    syndicatDriverId: 'synd-002',
    verificationTimestamp: new Date().toISOString(),
    globalStatus: 'RESTRICTED',
    details: { licenseValid: true, insuranceValid: false, membershipCurrent: false, medicalCheck: true },
    restrictions: ["Assurance expirée", "Cotisation non payée"]
};