import React from 'react';
import Media from 'react-media'
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { auth } from './firebase'
import { mapStateToProps, mapDispatchToProps } from './reducers/map.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBell, faEnvelope, faPlusCircle, faToolbox, faHeart } from '@fortawesome/free-solid-svg-icons';
import { createDisplayName } from './helper/helper.js';
import { LANDING } from './constants/routes.js';
import withAuthorization from './session/withAuthorization.js';
import './scss/sidebar.scss';


library.add(faHome);
library.add(faBell);
library.add(faEnvelope);
library.add(faPlusCircle);
library.add(faToolbox);
library.add(faHeart);

class Sidebar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      renderFlag: this.props.renderFlag,
    }
  }

  handleSignOut () {
    const { history } = this.props;

    auth
      .doSignOut()
      .then(() => {
        history.push(LANDING);
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  createMenu = (menulist) => {
    const iconStyle = {
      display: 'inline-block',
      padding: '0 0 0 15px',
      margin: '0',
      textAlign: 'center',
    };

    const labelStyle = {
      display: 'inline-block',
    };

    var menu = [];
    for(let i=0; i< menulist.length; i++){
      menu.push(
        <Row>
          <Media query="(min-width: 950px)">
            {matches => matches ? (
              <NavLink
                exact to={menulist[i].url}
                className="sidebar-button"
                activeClassName="active-sidebar-button"
                style={{textDecoration: "none"}}
              >
                <Col xs={2} style={iconStyle}><FontAwesomeIcon icon={menulist[i].icon} /></Col>
                <Col xs={10} style={labelStyle}>{menulist[i].label}</Col>
              </NavLink>
            ):(
              <NavLink
                exact to={menulist[i].url}
                className="sidebar-button"
                activeClassName="active-sidebar-button"
                style={{textDecoration: "none"}}
              >
                <Col xs={10} className="center-content"><FontAwesomeIcon icon={menulist[i].icon} /></Col>
              </NavLink>
            )

          }
          </Media>
        </Row>
      );
    }
    return (
      menu
    );
  };

  createSubMenu = () => {
    const grouplist = this.props.groups;
    var submenu = [];
    submenu.push(
      <div>
        {grouplist.map((name) => {
          return(
          <Row>
            <NavLink to={'/group/' + name}
              style={{textDecoration: "none"}}
              className="sub-menu-button"
              activeClassName="sub-menu-active">
              {name}
            </NavLink>
          </Row>
        )
        })}
      </div>
    )
    return (
      submenu
    );
  };

  createHPbar(){
    var hpbar = [];
    for(let i=0; i<this.props.status.HP; i++){
      hpbar.push(
        <FontAwesomeIcon className="hp-heart" icon="heart" />
      )
    }
    return hpbar;
  }

  render() {
    const menulist = [
      {icon: "home", label: "myboard", url: "/home"},
      {icon: "bell", label: "notifications", url: "/notifications"},
      {icon: "envelope", label: "messages", url: "/messages"},
      {icon: "toolbox", label: "inventory", url: "/inventory"}
    ];

    return(
      <Col md={2} id="sidebar">
        <Row className="justify-content-md-center">
          <Col xs={8} id="sidebar-logo">logo</Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={8} className="horizontal-line"></Col>
        </Row>
        <Media query="(min-width: 950px)">
          {matches => matches ? (
          <div>
            <Col md={{size: 9, offset: 1}} id="sidebar-login-text">
              logged in as
            </Col>
            <Col md={{size: 8, offset: 1}} id="sidebar-login-user">
              {createDisplayName(this.props.fname, this.props.mname, this.props.lname, this.props.username, false)}
            </Col>
          </div>
          ) : (
          <div>
            <Col md={12} id="sidebar-login-text" className="center-content">
              logged in as
            </Col>
            <Col md={12} id="sidebar-login-user" className="center-content">
              {createDisplayName(this.props.fname, this.props.mname, this.props.lname, this.props.username, false)}
            </Col>
          </div>
          )}
        </Media>
        <Row className="hp-wrap">
          <Col>
            <div className="hp-text">HP:</div>
            {this.createHPbar()}
          </Col>
        </Row>
        {this.createMenu(menulist)}
        <Row className="justify-content-md-center">
          <Col xs={8} className="horizontal-line"></Col>
        </Row>
        <Row>
          <Media query="(min-width: 950px)">
            {matches => matches ? (
              <Col>
                <Col md={12}><NavLink to="/groups" className="sub-menu" style={{textDecoration: "none", paddingLeft: "15px"}}>GROUPS</NavLink>
                <NavLink to="/search">
                  <div className="plus-button"><FontAwesomeIcon icon="plus-circle" /></div>
                </NavLink></Col>
              </Col>
            ):(
              <Col>
                <Col md={12}><NavLink to="/groups" className="sub-menu" style={{textDecoration: "none"}}>GROUPS</NavLink>
                <NavLink to="/search">
                  <div className="plus-button"><FontAwesomeIcon icon="plus-circle" /></div>
                </NavLink></Col>
              </Col>
            )}
          </Media>

        </Row>
        {this.createSubMenu()}
        <Row className="justify-content-md-center">
          <NavLink to={"/groups"} id="show-more" style={{textDecoration: "none"}}>
          show more..
          </NavLink>
        </Row>
        <div className="center-wrap">
          <button className="custom-button-brown" onClick={() => {this.handleSignOut()}}>
            Logout
          </button>
        </div>
      </Col>
    );
  }
}
const authCondition = (authUser) => !!authUser;

export default connect(mapStateToProps, mapDispatchToProps)(withAuthorization(authCondition)(Sidebar));
