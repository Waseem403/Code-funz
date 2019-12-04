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


    //adding the previous data on the componentdidmount life cycle.
    componentDidMount() {
        this.setState({
            handle: this.props.profile.handle,
            company: this.props.profile.company,
            website: this.props.profile.website,
            location: this.props.profile.location,
            work_exp: this.props.profile.work_exp,
            status: this.props.profile.status,
            frontendskills: this.props.profile.frontendskills,
            bussinessskills: this.props.profile.bussinessskills,
            backendskills: this.props.profile.backendskills,
            githubusername: this.props.profile.githubusername,
            DOB: this.props.profile.DOB,
            bio: this.props.profile.bio,
            twitter: this.props.profile.social.twitter,
            facebook: this.props.profile.social.facebook,
            linkedin: this.props.profile.social.linkedin,
            youtube: this.props.profile.social.youtube,
            instagram: this.props.profile.social.instagram,

        })
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
        console.log(typeof this.state.backendskills)
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