import { SampleController } from '../controllers/SampleController';

const express = require('express');

const sampleRouter = express.Router();
const sampleController = new SampleController();

sampleRouter.get('/ping', sampleController.sampleHealthCheck);

export default sampleRouter;
