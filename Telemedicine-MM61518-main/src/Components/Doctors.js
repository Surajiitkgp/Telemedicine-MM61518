import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { mainListItems, secondaryListItems } from './listItems';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { endOfYesterday, startOfWeek, startOfMonth, subMonths } from 'date-fns';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import blood_test from '../images/blood-test.png'
import eye from '../images/left_eye.png'
import health_report from '../images/health-report.png';
import { keyframes } from '@mui/system';
import theme from './theme';
import { app, storage, database } from '../firebase-config';
import { ref, child, get, push, update } from "firebase/database";
import { getStorage, uploadBytes, ref as sref, getDownloadURL, getMetadata } from "firebase/storage";
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import PropTypes from 'prop-types';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function SimpleDialog(props) {
  const { onClose, open, name, description } = props;

  const handleClose = () => {
    onClose('');
  };


  return (
    <Dialog TransitionComponent={Transition} onClose={handleClose} open={open}>
      <DialogTitle>{name}</DialogTitle>
      <DialogContent dividers>
          <Typography gutterBottom>
            {description}
          </Typography>
        </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
const drawerWidth = 240;
const spin = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Tech-Medicine.
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
const mdTheme = createTheme();
export default function Doctors() {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [imgsrc, setImgSrc] = React.useState('https://i.imgur.com/Rbp9NSp.jpg');
  const [popopen, setPopOpen] = React.useState(false);
  const [doctorarray,setDoctorArray] = useState([]);
  const [open, setOpen] = React.useState(true);


  const handleClose = (value) => {
    setPopOpen(false);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };
    let navigate = useNavigate();
    useEffect(() => {
        let uid = sessionStorage.getItem('UID')
        let authToken = sessionStorage.getItem('Auth Token')
        let dbRef = ref(database);
        get(child(dbRef, `doctors`)).then((snapshot) => {
          let snapshot_val = snapshot.val();
          console.log(snapshot_val)
          var temparray = []
          for (const [key, value] of Object.entries(snapshot_val)) {
            var temp = {img: value.image
                          ,title: value.name
                          ,uid: key
                          ,hospital: value.hospital
                          ,detail: value.detail
                          ,rows: 2
                          ,cols: 2
                          ,featured: true,}
            temparray.push(temp)
            
            console.log(doctorarray);
          }
          console.log(temparray)
          setDoctorArray(temparray);
        })
        getDownloadURL(sref(storage, uid + '/profile_pic'))
        .then((url) => {
          setImgSrc(url);
        })
        .catch((error) => {
          console.log(error);
          console.log("Profile picture not available.")
        });
        console.log(authToken)
        console.log(doctorarray);
        if (authToken) {
            navigate('/doctors')
        }

        if (!authToken) {
            navigate('/register')
        }
    }, [])
    return (
      <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Tele-Medicine
            </Typography>
            <RemoveRedEyeIcon
                        sx={{ border: 3, width: 40, height: 30, borderRadius: 2 }}
                    />
                        -
                    <RemoveRedEyeIcon
                        sx={{ border: 3, width: 40, height: 30, borderRadius: 2 }}
                    />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            backgroundImage: `url(https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg)`,
            flexGrow: 1,
            height: '100%',
            overflow: 'hidden',
          }}
        >
            <ImageList sx={{ width: '100%', height: '100%',overflow: 'auto' }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">December</ListSubheader>
      </ImageListItem>
      {doctorarray.map((item) => (
        <ImageListItem key={item.uid}>
          <img
            src={`${item.img}`}
            srcSet={`${item.img}`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.hospital}
            actionIcon={
              <Button
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                key={item.uid}
                variant="contained"
                onClick = {() => {setPopOpen(true); setName(item.title); setDescription(item.detail)}}
              >
                <InfoIcon />
              </Button>
            }
          />
          <SimpleDialog
              open={popopen}
              onClose={handleClose}
              name = {name}
              description = {description}
          />
        </ImageListItem>
      ))}
    </ImageList>
          <Toolbar />
          <Copyright sx={{ pt: 4 }} />
        </Box>
        </Box>
        </ThemeProvider>
    )
}