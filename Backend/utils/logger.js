const AuditLogUser = require('../models/AuditLogUser');
const ExceptionLog = require('../models/ExceptionLog');


const logException = async (fileName, functionName, exceptionMessage) => {
    try { 
        const exceptionLog = new ExceptionLog({
            fileName,
            functionName,
            exceptionMessage,
        });
        await exceptionLog.save();
    } catch (error) {
        console.error('Error logging exception:', error.message);
    }
};
module.exports = logException
