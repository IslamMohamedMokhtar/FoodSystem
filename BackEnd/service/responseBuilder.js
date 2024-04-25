const responseBuilder = ({result = {},
    error = {},
    message = ""}) =>
{
    const _response = {
        result: result,
        error: error,
        message: message
    };
    
    return _response;
}
const responsePaginationBuilder = ({result = {},
    error = {},
    message = "",
    totalSize=0}) =>
{
    const _response = {
        result: result,
        error: error,
        message: message,
        totalSize: totalSize
    };
    
    return _response;
}
module.exports = {
    responseBuilder,
    responsePaginationBuilder
}