import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function EmailSelect(props)  {

  const handleChange = (event) => {
      props.setEmail(event.target.value);
  };

  return (
    <Box sx={{ width: '9vw', marginLeft:'0.5vw' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">이메일 선택</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.email}
          label="이메일 선택"
          onChange={handleChange}
        >
          <MenuItem value={'naver.com'}>naver.com</MenuItem>
          <MenuItem value={'daum.net'}>daum.net</MenuItem>
          <MenuItem value={'hanmail.net'}>hanmail.net</MenuItem>
          <MenuItem value={'nate.com'}>nate.com</MenuItem>
          <MenuItem value={'gmail.com'}>gmail.com</MenuItem>
          <MenuItem value={'yahoo.com'}>yahoo.com</MenuItem>
          <MenuItem value={'write'}>직접 선택</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}