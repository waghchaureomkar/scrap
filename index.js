// import nodeVersion from "./jobs/nodeVersion.js";
import cron from "node-cron";
import { cronTime1 } from "./utils/constants.js";
import findVersion from "./jobs/findVersion.js";
import { jobs } from "./utils/jobs.js";

cron.schedule(cronTime1, () => {
    console.log('Running a cron job at:', new Date());
    // nodeVersion();
    jobs?.forEach((data) => {
        findVersion(data);
    })
});