import puppeteer from "puppeteer";
import NodeVs from "../database/model/NodeVersions.js";
import mongoose from 'mongoose';
import { urlDB } from "../utils/constants.js";
mongoose.connect(urlDB);

const findVersion = async (prop) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(prop?.url);
        // await page.screenshot({ path: 'example.png' });
        await page.waitForSelector(prop?.selector);
        const latestVersion = await page.evaluate((prop) => {
            console.log("=====", prop);
            return document.querySelector(prop?.selector).textContent;
        }, prop)
        console.log(`=== ${prop?.name}`, latestVersion);
        const data = await NodeVs.findOne({ version: latestVersion });
        if (data) {
            console.log(`${prop?.name} not updated latest Version: `, data.version);
        } else {
            console.log(`${prop?.name} latest Version: `, latestVersion);
            // saving the latest version in the database--------
            // let newVersion = new NodeVs({
            //     name: prop?.name,
            //     version: latestVersion,
            //     creation_date: new Date(),
            //     modified_date: new Date(),
            // })
            // newVersion.save();
            // calling email to user for notification--------------
        }
        browser.close();
    } catch (error) {
        console.log("error:===========:", error);
        // calling email to user for notification to --------------
    }
}

export default findVersion;