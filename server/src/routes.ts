import express, { Request, Response, } from "express";
import { Mongoose, Error } from "mongoose";
import { UserModel, UserDoc } from "./user";
import { PatientModel, PatientDoc } from "./patient";

export const router = express.Router();

router.get('/users/:name', async (req: Request, res: Response) => {
    // Simple route for searching by users' name property
    UserModel.find({'Namn': { '$regex': req.params.name.toString(), '$options': 'i' }}, async (err: Error, users: UserDoc) => {
        res.json(users);
    });
});

router.get('/patients', async (req: Request, res: Response) => {
  // simple route that serves mock patient data
  PatientModel.find({}).then((patients => res.json(patients)));
});

router.get('/', async (req: Request, res: Response) => {
  res.send('hello world');
});