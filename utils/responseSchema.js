
function failureResponse(status, message, statusCode, notificationMessage) {
    return ({
       "statusCode": statusCode,
       "body": {
           "status": status,
           "message": message,
           "notificationMessage": notificationMessage? notificationMessage: undefined,
           "timestamp": Date()
       }        
   })
}

function successResponse(data, statusCode) {
   return ({
       "statusCode": statusCode,
       "body": {
            ...data,
           "timestamp": Date()
       }
   })
}
function sendSuccessResponse(data, statusCode) {
    return {
        ...data
    };
 } 

module.exports = {
   failureResponse, successResponse, sendSuccessResponse
}