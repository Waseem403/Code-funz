import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  PingTodos,
  deleteTodos,
  deleteLabels
} from "../../../../../../../actions/profileActions";
import { SetTodosComplete } from "../../../../../../../actions/ProfilePosts"
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import TodoRemind from "./TodoRemind";
import TodoMenu from "./TodoMenu";
import ColorMenu from "./ColorMenu";
import { Animated } from "react-animated-css";
import TagLabels from "./TagLabels";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RemainderCounter from "./RemainderCounter"
import Checkbox from '@material-ui/core/Checkbox';



const styles = muiBaseTheme => ({
  container: {
    marginTop: muiBaseTheme.spacing(3),
    marginBottom: muiBaseTheme.spacing(6),
    [muiBaseTheme.breakpoints.up('sm')]: {
      paddingLeft: muiBaseTheme.spacing(25)
    },
  },

  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "1.5s",
    borderRadius: '8px',
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3,

  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardAction: {
    marginTop: muiBaseTheme.spacing(1),
    marginBottom: muiBaseTheme.spacing(1)
  },
  Completestatus: {
    textDecoration: "none!important",
    color: "white",
    fontWeight: "bold"
  }
});


class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: true,
      id: "",
      errors: {}
    };
  }



  //deleting the note function..
  onDeleteClick(id) {
    this.props.deleteTodos(id);
    this.setState({
      isVisible: false,
      id: id
    });
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  //handle status of the todos

  handleStatus = (id) => {
    const Todos_status = {
      id: id,
      TodoStatus: true
    }
    this.props.SetTodosComplete(Todos_status)
  }





  render() {
    const { profile } = this.props;
    const { classes } = this.props
    let TodoLength = profile.Todolist.length;
    let TodoItems;

    if (TodoLength === 0) {
      TodoItems = (
        <React.Fragment>
          <div alignItem="center">
            <i className="fas fa-trophy center-align fa-8x" />
            <Typography component="h2" variant="h5">Your queue is empty. High five your neighbour!</Typography>
          </div>
        </React.Fragment>
      );
    } else if (TodoLength !== 0) {
      TodoItems = profile.Todolist.map((items, index) => (<Grid item xs={12} sm={4} md={4} lg={4} key={items._id}>
        <Badge
          color="secondary"
          badgeContent={<i class="fas fa-info-circle"></i>}
          invisible={items.TodoPing === true ? false : true}
        >
          <Animated
            animationOut="fade"
            isVisible={
              true
            }
            animationOutDuration={10000}
          >
            <Card className={classes.card} style={{ backgroundColor: items.color }}>
              <CardContent className={classes.content}>
                <Grid item align="right">
                  {
                    items.color === "red" || items.color === "#66bb6a" ?
                      <Tooltip title="delete note" placement="top" >
                        <IconButton
                          size="small"
                          onClick={this.onDeleteClick.bind(this, items._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip> :
                      <Tooltip title="mark as done" placement="top">
                        <Checkbox
                          checked={items.TodoStatus}
                          color="primary"
                          value={true}
                          onChange={this.handleStatus.bind(this, items._id)}
                          inputProps={{
                            'aria-label': 'primary checkbox',
                          }}
                        />
                      </Tooltip>
                  }
                </Grid>
                <Typography variant="h6" component="h2" style={{ textDecoration: items.color === "#66bb6a" || items.color === "red" ? "line-through" : "none" }}>
                  <b>{items.TodoTitle}</b>
                </Typography>

                <Typography variant="caption" display="block" gutterBottom style={{ textDecoration: items.color === "#66bb6a" || items.color === "red" ? "line-through" : "none" }}>
                  {items.TodoDesc}
                </Typography>
                <TagLabels labels={items} />
                {items.color === "#66bb6a" ? <Typography align="center" variant="h5" component="h2" className={classes.Completestatus} gutterBottom>Great Job ! <i className="far fa-thumbs-up"></i></Typography> : null}
                {items.RemainderDate === undefined ? null : <RemainderCounter remdate={items.RemainderDate} todoid={items._id} />}
              </CardContent>
              <CardActions className={classes.cardAction} style={{ display: items.color === "red" || items.color === "#66bb6a" ? 'none' : 'block' }}>
                <Grid container>
                  <Grid item xs={3} align="center" >
                    <TodoRemind items={items} />
                  </Grid>
                  <Grid item xs={3} align="center" >
                    <ColorMenu items={items} />
                  </Grid>
                  <Grid item xs={3} align="center">
                    <Tooltip title="delete note" placement="top" >
                      <IconButton
                        size="small"
                        onClick={this.onDeleteClick.bind(this, items._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={3} align="center" >
                    <TodoMenu items={items} state={this.state} />
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Animated>
        </Badge>
      </Grid>
      )
      );
    }

    return (
      <React.Fragment>
        <Container component="main" maxWidth="lg" className={classes.container}>
          <CssBaseline />
          <Grid container spacing={4}>{TodoItems}</Grid>
        </Container>
      </React.Fragment>
    );
  }
}

TodoList.propTypes = {
  PingTodos: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { PingTodos, deleteTodos, deleteLabels, SetTodosComplete }
)(withStyles(styles)(TodoList));
