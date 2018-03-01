const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const osascript = require('node-osascript');
const schedule = require('node-schedule');
const moment = require('moment');
const dotenv = require('dotenv');
dotenv.config();
//TODO: Have it live in the taskbar
//TODO: Integrate contacts
//TODO: Allow for canceling jobs

// a lil jobs queue
var jobs = {};

if (process.platform !== "darwin") {
    console.error("Sorry! MessageQueue only supports Mac at the current time");
    process.exit(1);
}

function sendMessage(buddyPhone, message) {
    osascript.executeFile('./sendMessage.applescript', { phoneNumber : buddyPhone, msg: message}, function(err, result, raw){
    if (err) return console.error(err)
        console.log(result, raw)
    });
}

function jobCompleted(jobId){
    windo.webContents.send('job-completed', jobId);
}

function scheduleMessage(jobId, whenToSend, phone, messageToSend){
    var job = schedule.scheduleJob(whenToSend, () => { 
        sendMessage(phone, messageToSend)
        jobCompleted(jobId);
        delete jobs[jobId];
    });
    console.log("Job scheduled on back", jobId);
    jobs[jobId] = job;
}

function cancelMessage(jobId){
    jobs[jobId].cancel();
    delete jobs[jobId];
}

function createWindow() {
    console.log("Window created on backend!!");
    const windowPrefs = {
        minWidth: 800,
        minHeight: 600,
        titleBarStyle: 'hidden',
        movable: true,
    }
    windo = new BrowserWindow(windowPrefs);

    windo.setBackgroundColor("#89bdd3");
    windo.setMenu(null);

    const startUrl = process.env.ELECTRON_START_URL || process.env.DEV_URL || url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true
        });
    windo.loadURL(startUrl);
    
    windo.on('closed', () =>{
        windo = null;
    });

}

app.on('ready', createWindow);

ipcMain.on('button-push', (event, args) => {
    scheduleMessage(args.jobId, args.when, args.phone, args.message);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {

    if (windo === null) {
        createWindow();
    }
});

module.exports = {
    scheduleMessage: scheduleMessage
}
