import React from 'react';
import { Item } from './Item';
import {levelMap, renderLevelSelectButton} from "help/utils";

export class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLevelDropdown: false,
      currentPage: 1,
      itemsPerPage: 0
    }
  }

  toggleDropdown = () => {
    this.setState({ showLevelDropdown: !this.state.showLevelDropdown });
  };


  handleLevelSelect = (level) => {
    this.setState({ showLevelDropdown: false });
    this.props.onClickLevelFilter(level); // Trigger level filter in App.js
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handleItemsPerPageChange = (event) => {
    const itemsPerPage = Number(event.target.value);
    this.setState({
      itemsPerPage,
      currentPage: 1 // Reset to first page when items per page changes
    });
  };

  render() {
    let items = this.props.items;
    const { showLevelDropdown, currentPage, itemsPerPage } = this.state;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = itemsPerPage ? items.slice(indexOfFirstItem, indexOfLastItem) : items;

    const elmItem = currentItems.map((item, index) => {
      return (
        <Item 
          onClickEdit={this.props.onClickEdit}
          onClickDelete={this.props.onClickDelete}
          key={item.id}
          item={item}
          index={indexOfFirstItem + index} // Maintain the correct index
        />
      )
    });

    const totalPages = itemsPerPage ? Math.ceil(items.length / itemsPerPage) : Math.ceil(items.length);

    return (
      <div className="panel panel-success">
        {/* Pagination and Items per Page Controls */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="pagination">
            {
              Array.from(
                { length: itemsPerPage ? totalPages : 1},
                  (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => this.handlePageChange(index + 1)}
                        className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      {index + 1}
                    </button>
                  )
              )
            }
          </div>

          <div className="ml-auto">
            <label className="mr-2">Items per page:</label>
            <input
                type="number"
                min="1"
                value={itemsPerPage}
                onChange={this.handleItemsPerPageChange}
                className="form-control d-inline-block"
                style={{ width: "80px" }}
            />
          </div>
        </div>

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