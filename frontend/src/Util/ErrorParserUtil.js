const parseError = (error) => {
    let errorMessage = '';
    Object.keys(error).forEach(key => {
        if(error[key]!==''&&error[key]!==null)
            errorMessage += `${error[key]}\n`;
        console.log(key);
      });
  return errorMessage;
}
export default parseError;
