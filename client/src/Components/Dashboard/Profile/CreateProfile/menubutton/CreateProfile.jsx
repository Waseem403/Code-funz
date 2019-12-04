import React, { Component } from "react";
import PersonalDetails from "./PersonalDetails";
import Skills from "./Skills";
import SocialMedia from "./SocialMedia";
import Bio from "./Bio";
import Confirm from "./Confirm";




class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      handle: "",
      company: "",
      website: "",
      location: "",
      work_exp: "",
      status: "",
      frontendskills: "",
      bussinessskills: "",
      backendskills: "",
      githubusername: "",
      DOB: null,
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }



  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  handleDateChange = date => {
    this.setState({ DOB: date })
  }

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  render() {
    const { step } = this.state;
    console.log(this.props.profile)

    const {
      handle,
      status,
      company,
      website,
      location,
      work_exp,
      frontendskills,
      bussinessskills,
      backendskills,
      githubusername,
      DOB,
      bio,
      facebook,
      twitter,
      youtube,
      instagram,
      linkedin
    } = this.state;
    const values = {
      handle,
      status,
      company,
      website,
      location,
      work_exp,
      frontendskills,
      bussinessskills,
      backendskills,
      githubusername,
      DOB,
      bio,
      facebook,
      twitter,
      youtube,
      instagram,
      linkedin
    };
    switch (step) {
      case 1:
        return (
          <PersonalDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <Skills
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <SocialMedia
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <Bio
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            handleDate={this.handleDateChange}
          />
        );
      case 5:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      default:
        return ""
    }
  }
}


export default CreateProfile;