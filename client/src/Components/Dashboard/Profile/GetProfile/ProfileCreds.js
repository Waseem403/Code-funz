import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Moment from "react-moment";
import Divider from "@material-ui/core/Divider";



export default function ProfileCreds(props) {
  const { experience, education } = props;

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const expItems = experience.map(exp => (
    <React.Fragment>
      <ExpansionPanelDetails>
        <Typography variant="caption" display="block" gutterBottom>
          <b>company name : </b> {exp.company}{" "}
        </Typography>
      </ExpansionPanelDetails>
      <ExpansionPanelDetails>
        <Typography>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            " Now"
          ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
        </Typography>
      </ExpansionPanelDetails>
      <ExpansionPanelDetails>
        <Typography variant="caption" display="block" gutterBottom>
          <b> Position: </b> {exp.title}{" "}
        </Typography>
      </ExpansionPanelDetails>
      <ExpansionPanelDetails>
        <Typography variant="caption" display="block" gutterBottom>
          {exp.location === "" ? null : (
            <span>
              <b> Location: </b> {exp.location}{" "}
            </span>
          )}
        </Typography>
      </ExpansionPanelDetails>
      <ExpansionPanelDetails>
        <Typography variant="caption" display="block" gutterBottom>
          {exp.description === "" ? null : (
            <span>
              <b> Description: </b> {exp.description}{" "}
            </span>
          )}
        </Typography>
      </ExpansionPanelDetails>
      <Divider />
    </React.Fragment>
  ));

  const eduItems = education.map(edu => (
    <React.Fragment>
      <ExpansionPanelDetails>
        <Typography variant="caption" display="block" gutterBottom>
          <b>school name : </b> {edu.school}{" "}
        </Typography>
      </ExpansionPanelDetails>
      <ExpansionPanelDetails>
        <Typography variant="caption" display="block" gutterBottom>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            " Now"
          ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}
        </Typography>
      </ExpansionPanelDetails>
      <ExpansionPanelDetails>
        <Typography variant="caption" display="block" gutterBottom>
          <b> Degree: </b> {edu.degree}{" "}
        </Typography>
      </ExpansionPanelDetails>
      <ExpansionPanelDetails>
        <Typography variant="caption" display="block" gutterBottom>
          <b> Field Of Study: </b> {edu.fieldofstudy}{" "}
        </Typography>
      </ExpansionPanelDetails>
      <ExpansionPanelDetails>
        <Typography variant="caption" display="block" gutterBottom>
          {edu.description === "" ? null : (
            <span>
              <b> Description: </b> {edu.description}{" "}
            </span>
          )}
        </Typography>
      </ExpansionPanelDetails>
      <Divider />
    </React.Fragment>
  ));

  return (
    <div>
      {eduItems.length > 0 ? (
        <ExpansionPanel
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography variant="subtitle2" gutterBottom>
              {" "}
              <i class="fas fa-user-graduate" /> education details{" "}
            </Typography>
          </ExpansionPanelSummary>
          {eduItems}
        </ExpansionPanel>
      ) : (
          <ExpansionPanel
            square
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography variant="subtitle2" gutterBottom>
                {" "}
                <i class="fas fa-user-graduate" /> education details{" "}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className="red-text darken-4-text">
                <b>
                  {" "}
                  education details is not listed by the current profile user{" "}
                </b>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}

      {expItems.length > 0 ? (
        <ExpansionPanel
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography variant="subtitle2" gutterBottom>
              {" "}
              <i class="fas fa-briefcase" /> professional details{" "}
            </Typography>
          </ExpansionPanelSummary>
          {expItems}
        </ExpansionPanel>
      ) : (
          <ExpansionPanel
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography variant="subtitle2" gutterBottom>
                {" "}
                <i class="fas fa-briefcase" /> professional details{" "}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className="red-text darken-4-text">
                <b>
                  professional details is not listed by the current profile user
              </b>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
    </div>
  );
}
