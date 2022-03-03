import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Card,
  DialogContent,
  Grid,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import React from 'react';
import FormContainer from '../../common/components/FormElement/FormContainer';

const NewCard = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Card
        sx={{
          width: 1,
          height: 1,
          ':hover': {
            boxShadow: 10,
          },
        }}
        style={{
          borderStyle: 'dashed',
          borderColor: '#49b02a',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        elevation={0}
        onClick={handleOpen}
      >
        <IconButton color='secondary'>
          <AddIcon sx={{ fontSize: 100 }} />
        </IconButton>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
        sx={{ mt: 8 }}
      >
        <DialogContent>
          <FormContainer>
            <Typography
              variant='h3'
              gutterBottom
              marked='center'
              align='center'
              sx={{ mb: 4 }}
            >
              Start a new appointment
            </Typography>

            <Grid container>
              <Grid item xs={6} sm={6} align='center' justify='center'>
                <Button
                  variant={'contained'}
                  size='large'
                  sx={{ mt: 5, width: 0.8 }}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={6} sm={6} align='center' justify='center'>
                <Button
                  variant={'contained'}
                  size='large'
                  sx={{ mt: 5, width: 0.8 }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </FormContainer>
        </DialogContent>
      </Modal>
    </React.Fragment>
  );
};

export default NewCard;
