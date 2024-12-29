import React from 'react';

export class Footer extends React.Component {
  constructor(props) {
    super(props);
    let today = new Date(), date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(); 
    this.state = {
      date: date
    }
  }
  render(){
    return(
      <div className="card-footer text-muted">
        {this.state.date}
      </div>
    )
  }
};

export default Footer;