import React from 'react';
import Sort from './Sort';
import Search from './Search';

export class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleAdd = () => {
    this.props.onClickAdd();
  }
  handleClose = () => {
    this.props.onClickAdd();
  }

  render() {
    let form = this.props.showForm;
    let elmShowForm = null;
    let {orderBy, orderDif} = this.props;
    if (form === false) {
      elmShowForm = <button onClick={this.handleAdd} type="button" className="btn btn-outline-info my-2 my-sm-0 btn-block" data-toggle="modal" data-target="#exampleModal">Add Item</button>
    }
    else if (form === true) {
      elmShowForm = <button onClick={this.handleClose} type="button" className="btn btn-outline-warning my-2 my-sm-0 btn-block" data-toggle="modal" data-target="#exampleModal">Close</button>
    }
    return (
      <nav className="navbar d-block navbar-expand-lg navbar-light bg-light">
        <div className="row m-0 ">
          <div className="col-12 col-sm-6 col-lg-2 order-3 order-sm-1">
            {elmShowForm}
          </div>
          <Sort 
            onClickSort={this.props.onClickSort}
            orderBy={orderBy}
            orderDif={orderDif}
          />
          <Search onClickGo={this.props.onClickSearch}/>
        </div>
      </nav>
    )
  }
};

export default Controller;