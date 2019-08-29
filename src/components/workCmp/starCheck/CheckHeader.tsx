import React from "react";
import { HeaderCmp } from "../../headerCmp/headerCmp"
import { SearchCmp } from './searchCmp';
import { StarCheckTypes, SearchTypes } from "../../../utils/enum";

interface IProps {
  eggHandleSearch: (type: SearchTypes) => void
  eggHandleBack: () => void
  title: string
  searchIn: boolean
}

export const CheckHeader: React.FC<IProps> = (props: IProps) => {
  const { eggHandleSearch, eggHandleBack, title, searchIn } = props
  const getType = () => {
    if (title === StarCheckTypes.wait_handle) {
      return SearchTypes.wait_handle
    }
    else if (title === StarCheckTypes.processing_record) {
      return SearchTypes.processing_record
    }
    else if (title === StarCheckTypes.wait_reception) {
      return SearchTypes.wait_reception
    }
    else if (title === StarCheckTypes.wait_sponsor) {
      return SearchTypes.wait_sponsor
    }
  }
  return (
    <>
      {
        searchIn? 
        <HeaderCmp title={title} eggHandleBack={eggHandleBack} />
        : 
        <HeaderCmp title={title}
          eggHandleBack={eggHandleBack}
          Children={<SearchCmp type={getType()} eggHandleSearch={eggHandleSearch} />}>
        </HeaderCmp>
      }
    
    </>
  )
}



