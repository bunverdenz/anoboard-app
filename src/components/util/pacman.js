import React from 'react';
import Loader from 'react-loaders';
import { Container, Row, Col } from 'react-bootstrap';
import '../../scss/util.scss'

class Pacman extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Fullscreen:  this.props.Fullscreen//this.props.fullscreen,
    }
  }
  render() {
    return(
      <Container fluid className={this.state.Fullscreen? "fullscreen-wrap":""}>
        <Row className="justify-content-center" style={{height: "100%"}}>
          <div className="col-xs-12 center-vertical">
            <div className="loaders single">
              <div className="loader-container">
                <div className="loader loader-active">
                  <div className="loader-inner pacman">
                    <div /><div /><div /><div /><div />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
      );
  }
}

export default Pacman;
