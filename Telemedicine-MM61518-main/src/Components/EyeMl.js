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
import InputLabel from '@mui/material/InputLabel';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { mainListItems, secondaryListItems } from './listItems';
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
import health_report from '../images/health-report.png';
import { keyframes } from '@mui/system';
import theme from './theme';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Checkbox from '@mui/material/Checkbox';
import { app, storage, database } from '../firebase-config';
import { ref, child, get, push, update } from "firebase/database";
import { getStorage, uploadBytes, ref as sref, getDownloadURL, getMetadata } from "firebase/storage";
const Input = styled('input')({
    display: 'none',
  });
  
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color:
    theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-cell': {
    align: 'center',
    color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
}));

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

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
export default function EyeMl() {
  var d = new Date();
  const [selectedBloodReport, setSelectedBloodReport] = useState();
	const [isBloodReportPicked, setIsBloodReportPicked] = useState('Finish');
  const changeBloodReport = (event) => {
    console.log(event.target.files[0].name)
	setSelectedBloodReport(event.target.files[0]);
    setIsBloodReportPicked('Ready');
    
  };
  var min_time = new Date(0,0,0,d.getHours());
  var max_time = new Date(0,0,0,17);
  if(d.getHours()<10){
    d.setHours(10, 0, 0, 0);
    min_time.setHours(10, 0, 0, 0);
  }
  if(d.getHours()> 17){
    d.setHours(10, 0, 0, 0);
    d.setDate(d.getDate()+1);
    min_time.setHours(10, 0, 0, 0);
  }
  console.log(d.toLocaleString('en-IN'))
  const [eye,setEye] = React.useState('https://images.pexels.com/photos/801867/pexels-photo-801867.jpeg');
  const [doctorarray,setDoctorArray] = useState([]);
  const [hospitalarray,setHospitalArray] = useState([]);
  const [date, setDate] = React.useState(d);
  const [disease, setDisease] = React.useState("");
  const [percentage, setPercentage] = React.useState("");
  const [open, setOpen] = React.useState(true);
  const [doctor, setDoctor] = React.useState('');
  const [hospital, setHospital] = React.useState('');
  const [tabledata, setTableData] = React.useState([]);
  const [imgsrc, setImgSrc] = React.useState('https://i.imgur.com/Rbp9NSp.jpg');
  const columns = [
    {
      "field": "date",
      "headerName": "Date",
      "width": 250,
      "headerAlign": 'center',
  },
  {
      "field": "doctorName",
      "headerName": "Doctor Name",
      "width": 250,
      "editable": false,
      "headerAlign": 'center',
  },
  {
      "field": "hospital",
      "headerName": "Hospital",
      "width": 300,
      "editable": false,
      "headerAlign": 'center',
  }
  ];
  const toggleDrawer = () => {
    setOpen(!open);
  };
    const handleDoctor = (event) => {
      setDoctor(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      let uid = sessionStorage.getItem('UID');
      console.log(date,doctor,hospital)
      let doctorName;
      let hospitalName;
      for (const doctoruid in doctorarray){
        if(doctorarray[doctoruid]['uid'] == doctor){
          doctorName = doctorarray[doctoruid]['name']
        }
      }
      for (const hospitaluid in hospitalarray){
        if(hospitalarray[hospitaluid]['uid'] == hospital){
          hospitalName = hospitalarray[hospitaluid]['name'];
        }
      }
      let dbRef = ref(database);
      const postData = {
        date: date.toLocaleString('en-IN')
        , doctorName: doctorName
        , hospital: hospitalName
      };
      console.log(postData)
      const updates = {};
      updates['/appointments/' + uid + '/' + hospital+doctor] = postData;
      update(dbRef, updates);
      
      var temp = {"id": hospital+doctor
                  , "date": date.toLocaleString('en-IN')
                  , "doctorName": doctorName
                  , "hospital": hospitalName}
      console.log(temp)
      setTableData([...tabledata, temp]);
      console.log(tabledata);
    };
    const handleHospital = (event) => {
      setHospital(event.target.value);
    };
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token');
        
        if(isBloodReportPicked == 'Ready'){
            console.log(selectedBloodReport)
            console.log(selectedBloodReport.name);
            setIsBloodReportPicked('Finish');
            var reader = new FileReader();
            reader.readAsDataURL(selectedBloodReport);
            reader.onloadend = () => {
                setEye(URL.createObjectURL(selectedBloodReport))
                console.log(URL.createObjectURL(selectedBloodReport));
                var xhr = new XMLHttpRequest()
                xhr.addEventListener('load', () => {
                    console.log(xhr.responseText)
                    setPercentage(JSON.parse(xhr.responseText)['probability'])
                    setDisease(JSON.parse(xhr.responseText)['result'])
                 })
                xhr.open('POST', 'http://127.0.0.1:5000/predict')
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(reader.result))
            };
          
        
    }
        console.log(authToken)
        if (authToken) {
            navigate('/eye-ml')
        }

        if (!authToken) {
            navigate('/register')
        }
    }, [isBloodReportPicked])
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
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "100%",
                  }}
                >
                 <Card sx={{ maxWidth: 275  }}>
                      <div>
                      <CardMedia
                          component="img"
                          alt="blood_test"
                          height="10%"
                          image={eye}
                      />
                      </div>
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                          Upload Eye Sample
                          </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: "center" }}>
                      <label htmlFor="contained-button-file-1">
                        <Input accept="image/*|*.pdf" id="contained-button-file-1" multiple type="file" onChange={changeBloodReport} />
                        <Button size = "small" component="span" type="button" >
                          Upload
                        </Button>
                      </label>
                      </CardActions>
                    </Card>
                <Typography gutterBottom variant="h4" component="div">
                {disease}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                {percentage}
                </Typography>
                </Paper>
                

              </Grid>

              
            </Grid>
            <Copyright sx={{ pt: 4 }} />
            <Grid item>
            {/* <Typography variant="caption">
              {'Icons made by '}
              <Link href="https://www.freepik.com" rel="sponsored" title="Freepik">
                Freepik
              </Link>
              {' from '}
              <Link href="https://www.flaticon.com" rel="sponsored" title="Flaticon">
                www.flaticon.com
              </Link>
              {' is licensed by '}
              <Link
                href="https://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC 3.0
              </Link>
            </Typography> */}
          </Grid>
          </Container>
          </Box>
        </Box>
        </ThemeProvider>
    )
}