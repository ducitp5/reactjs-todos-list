import React from 'react';

export class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleSort = (orderBy, orderDif) => {
    this.props.onClickSort(orderBy, orderDif);
  }

  render() {
    let {orderBy, orderDif} = this.props;

    if (orderBy === "status") {
      if (orderDif === "asc") {
        orderDif = "not done"
      } else if (orderDif === "desc") {
        orderDif = "done"
      }
    }

    let strSort = orderBy + ' - ' + orderDif;

    return (
      <div className="col-12 col-sm-6 col-lg-3 order-2 order-sm-1">
        <ul className="navbar-nav mr-auto flex-sm-row flex-column align-items-center justify-content-lg-start justify-content-center">
          <li className="nav-item dropdown  mb-2 mr-0 mr-sm-3 mb-sm-0">
            <a className="nav-link dropdown-toggle" href="#/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort By</a>
            <div className="dropdown-menu position-absolute" aria-labelledby="navbarDropdown">
              <a onClick={()=>this.handleSort("time", "asc")} className="dropdown-item" href="#/">Time ASC</a>
              <a onClick={()=>this.handleSort("time", "desc")} className="dropdown-item" href="#/">Time DESC</a>
              <div className="dropdown-divider"></div>
              <a onClick={()=>this.handleSort("status", "desc")} className="dropdown-item" href="#/">Done</a>
              <a onClick={()=>this.handleSort("status", "asc")} className="dropdown-item" href="#/">Not Done</a>
              <div className="dropdown-divider"></div>
              <a onClick={()=>this.handleSort("name", "asc")} className="dropdown-item" href="#/">Name ASC</a>
              <a onClick={()=>this.handleSort("name", "desc")} className="dropdown-item" href="#/">Name DESC</a>
              <div className="dropdown-divider"></div>
              <a onClick={()=>this.handleSort("level", "asc")} className="dropdown-item" href="#/">Level ASC</a>
              <a onClick={()=>this.handleSort("level", "desc")} className="dropdown-item" href="#/">Level DESC</a>
            </div>
          </li>
          <li className="nav-item d-flex align-items-center">
            <span className="badge badge-dark">{strSort}</span>
          </li>
        </ul>
      </div>
    )
  }
};

export default Sort;