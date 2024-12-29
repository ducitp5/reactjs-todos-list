import React from 'react';

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      strSearch: ''
    }
  }
  
  handleSearch = () => {
    this.props.onClickGo(this.state.strSearch);
  }

  handleClear = () => {
    this.setState({
      strSearch: ''
    });
    this.props.onClickGo('');
  }
  
  handleChange = (event) => {
    let $strSearch = event.target.value;
    this.setState({
      strSearch: $strSearch
    })
    console.log('handleChange - ', this.state.strSearch,  event.target.value)

    this.props.onClickGo($strSearch);
  }

  render() {
    return (
      <div className="col-md-12 col-lg-7 order-2 order-sm-3">
        <form className="form-inline my-2 my-lg-0 float-lg-right float-none d-block w-100">
          <div className="row m-0">
            <div className="col-8 col-md-9 p-0 -sInput">
              <input value={this.state.strSearch} onChange={this.handleChange} className="form-control w-100" type="search" placeholder="Search" aria-label="Search"/>
            </div>
            <div className="col-4 col-md-3 -sButton p-0 d-flex align-items-center justify-content-center justify-content-sm-end">
              <button onClick={this.handleSearch} className="btn btn-sm btn-outline-success mr-1" type="button">Search</button>
              <button onClick={this.handleClear} className="btn btn-sm btn-outline-warning" type="button">Clear</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
};

export default Search;