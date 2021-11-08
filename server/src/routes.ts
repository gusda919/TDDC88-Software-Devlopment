import express, { Request, Response, } from "express";
import { Mongoose, Error } from "mongoose";
import { UserModel, UserDoc } from "./user";
import { Patient, RecordsRecord, TentacledRecord, Lab } from "./patient";

const patients = require('./patients.json');
const users = require('./testusers.json').testUsers;

export const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
    res.json(users.slice(1,10));
});

router.get('/patients', async (req: Request, res: Response) => {
  // route for getting overview attributes for all patients
  console.log("in /patients");

  // reduce the patient objects to only include overview attributes
  res.json(patients.map((p: Patient) => ({
    patientID: p.patientID,
    givenName: p.givenName,
    familyName: p.familyName,
    description: p.description,
    gender: p.gender,
    triage: p.triage,
    caregiving: p.caregiving
  })
  ));
});

router.get('/patients/:patientID', async (req: Request, res: Response) => {
  console.log("Hej")
  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  console.log(patient)
  if (patient) {
    res.json( ({
      patientID: patient.patientID,
      givenName: patient.givenName,
      familyName: patient.familyName,
      description: patient.description,
      gender: patient.gender,
      triage: patient.triage
    }))
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet")
  }  

});

router.get('/patients/:patientID/cosmic/contactreason', async (req: Request, res: Response) => {
  // route for getting the contact reason for patient with patient id "patientID"
  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) {
    let result = patient.cosmic["se:JournalNoteEHRExtracts"].JournalNoteEHRExtract.Note.Records.Record
    .filter((r: RecordsRecord) => r.Keyword == "Kontaktorsak");
    res.json(result);
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet")
  }  
});

router.get('/patients/:patientID/cosmic/healthproblem', async (req: Request, res: Response) => {
  // route for getting the current health problem for patient with patient id "patientID"
  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) {
    let result = patient.cosmic["se:JournalNoteEHRExtracts"].JournalNoteEHRExtract.Note.Records.Record
    .filter((r: RecordsRecord) => r.Keyword == "Aktuellt hälsoproblem");
    res.json(result);
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet");
  }  
});

router.get('/patients/:patientID/cosmic/assessment', async (req: Request, res: Response) => {
    // route for getting the current assessment for patient with patient id "patientID"

  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) {
    let result = patient.cosmic["se:JournalNoteEHRExtracts"].JournalNoteEHRExtract.Note.Records.Record
    .filter((r: RecordsRecord) => r.Keyword == "Bedömning");
    res.json(result);
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet");
  }  
});

router.get('/patients/:patientID/cosmic/diagnosis', async (req: Request, res: Response) => {
    // route for getting the current diagnosis for patient with patient id "patientID"
  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) {
    let result = patient.cosmic["se:JournalNoteEHRExtracts"].JournalNoteEHRExtract.Note.Records.Record
    .filter((r: RecordsRecord) => r.Keyword == "Diagnos");
    res.json(result);
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet");
  }  
});

router.get('/patients/:patientID/cosmic/takenmeasures', async (req: Request, res: Response) => {
    // route for getting the current taken measures for patient with patient id "patientID"
  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) {
    let result = patient.cosmic["se:JournalNoteEHRExtracts"].JournalNoteEHRExtract.Note.Records.Record
    .filter((r: RecordsRecord) => r.Keyword == "Utförda åtgärder");
    res.json(result);
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet");
  }  
});

router.get('/patients/:patientID/cosmic/:keyword', async (req: Request, res: Response) => {
  // route for getting cosmic data of an area "keyword" for a patient with patient id "patientID"
  // possible keyword parameters: "Allmäntillstånd", "Hjärta", "Blodtryck", "Puls", "Nedre extremitet", "Undersökningsresultat"
  
  // example: localhost:8080/patients/195001232296/cosmic/Blodtryck

  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) {
      res.json( patient.cosmic["se:JournalNoteEHRExtracts"].JournalNoteEHRExtract.Note.Records.Record
      .filter((r: RecordsRecord) => r.Keyword == "Status")[0].Record.filter((tr: TentacledRecord) => tr.Keyword == req.params.keyword) );
    }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet");
  }  
});

router.get('/patients/:patientID/contagious', async (req: Request, res: Response) => {
  //route for getting data whether a patient is contagious or not. 
  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) {
    res.json(patient.contagious);
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet");
  }
});

router.get('/patients/:patientID/vitalParameters', async (req: Request, res: Response) => {
  //route for getting all the vitalparameters for the patient with patient id "patientID"
  //Possible parameters that will be returned could be pulse, bloodpressure and temperature (all parameters w. all data)
  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) { 
    res.json( patient.VitalParameters ); 
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet");
  }  
});

// the 5 routes can be refactored into 1 route with an additional route param, like:
// '/patients/:patientID/vitalParameters/:parameter' and use ...VitalParameters[req.params.parameter]


router.get('/patients/:patientID/vitalParameters/bloodOxygenLevel', async (req: Request, res: Response) => {
  //route for getting the vital parameter "bloodOxygenLevel" for the patient "patientID", returns all the data available
  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) { 
    res.json( patient.VitalParameters.bloodOxygenLevel ); 
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet");
  } 
});

router.get('/patients/:patientID/vitalParameters/pulse', async (req: Request, res: Response) => {
  //route for getting the vital parameter "pulse" for the patient "patientID", returns all the data available
  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) { 
    res.json( patient.VitalParameters.pulse ); 
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet");
  } 
});

router.get('/patients/:patientID/vitalParameters/bloodPressure', async (req: Request, res: Response) => {
  //route for getting the vital parameter "bloodPressure" for the patient "patientID", returns all the data available
  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) { 
    res.json( patient.VitalParameters.bloodPressure ); 
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet");
  } 
});

router.get('/patients/:patientID/vitalParameters/bodyTemperature', async (req: Request, res: Response) => {
  //route for getting the vital parameter "bodyTemperaturel" for the patient "patientID", returns all the data available
  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) { 
    res.json( patient.VitalParameters.bodyTemperature ); 
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet");
  } 
});

router.get('/patients/:patientID/vitalParameters/respiratoryRate', async (req: Request, res: Response) => {
  //route for getting the vital parameter "respiratoryRate" for the patient "patientID", returns all the data available
  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) { 
    res.json( patient.VitalParameters.respiratoryRate ); 
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet");
  } 
});

router.get('/patients/:patientID/labs', async (req: Request, res: Response) => {
  //route for getting all the labtest results for the patient with patient id "patientID"
  //This route returns a list of tests with date, time and types of tests (with marker and value) that have been made.
  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) { 
    res.json( patient.labs ); 
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet");
  } 
});

router.get('/patients/:patientID/labs/:date', async (req: Request, res: Response) => {
  //route for getting all the labtest results for the patient with patient id "patientID"
  //This route returns all labresults based on date.
  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) { 
    res.json( patient.labs.filter((l:Lab) => l.date == req.params.date)  ); 
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet");
  } 
});


// refactor in same fashion is possible for the routes below as for vitalParameters

router.get('/patients/:patientID/drugs', async (req: Request, res: Response) => {
  //route for getting all the drugs written out for the patient with patient id "patientID"
  //This route returns a list of drugs with date, time and type of drugs and what kind of dose.
  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) { 
    res.json( patient.drugs ); 
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet");
  } 
});

router.get('/patients/:patientID/entrancesAndExits', async (req: Request, res: Response) => {
  //route for getting all the entrances and exits (picclines) written out for the patient with patient id "patientID"
  //This route returns a list of picclines for the patient with type, size, localization, time, action and actionTime.
  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) { 
    res.json( patient.entrancesAndExits ); 
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet");
  } 
});

router.get('/patients/:patientID/caregiving', async (req: Request, res: Response) => {
  //route for getting all the caregivings done the patient with patient id "patientID"
  //This route returns a list of all the caregiving with date, time and description of the care given.
  let patient = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0];
  if (patient) { 
    res.json( patient.caregiving ); 
  }
  else {
    res.json("Patient med personnummer " + req.params.patientID + " finns inte i systemet");
  } 
});





