 export const format=(date:any)=>{
   if(date) {
    let mday = date.getDate();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    mday = mday < 10 ? `0${mday}` : mday;
    return `${date.getFullYear()}-${month}-${mday}`;
   }
  }

 