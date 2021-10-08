import express, { Request, Response, } from "express";
import { Mongoose, Error } from "mongoose";
import { UserModel, UserDoc } from "./user";
import { Patient, RecordsRecord, TentacledRecord } from "./patient";
//import { PatientModel, PatientDoc } from "./patient";

const patients = require('./patients.json');
const users = require('./testusers.json').testUsers;

export const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
    // Simple route for getting the first 10 users
    // UserModel.find({'Namn': { '$regex': req.params.name.toString(), '$options': 'i' }}, async (err: Error, users: UserDoc) => {
    //     res.json(users);
    // });
    res.json(users.slice(1,10));
});

// Simon och Jacob

//routes.get('/patients/:patientID/journalNotes)

//routes.get('/patients/:patientID/:parameter')

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


router.get('/patients/:patientID/cosmic/:keyword', async (req: Request, res: Response) => {
  // route for getting cosmic data of an area "keyword" for a patient with patient id "patientID"
  // possible keyword parameters: "Allmäntillstånd", "Hjärta", "Blodtryck", "Puls", "Nedre extremitet", "Undersökningsresultat"
  
  // example: localhost:8080/patients/195001232296/cosmic/Blodtryck

  let result = patients.filter((p: Patient) => p.patientID == req.params.patientID)[0]
                  .cosmic["se:JournalNoteEHRExtracts"].JournalNoteEHRExtract.Note.Records.Record
                  .filter((r: RecordsRecord) => r.Keyword == "Status")[0].Record.filter((tr: TentacledRecord) => tr.Keyword == req.params.keyword);

  res.json(result);
});





//[0].cosmic["se:JournalNoteEHRExtracts"].JournalNoteEHRExtract.Note.Records.Record[2].Record[1].Record

// Erik och Eric 

//routes.get('/patients/:patientID/labs)

router.get('/patients/:patientID/vitalParameters', async (req: Request, res: Response) => {
  //route for getting all the vitalparameters for the patient with patient id "patientID"
  //Possible parameters that will be returned could be pulse, bloodpressure and temperature (all parameters w. all data)
  let result = patients.filter((p:Patient) => p.patientID == req.params.patientID)[0].VitalParameters        
  res.json(result);

});

router.get('/patients/:patientID/vitalParameters/bloodOxygenLevel', async (req: Request, res: Response) => {
  let result = patients.filter((p:Patient) => p.patientID == req.params.patientID)[0].VitalParameters.bloodOxygenLevel        
  res.json(result);

});

router.get('/patients/:patientID/vitalParameters', async (req: Request, res: Response) => {
  let result = patients.filter((p:Patient) => p.patientID == req.params.patientID)[0].VitalParameters        
  res.json(result);

});






// Daniel och Axel

//routes.get('/patients/:patientID/drugs)

//routes.get('/patients/:patientID/entrancesandexits)

//routes.get('/patients/:patientID/caregiving')




