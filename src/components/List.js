import React from 'react';
import { Item } from './Item';
import {levelMap, renderLevelSelectButton} from "help/utils";

export class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLevelDropdown: false
    }
  }

  toggleDropdown = () => {
    this.setState({ showLevelDropdown: !this.state.showLevelDropdown });
  };


  handleLevelSelect = (level) => {
    this.setState({ showLevelDropdown: false });
    this.props.onClickLevelFilter(level); // Trigger level filter in App.js
  };

  render() {
    let items = this.props.items;
    const { showLevelDropdown } = this.state;

    const elmItem = items.map((item, index) => {
      return (
        <Item 
          onClickEdit={this.props.onClickEdit}
          onClickDelete={this.props.onClickDelete} 
          key={index} 
          item={item} 
          index={index}
          />
      )
    });

    return (
      <div className="panel panel-success">
        <table className="table table-hover table-responsive-lg">
          <thead>
            <tr>
              <th style={{ width: "10%" }} className="text-center">#</th>
              <th style={{ width: "10%" }} className="text-center">Time</th>
              <th>Name</th>
              <th>age</th>
              <th style={{ width: "15%" }} className="text-center">
                <div className="dropdown d-inline ml-2">
                  <button
                      onClick={this.toggleDropdown}
                      className="btn btn-secondary btn-sm dropdown-toggle"
                      type="button"
                  >
                    Level
                  </button>
                  {
                      showLevelDropdown &&
                      (
                        <div className="dropdown-menu show">
                          <button className="dropdown-item" onClick={() => this.handleLevelSelect(null)}>
                            All
                          </button>
                          { renderLevelSelectButton(this.handleLevelSelect) }
                        </div>
                      )
                  }
                </div>
              </th>
              <th style={{ width: "15%" }} className="text-center">Status</th>
              <th style={{ width: "15%" }} >Action</th>
            </tr>
          </thead>
          <tbody>
            {elmItem}
          </tbody>
        </table>
      </div>
    )
  }
};

export default List;