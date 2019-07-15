import React from "react";
import  {HeaderCmp}  from "./headerCmp"
import { SearchCmp } from './searchCmp';

interface IProps {
  eggHandleSearch: () => void
  eggHandleBack: () => void
  title: string
}

export const CheckHeader:React.FC<IProps> = (props:IProps) => {
  const {eggHandleSearch, eggHandleBack, title} = props
  return(
    <>
      <HeaderCmp  title={title} 
                  eggHandleBack={eggHandleBack}
                  Children={<SearchCmp eggHandleSearch={eggHandleSearch}/>}>
      </HeaderCmp>
    </>
   )
}



