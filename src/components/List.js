import React from 'react';
import { Item } from './Item';

export class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let items = this.props.items;
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
              <th style={{ width: "15%" }} className="text-center">Level</th>
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