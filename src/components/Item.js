import React from 'react';

export class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  handleDelete = (id) => {
    this.props.onClickDelete(id);
  }

  handleEdit = (item) => {
    this.props.onClickEdit(item);
  }

  render() {
    const { item } = this.props;
    const { index } = this.props;
    return (
      <tr>
        <td className="text-center">{index + 1}</td>
        <td className="text-center">{item.time + 'h'}</td>
        <td>{item.name}</td>
        <td>{ item.age }</td>
        <td className="text-center">{this.showElmLevel(item.level)}</td>
        <td>{this.showStatus(item.status)}</td>
        <td>
          <button onClick={() => this.handleEdit(item)} type="button" className="btn btn-outline-warning btn-sm mb-1 mb-lg-0 mr-lg-2">Edit</button>
          <button onClick={() => this.handleDelete(item.id)} type="button" className="btn btn-outline-danger btn-sm">Delete</button>
        </td>
      </tr>
    )
  }

  showStatus(status) {
    let elmStatus = <span className="text-danger">Not Done</span>;
    if (status === 1) {
      elmStatus = <span className="text-success">Done</span>;
    }
    return elmStatus;
  }

  showElmLevel(level) {
    let elmLevel = <span className="badge badge-pill badge-secondary">Low</span>;
    if (level === 1) {
      elmLevel = <span className="badge badge-pill badge-primary">Medium</span>;
    } else if (level === 2) {
      elmLevel = <span className="badge badge-pill badge-danger">High</span>;
    }
    return elmLevel;
  }
};

export default Item;