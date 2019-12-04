import React from "react";
import Footer from "../../../../Layouts/Footer";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';




const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },  
   paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
   avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  bottoms:{
    marginBottom: theme.spacing(10),
  }
}));


function PersonalDetails(props)
{
  const classes = useStyles();
  const { values, handleChange } = props;
 const continues = e => {
    e.preventDefault();
    props.nextStep();
  };


    return (
      <React.Fragment>
        <section className={classes.bottoms}>
       <Container component="main"  maxWidth="md" >
       <CssBaseline />
       <Grid container spacing={2}>
       <Grid item xs={12}>
       <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        personal Details
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
        Let's get some personal information to make your profile stand out
               </Typography>
               </div>
               </Grid>
               </Grid>
           <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
        id="handle"
        label="* Profile handle"
        fullWidth
        name="handle"
        className={classes.textField}
        value={values.handle}
        onChange={handleChange("handle")}
        margin="normal"
        helperText=" A unique handle for your profile URL. Your full name, company
        name, nickname"
      />
           </Grid>
           <Grid item xs={12}>
       <FormControl className={classes.formControl} style={{minWidth: '100%'}}>
        <InputLabel htmlFor="status">status</InputLabel>
        <Select
        fullWidth
        
         value={values.status}
         onChange={handleChange("status")}
          inputProps={{
            name: 'status',
            id: 'status',
          }}
        >
          <MenuItem value="Developer">Developer</MenuItem>
          <MenuItem value="Junior Developer">Junior Developer</MenuItem>
          <MenuItem value="Senior Developer">Senior Developer</MenuItem>
          <MenuItem value="Manager">Manager</MenuItem>
          <MenuItem value="Student or Learning">Student or Learning</MenuItem>
          <MenuItem value="Instructor or Teacher">Instructor or Teacher</MenuItem>
          <MenuItem value="Intern">Intern</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        <FormHelperText>Give us an idea of where you are at in your career</FormHelperText>
      </FormControl>
           </Grid>
           <Grid item xs={12}>
            <TextField
        id="company"
        label="* company"
        fullWidth
        name="company"
        value={values.company}
        onChange={handleChange("company")}
        margin="normal"
        helperText="Could be your own company or one you work for"
      />
           </Grid>
           <Grid item xs={12}>
            <TextField
        id="website"
        label="website"
        fullWidth
        name="website"
        value={values.website}
        onChange={handleChange("website")}
        margin="normal"
        helperText="Could be your company or own website URL"
      />
           </Grid>
       <Grid item xs={12} sm={6} md={6} lg={6}>
       <TextField
        id="location"
        label=" * location"
        fullWidth
        name="location"
        value={values.location}
        onChange={handleChange("location")}
        margin="normal"
        helperText="City or city & country suggested (eg. Boston, MA or mumbai,india)"
      />
       </Grid>
       <Grid item xs={12} sm={6} md={6} lg={6}>
       <TextField
        id="work_exp"
        label=" * Work experience"
        fullWidth
        name="work_exp"
        value={values.work_exp}
        onChange={handleChange("work_exp")}
        margin="normal"
        helperText="Your work eperience (eg.1,2..etc years of work exp)"
      />
       </Grid>
          </Grid>
       </Container>
        </section>
        <Footer />

         <Fab color="primary" size="small" aria-label="add" style={{
         right: '1%',
         bottom: '20%',
         position: 'fixed',
       }}  onClick={continues} >
         <ArrowForwardIcon />
       </Fab>
      </React.Fragment>
    );
  }


export default PersonalDetails;
