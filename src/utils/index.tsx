 export const format=(date:any)=>{
   if(date) {
    let mday = date.getDate();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    mday = mday < 10 ? `0${mday}` : mday;
    return `${date.getFullYear()}-${month}-${mday}`;
   }
  }

export const getStar = (star: number) => {
  if(star === 1) {
    return '一星'
  }
  else if(star === 2) {
    return '二星'
  }
  else if(star === 3) {
    return '三星'
  }
  else if(star === 4) {
    return '四星'
  }
  else if(star === 5) {
    return '五星'
  }
}
 