import * as React from 'react';
import Button from '@mui/material/Button';

export default function SearchButton(props) {
  const keyword = props.keyword;
  const list = props.list;
  let temp = [];

  const handleClick = () => {
    for(let i=0; i<list.length; i++) {
      if(list[i].name === keyword)
        temp.push(list[i]);
        props.setViewList(temp);
    }
  }

  return (
      <Button variant="outlined" 
              onClick={handleClick}
              sx={{marginTop:'9px', height:55}}>검색</Button>
  );
}