
import { Avatar } from '@mui/material';
import { Button, Box, Typography, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useContext } from 'react';
import HomeBackground from '../../common/components/ViewElement/HomeBackground';
import { AuthContext } from '../../common/context/authcontext';


const Profile = () => {
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('user');
    console.log('Successfully erased cache!');
    auth.logout();
    console.log('Successfully logged out!');
  };

 return (
    <React.Fragment>
      <div style={{
        maxWidth: "1000px",
        margin: "0px auto",
        
        
      }}>
        <div style={{
          display: "flex",
          justifyContent:"space-around",
          margin:"18px 0px",
          borderBottom:"10px solid grey"
        }}>
          <div>
            <img style={{width: "200px", height: "200px", borderRadius:"100px"}}
            src='https://i0.wp.com/short-biography.com/wp-content/uploads/roger-federer/Roger-Federer.jpg?w=932&ssl=1'  //换成用户props的头像
            />
          </div>
          <div style =
            {{
              color:"black",
              textAlign:"left"
              }}>
            <h3>Roger Federer</h3> 
            <div style ={{
              color:"grey",
              textAlign:"justify",
              justifyContent:"space-between",   //用userStruct的info代替
              width: "108%",
              }}> 
              <h4>Rating: 5</h4>  
              <h4>Region: Westwood</h4>
              <h4>Gender: Male</h4>
              <h4>Ongoing 'Serves': 1</h4>
            </div>
            
          </div>
          
        </div>
        
        <div className='serves'> 
          <img className="item" src ='https://images.unsplash.com/photo-1499510318569-1a3d67dc3976?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80'/>
          <img className="item" src ='https://images.unsplash.com/photo-1620742820748-87c09249a72a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80'/>
          <img className="item" src ='https://images.unsplash.com/photo-1480180566821-a7d525cdfc5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'/>
          <img className="item" src ='https://images.unsplash.com/photo-1551773188-0801da12ddae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'/>
          <img className="item" src ='https://images.unsplash.com/photo-1603404395085-1c3d6764ca9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=812&q=80'/>
          <img className="item" src ='https://images.unsplash.com/photo-1510846699902-9211b99dac11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'/>
        </div>
      </div>
      
      {//later replace with appointment info, 可以做翻开的然后显示信息的（美观）}
   
      <Box
        height='20vh'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography invariant='h2'>Profile page is still under construction...</Typography>
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