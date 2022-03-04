import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { IconButton, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';

const Quiz = () => {
  const [open, setOpen] = React.useState(false);
  const [openResult, setOpenResult] = React.useState(false);
  const [result, setResult] = React.useState(0);

  const [value1, setValue1] = React.useState(-1);
  const [value2, setValue2] = React.useState(-1);
  const [value3, setValue3] = React.useState(-1);
  const [value4, setValue4] = React.useState(-1);
  const [value5, setValue5] = React.useState(-1);

  var answers = [];

  const resetStates = () => {
    setValue1(-1);
    setValue2(-1);
    setValue3(-1);
    setValue4(-1);
    setValue5(-1);
  };

  const handleClickOpen = () => {
    setOpen(true);
    resetStates();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRadioChange1 = (event) => {
    setValue1(event.target.value);
  };

  const handleRadioChange2 = (event) => {
    setValue2(event.target.value);
  };

  const handleRadioChange3 = (event) => {
    setValue3(event.target.value);
  };

  const handleRadioChange4 = (event) => {
    setValue4(event.target.value);
  };

  const handleRadioChange5 = (event) => {
    setValue5(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    answers.push(value1);
    answers.push(value2);
    answers.push(value3);
    answers.push(value4);
    answers.push(value5);

    setResult(rating(answers));
    handleClose();
    setOpenResult(true);
  };

  const handleCloseResult = () => {
    setOpenResult(false);
  };

  function rating(answers) {
    let rate = 0;

    const numAnswers = answers.map((x) => Number(x));
    
    for (let i = 0; i < answers.length; i++) {
      if (numAnswers[i] === 2) {
        numAnswers[i] = 0;
      }
      rate += numAnswers[i];
    }
    if (rate === 0) {
      return 1;
    }
    return rate;
  }

  return (
    <>
      <Tooltip title='Not sure about your rating? Take a quiz here!'>
        <IconButton aria-label='quiz' sx={{ px: 0 }} onClick={handleClickOpen}>
          <QuestionMarkIcon sx={{ mt: 1.5, fontSize: 28 }} />
        </IconButton>

        {/* <Button
            variant='outlined'
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
            onClick={handleClickOpen}
          >
            Take the skill rating quiz here!
          </Button> */}
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <form>
          <FormControl sx={{ m: 3 }} variant='standard'>
            <FormLabel id='q1'>
              1. You understand the basic rules of tennis and have played at
              least a few times.
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby='q1'
              name='level1'
              value={value1}
              onChange={handleRadioChange1}
            >
              <FormControlLabel value={1} control={<Radio />} label='Yes' />
              <FormControlLabel value={0} control={<Radio />} label='No' />
            </RadioGroup>
          </FormControl>
        </form>
        <form>
          <FormControl sx={{ m: 3 }} variant='standard'>
            <FormLabel id='q2'>2. You can hit basic ground stroke</FormLabel>
            <RadioGroup
              row
              aria-labelledby='q2'
              name='level2'
              value={value2}
              onChange={handleRadioChange2}
            >
              <FormControlLabel value={1} control={<Radio />} label='Yes' />
              <FormControlLabel value={0} control={<Radio />} label='No' />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label='Not Applicable'
              />
            </RadioGroup>
          </FormControl>
        </form>
        <form>
          <FormControl sx={{ m: 3 }} variant='standard'>
            <FormLabel id='q3'>
              3. You can rally consistenly 10 balls in a row and comfortable
              with net play
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby='q3'
              name='level3'
              value={value3}
              onChange={handleRadioChange3}
            >
              <FormControlLabel value={1} control={<Radio />} label='Yes' />
              <FormControlLabel value={0} control={<Radio />} label='No' />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label='Not Applicable'
              />
            </RadioGroup>
          </FormControl>
        </form>
        <form>
          <FormControl sx={{ m: 3 }} variant='standard'>
            <FormLabel id='q4'>
              4. You can serve inside the service box with little double fault
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby='q4'
              name='level4'
              value={value4}
              onChange={handleRadioChange4}
            >
              <FormControlLabel value={1} control={<Radio />} label='Yes' />
              <FormControlLabel value={0} control={<Radio />} label='No' />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label='Not Applicable'
              />
            </RadioGroup>
          </FormControl>
        </form>
        <form>
          <FormControl sx={{ m: 3 }} variant='standard'>
            <FormLabel id='q5'>
              5. You can hit ball consistently with depth, power and spin on
              serves
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby='q5'
              name='level5'
              value={value5}
              onChange={handleRadioChange5}
            >
              <FormControlLabel value={1} control={<Radio />} label='Yes' />
              <FormControlLabel value={0} control={<Radio />} label='No' />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label='Not Applicable'
              />
            </RadioGroup>
          </FormControl>
        </form>
        <DialogActions>
          <Button variant='contained' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={handleSubmit}
            disabled={
              value1 === -1 ||
              value2 === -1 ||
              value3 === -1 ||
              value4 === -1 ||
              value5 === -1
            }
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openResult}
        onClose={handleCloseResult}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"Here's your result!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Your tennis skill level is: {result}.0
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResult}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Quiz;
