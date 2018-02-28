const main = require("../main");
const dotenv = require("dotenv");
dotenv.config();

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

it("should schedule an iMessage to send in 1 min", () => {
    var now = new Date();
    var oneMin = addMinutes(now, 1);
    //todo: make env var
    var testPhone = process.env.PHONE;
    var msg = "Hello from Jest!!";
    
    main.scheduleMessage(oneMin, testPhone, msg);
});
