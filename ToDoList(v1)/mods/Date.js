exports.getDate = ()=>{
    let options = {
        weekday: 'long',
        day    : 'numeric',
        month  : 'long'
    
    }; 
    let today = new Date().toLocaleDateString("en-US",options);
    return today;
}

exports.getDaysNo = ()=>{
    let options = {
        day    : 'numeric',    
    }; 
    let today = new Date().toLocaleDateString("en-US",options);
    return today;
}

exports.getWeekDay = ()=>{
    let options = {
        weekday: 'long'
    }; 
    let wd = new Date().toLocaleDateString("en-US",options);
    return wd;
}

