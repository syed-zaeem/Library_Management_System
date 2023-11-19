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

const logUserAction = async (user, oldData, operation) => {
    try {
        userID = user._id
        newData = JSON.stringify(user)
        const auditLogUser = new AuditLogUser({
            userID,
            operation,
            oldData,
            newData,
            
        });
        await auditLogUser.save();
    } catch (error) {
        await logException('logger', 'logUserAction', error.message);
        console.error('Error logging user action:', error.message);
    }
};

module.exports = {
    logUserAction,
    logException,
};
