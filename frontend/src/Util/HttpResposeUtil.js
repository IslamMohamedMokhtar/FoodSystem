const HTMLResponseUtil = ({ Task, statusCode, extraMessage=null }) => {
    let message;
    console.log("hena"+extraMessage);
    switch (statusCode) {
        case 200:
            message = `${Task} was Success`;
            break;
        case 401:
            message = extraMessage? extraMessage: `incorrect username or password`;
            break;
        case 404:
            message = `${Task} not found`;
            break;
        case 500:
            message = extraMessage? extraMessage: 'Internal Server Error';
            break;
        default:
            message = 'Unknown';
    }

    return message;
};

export default HTMLResponseUtil;
