import { Schema, model, Document } from "mongoose";

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

export interface PatientDoc extends Document, Patient {}; // type that queries of UserModel will return

const patientSchema = new Schema<Patient>({
    "ssn": { type: String , required: true },
    "first_name": { type: String , required: true },
    "last_name": { type: String , required: true },
    "systolic_bp": [{ type: Number , required: FinalizationRegistry }],
    "heart_rate": [{ type: Number , required: false }],
    "respiratory_rate": [{ type: Number , required: false }],
    "body_temperature": [{ type: Number , required: false }],
    "triage_status": { type: String , required: true },
    "visiting_for": { type: String , required: true },
    "visiting_date": { type: String , required: true }
});

export const PatientModel = model<Patient>('Patient', patientSchema);