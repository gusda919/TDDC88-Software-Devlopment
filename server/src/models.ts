import { Schema, model, Document } from "mongoose";

interface User {
    "PlaceradUnderCentrum": string,
    "PlaceradUnderVerksamhetsenhet": string,
    "PlaceradUnderOrganisationsenhet": string,
    "Namn": string,
    "Personnummer": string,
    "Användarnamn": string,
    "Startdatum": string,
    "HSAYrkesroll": string,
    "Titel": string,
    "MedicinskTitel": string,
    "BefattningAID": string,
    "Efternamn": string,
    "Tilltalsnamn": string,
    "E-post": string
}

export interface UserDoc extends Document, User {}; // type that queries of UserModel will return

const userSchema = new Schema<User>({
    "PlaceradUnderCentrum": { type: String , required: true },
    "PlaceradUnderVerksamhetsenhet": { type: String , required: true },
    "PlaceradUnderOrganisationsenhet": { type: String , required: true },
    "Namn": { type: String , required: true },
    "Personnummer": { type: String , required: true },
    "Användarnamn": { type: String , required: true },
    "Startdatum": { type: String , required: true },
    "HSAYrkesroll": { type: String , required: true },
    "Titel": { type: String , required: true },
    "MedicinskTitel": { type: String , required: true },
    "BefattningAID": { type: String , required: true },
    "Efternamn": { type: String , required: true },
    "Tilltalsnamn": { type: String , required: true },
    "E-post": { type: String , required: true }
});

export const  UserModel = model<User>('User', userSchema);