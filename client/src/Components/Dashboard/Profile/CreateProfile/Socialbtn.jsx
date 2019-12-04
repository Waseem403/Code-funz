import React from "react";
import isEmpty from "../../../../validation/is-empty";
import { Link } from "react-router-dom";
import { blue, lightBlue, red, deepOrange } from '@material-ui/core/colors';


function Socialbtn(props) {
  const { profile } = props;

  return (
    <React.Fragment>
      {isEmpty(profile.website) ? (
        ""
      ) : (
          <Link
            href={profile.website}
            target="_blank"
            style={{ marginLeft: '8.2%' }}
          >
            <i className="fas fa-globe fa-1x" style={{ color: lightBlue[500] }} />
          </Link>
        )}
      {isEmpty(profile.social && profile.social.twitter) ? null : (
        <Link
          className="blue accent-1"
          style={{ marginLeft: "15%" }}
          href={profile.social.twitter}
          target="_blank"
        >
          <i className="fab fa-twitter fa-1x" style={{ color: blue['A200'] }} />
        </Link>
      )}
      {isEmpty(profile.social && profile.social.facebook) ? null : (
        <Link

          style={{ marginLeft: "15%" }}
          to={profile.social.facebook}
          target="_blank"
        >
          <i class="fab fa-facebook-f fa-1x" style={{ color: blue[800] }} />{" "}
        </Link>
      )}
      {isEmpty(profile.social && profile.social.linkedin) ? null : (
        <Link
          className="indigo"
          size="large"
          style={{ marginLeft: "15%" }}
          href={profile.social.linkedin}
          target="_blank"
        >
          <i class="fab fa-linkedin-in fa-1x" style={{ color: blue[900] }} />{" "}
        </Link>
      )}
      {isEmpty(profile.social && profile.social.youtube) ? null : (
        <Link

          style={{ marginLeft: "15%" }}
          href={profile.social.youtube}
          target="_blank"
        >
          <i className="fab fa-youtube fa-1x" style={{ color: red[800] }} />
        </Link>
      )}
      {isEmpty(profile.social && profile.social.instagram) ? null : (
        <Link
          style={{
            marginLeft: "15%"
          }}
          href={profile.social.instagram}
          target="_blank"
        >
          <i className="fab fa-instagram fa-1x" style={{ color: deepOrange[600] }} />
        </Link>
      )}
    </React.Fragment>
  );

}

export default Socialbtn;
