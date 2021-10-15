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
    triage: p.triage
  })
  ));
});

router.get('/patients/:patientID/cosmic/contactreason', async (req: Request, res: Response) => {
  // route for getting the contact reason for patient with patient id "patientID"
  let result = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0]
                .cosmic["se:JournalNoteEHRExtracts"].JournalNoteEHRExtract.Note.Records.Record
               .filter((r: RecordsRecord) => r.Keyword == "Kontaktorsak")
  res.json(result);
})

router.get('/patients/:patientID/cosmic/healthproblem', async (req: Request, res: Response) => {
  // route for getting the current health problem for patient with patient id "patientID"
  let result = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0]
                .cosmic["se:JournalNoteEHRExtracts"].JournalNoteEHRExtract.Note.Records.Record
               .filter((r: RecordsRecord) => r.Keyword == "Aktuellt hälsoproblem")
  res.json(result);
})

router.get('/patients/:patientID/cosmic/assessment', async (req: Request, res: Response) => {
    // route for getting the current assessment for patient with patient id "patientID"
    let result = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0]
                  .cosmic["se:JournalNoteEHRExtracts"].JournalNoteEHRExtract.Note.Records.Record
                 .filter((r: RecordsRecord) => r.Keyword == "Bedömning")
    res.json(result);
})

router.get('/patients/:patientID/cosmic/diagnosis', async (req: Request, res: Response) => {
    // route for getting the current diagnosis for patient with patient id "patientID"
    let result = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0]
                  .cosmic["se:JournalNoteEHRExtracts"].JournalNoteEHRExtract.Note.Records.Record
                 .filter((r: RecordsRecord) => r.Keyword == "Diagnos")
    res.json(result);
})

router.get('/patients/:patientID/cosmic/takenmeasures', async (req: Request, res: Response) => {
    // route for getting the current taken measures for patient with patient id "patientID"
    let result = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0]
                  .cosmic["se:JournalNoteEHRExtracts"].JournalNoteEHRExtract.Note.Records.Record
                 .filter((r: RecordsRecord) => r.Keyword == "Utförda åtgärder")
    res.json(result);
})


router.get('/patients/:patientID/cosmic/:keyword', async (req: Request, res: Response) => {
  // route for getting cosmic data of an area "keyword" for a patient with patient id "patientID"
  // possible keyword parameters: "Allmäntillstånd", "Hjärta", "Blodtryck", "Puls", "Nedre extremitet", "Undersökningsresultat"
  
  // example: localhost:8080/patients/195001232296/cosmic/Blodtryck

  let result = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0]
                  .cosmic["se:JournalNoteEHRExtracts"].JournalNoteEHRExtract.Note.Records.Record
                  .filter((r: RecordsRecord) => r.Keyword == "Status")[0].Record.filter((tr: TentacledRecord) => tr.Keyword == req.params.keyword);

  res.json(result);
});


router.get('/patients/:patientID/vitalParameters', async (req: Request, res: Response) => {
  //route for getting all the vitalparameters for the patient with patient id "patientID"
  //Possible parameters that will be returned could be pulse, bloodpressure and temperature (all parameters w. all data)
  let result = patients.filter((p:Patient) => p.patientID == req.params.patientID)[0].VitalParameters        
  res.json(result);
});

// the 5 routes can be refactored into 1 route with an additional route param, like:
// '/patients/:patientID/vitalParameters/:parameter' and use ...VitalParameters[req.params.parameter]

router.get('/patients/:patientID/vitalParameters/bloodOxygenLevel', async (req: Request, res: Response) => {
  //route for getting the vital parameter "bloodOxygenLevel" for the patient "patientID", returns all the data available
  let result = patients.filter((p:Patient) => p.patientID == req.params.patientID)[0].VitalParameters.bloodOxygenLevel       
  res.json(result);
});

router.get('/patients/:patientID/vitalParameters/pulse', async (req: Request, res: Response) => {
  //route for getting the vital parameter "pulse" for the patient "patientID", returns all the data available
  let result = patients.filter((p:Patient) => p.patientID == req.params.patientID)[0].VitalParameters.pulse        
  res.json(result);
});

router.get('/patients/:patientID/vitalParameters/bloodPressure', async (req: Request, res: Response) => {
  //route for getting the vital parameter "bloodPressure" for the patient "patientID", returns all the data available
  let result = patients.filter((p:Patient) => p.patientID == req.params.patientID)[0].VitalParameters.bloodPressure        
  res.json(result);
});

router.get('/patients/:patientID/vitalParameters/bodyTemperature', async (req: Request, res: Response) => {
  //route for getting the vital parameter "bodyTemperaturel" for the patient "patientID", returns all the data available
  let result = patients.filter((p:Patient) => p.patientID == req.params.patientID)[0].VitalParameters.bodyTemperature       
  res.json(result);
});

router.get('/patients/:patientID/vitalParameters/respiratoryRate', async (req: Request, res: Response) => {
  //route for getting the vital parameter "respiratoryRate" for the patient "patientID", returns all the data available
  let result = patients.filter((p:Patient) => p.patientID == req.params.patientID)[0].VitalParameters.respiratoryRate      
  res.json(result);
});

router.get('/patients/:patientID/labs', async (req: Request, res: Response) => {
  //route for getting all the labtest results for the patient with patient id "patientID"
  //This route returns a list of tests with date, time and types of tests (with marker and value) that have been made.
  let result = patients.filter((p:Patient) => p.patientID == req.params.patientID)[0].labs      
  res.json(result);
});

router.get('/patients/:patientID/labs/:date', async (req: Request, res: Response) => {
  //route for getting all the labtest results for the patient with patient id "patientID"
  //This route returns all labresults based on 
  let result = patients.filter((p:Patient) => p.patientID == req.params.patientID)[0].labs
  .filter((l:Lab) => l.date == req.params.date)[0]    
  res.json(result);
});


// refactor in same fashion is possible for the routes below as for vitalParameters

router.get('/patients/:patientID/drugs', async (req: Request, res: Response) => {
  //route for getting all the drugs written out for the patient with patient id "patientID"
  //This route returns a list of drugs with date, time and type of drugs and what kind of dose.
  let result = patients.filter((p:Patient) => p.patientID == req.params.patientID)[0].drugs      
  res.json(result);
});

router.get('/patients/:patientID/entrancesAndExits', async (req: Request, res: Response) => {
  //route for getting all the entrances and exits (picclines) written out for the patient with patient id "patientID"
  //This route returns a list of picclines for the patient with type, size, localization, time, action and actionTime.
  let result = patients.filter((p:Patient) => p.patientID == req.params.patientID)[0].entrancesAndExits      
  res.json(result);
});

router.get('/patients/:patientID/caregiving', async (req: Request, res: Response) => {
  //route for getting all the caregivings done the patient with patient id "patientID"
  //This route returns a list of all the caregiving with date, time and description of the care given.
  let result = patients.filter((p:Patient) => p.patientID == req.params.patientID)[0].caregiving      
  res.json(result);
});





