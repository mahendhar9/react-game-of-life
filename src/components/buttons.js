import React, { Component } from 'react';
import { ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';

class Buttons extends Component {
  handleSelect = (evt) => {
    this.props.gridSize(evt);
  }

  render() {
    return (
        <div className="center">
          <ButtonToolbar>
            <button className="btn btn-default" onClick={this.props.playButton}>Play</button>
            <button className="btn btn-default" onClick={this.props.pauseButton}>Pause</button>
            <button className="btn btn-default" onClick={this.props.clear}>Clear</button>
            <button className="btn btn-default" onClick={this.props.populate}>Populate</button>
            <button className="btn btn-default" onClick={this.props.slow}>Slow</button>
            <button className="btn btn-default" onClick={this.props.fast}>Fast</button>
            <DropdownButton
              title="Grid Size"
              id="size-menu"
              onSelect={this.handleSelect}
            >
              <MenuItem eventKey="1">10 x 20</MenuItem>
              <MenuItem eventKey="2">30 x 50</MenuItem>
              <MenuItem eventKey="3">50 x 70</MenuItem>
            </DropdownButton>
          </ButtonToolbar>
        </div>
    );
  }
}

export default Buttons;