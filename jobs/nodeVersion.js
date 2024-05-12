import puppeteer from "puppeteer";
import NodeVs from "../database/model/NodeVersions.js";
import mongoose from 'mongoose';
import { urlDB } from "../utils/constants.js";
mongoose.connect(urlDB);

const url = "https://nodejs.org/en/about/previous-releases";
const nodeVersion = async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.waitForSelector('#tbVersions > tbody > tr:nth-child(1) > td:nth-child(1)');
        const latestVersion = await page.evaluate(() => {
            return document.querySelector('#tbVersions > tbody > tr:nth-child(1) > td:nth-child(1)').textContent;
        })
        const data = await NodeVs.findOne({ version: latestVersion });

        if (data) {
            console.log("not updated latest Version:", data.version);
        } else {
            console.log("Node.js latest Version:", latestVersion);
            // saving the latest version in the database--------
            let newVersion = new NodeVs({
                name: "node",
                version: latestVersion,
                creation_date: new Date(),
                modified_date: new Date(),
            })
            newVersion.save();
            // calling email to user for notification--------------
        }
        browser.close();
    } catch (error) {
        console.log("error:===========:", error);
        // calling email to user for notification to --------------
    }
}

export default nodeVersion;