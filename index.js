// import nodeVersion from "./jobs/nodeVersion.js";
import cron from "node-cron";
import nodeVersion from "./jobs/nodeVersion.js";
import { cronTime1 } from "./utils/constants.js";

cron.schedule(cronTime1, () => {
    console.log('Running a cron job at:', new Date());
    nodeVersion();
});