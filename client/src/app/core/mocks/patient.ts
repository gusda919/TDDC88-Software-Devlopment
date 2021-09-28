export interface Patient {
    "ssn": string,
    "first_name": string,
    "last_name": string,
    "systolic_bp": number[],
    "heart_rate": number[],
    "respiratory_rate": number[],
    "body_temperature": number[],
    "triage_status": string,
    "visiting_for": string,
    "visiting_date": string,
}