import { Button, Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { AuthContext } from '../../common/context/authcontext';


const Profile = () => {
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('user');
    console.log('Successfully erased cache!');
    auth.logout();
    console.log('Successfully logged out!');
  };

  /*return (
    <div>
        <div style = {{
          display:"flex",
          justifyContent:"space-around",
          margin:"18px 0px"
        }}>
          <image style = {{width:"500px", height: "500px"}}
          src= 'https://betting.cdnppb.net/tennis/Roger%20Federer%20Wimbledon%202014.728x523.jpg'  //Later fetch the user image in the backend 
          />   
        </div>    
        <div>
       
          
        </div> 
    </div>
  ); */

 return (
    <React.Fragment>
      <Box    
          component="img"
          sx={{
          display: "flex",
          justifyContent:"space-around",
          margin:"0px 150px",
          height: 233,
          width: 233,
          maxHeight: { xs: 233, md: 233 },
          maxWidth: { xs: 233, md: 233 },
        }}
        alt="The User Image." //Alternate Text: (this image will later be revised)
        src='https://i0.wp.com/short-biography.com/wp-content/uploads/roger-federer/Roger-Federer.jpg?w=932&ssl=1'  //Later fetch the user image in the backend             
      />

    <Box color="white" bgcolor="black" p={1}>
        User.Name
    </Box>
  
      

  

      
      
    
        
        
      
      
      <Box
        height='100vh'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography invariant='h2'>Profile page under construction</Typography>
        <Button
          onClick={handleLogout}
          variant={'contained'}
          size='large'
          sx={{ mt: 5, width: 0.8 }}
        >
          Log out
        </Button>
      </Box>
    </React.Fragment>
  ); 
}; 

 
export default Profile;
