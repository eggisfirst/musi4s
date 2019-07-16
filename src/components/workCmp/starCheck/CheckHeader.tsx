import React from "react";
import  {HeaderCmp}  from "./headerCmp"
import { SearchCmp } from './searchCmp';
import { StarCheckTypes } from "../../../utils/enum";

interface IProps {
  eggHandleSearch: () => void
  eggHandleBack: () => void
  title: StarCheckTypes
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



