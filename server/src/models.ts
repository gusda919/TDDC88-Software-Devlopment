import mongoose from "mongoose";

let Schema = mongoose.Schema;

let userSchema = new Schema({
    "PlaceradUnderCentrum": String,
    "PlaceradUnderVerksamhetsenhet": String,
    "PlaceradUnderOrganisationsenhet": String,
    "Namn": String,
    "Personnummer": String,
    "Användarnamn": String,
    "Startdatum": String,
    "HSAYrkesroll": String,
    "Titel": String,
    "MedicinskTitel": String,
    "BefattningAID": String,
    "Efternamn": String,
    "Tilltalsnamn": String,
    "E-post": String
});

export const  User = mongoose.model('User', userSchema);