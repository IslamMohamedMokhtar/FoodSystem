export default class DateTimeUtil{
static DateConvert(dateTimeString: String){
    const parsedDate = new Date(dateTimeString);
    const formattedDate = `${parsedDate.getMonth() + 1}/${parsedDate.getDate()}/${parsedDate.getFullYear()}`;
    return formattedDate;
}
}