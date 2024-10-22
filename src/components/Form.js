import React from 'react';

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task_id: '',
      task_name: '',
      task_level: 0,
      task_time: 0,
      task_status: 0,
    }
  };

  UNSAFE_componentWillMount() {    
    this.updateItem(this.props.itemSelected)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.updateItem(nextProps.itemSelected)
  }

  updateItem(item) {
    if (item !== null) {
      this.setState({
        task_id: item.id,
        task_name: item.name,
        task_level: item.level,
        task_time: item.time,
        task_status: item.status,
      })
    }
  }

  handleCancel = () => {
    this.props.onClickCancel();
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    let item = {
      id: this.state.task_id,
      name: this.state.task_name,
      level: this.state.task_level,
      time: this.state.task_time,
      status: this.state.task_status
    }
    this.props.onClickSubmit(item);
    event.preventDefault();
  }

  render() {  
    return (
      <form onSubmit={this.handleSubmit} className="row m-2" action="">
        <div className="col-lg-2 col-sm-12 mt-3 mb-3 mt-md-0 mb-md-0 col-md-2">
          <div className="text-center">
            <select value={this.state.task_time} onChange={this.handleChange} name="task_time" className="form-control">
              <option value={0}>0h</option>
              <option value={1}>1h</option>
              <option value={2}>2h</option>
              <option value={3}>3h</option>
              <option value={4}>4h</option>
              <option value={5}>5h</option>
              <option value={6}>6h</option>
              <option value={7}>7h</option>
              <option value={8}>8h</option>
              <option value={9}>9h</option>
              <option value={10}>10h</option>
              <option value={11}>11h</option>
              <option value={12}>12h</option>
              <option value={13}>13h</option>
              <option value={14}>14h</option>
              <option value={15}>15h</option>
              <option value={16}>16h</option>
              <option value={17}>17h</option>
              <option value={18}>18h</option>
              <option value={19}>19h</option>
              <option value={20}>20h</option>
              <option value={21}>21h</option>
              <option value={22}>22h</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4 col-sm-12 col-md-3 p-md-0">
          <div>
            <input value={this.state.task_name} onChange={this.handleChange} name="task_name" type="text" className="form-control" placeholder="Name"/>
          </div>
        </div>
        <div className="col-lg-2 col-sm-12 mt-3 mb-3 mt-md-0 mb-md-0 col-md-2">
          <div className="text-center">
            <select value={this.state.task_level} onChange={this.handleChange} name="task_level" className="form-control">
              <option value={0}>Low</option>
              <option value={1}>Medium</option>
              <option value={2}>High</option>
            </select>
          </div>
        </div>
        <div className="col-lg-2 col-sm-12 mb-3 mt-md-0 mb-md-0 col-md-2">
          <div className="text-center">
            <select value={this.state.task_status} onChange={this.handleChange} name="task_status" className="form-control">
              <option value={0}>Not Done</option>
              <option value={1}>Done</option>
            </select>
          </div>
        </div>
        <div className="col-lg-2 col-sm-6 mx-auto d-flex justify-content-center col-md-3 d-flex align-items-center mb-2 mt-2 mt-sm-0 mb-sm-0 mt-lg-0">
          <div className="button-group">
            <button type="submit" className="btn btn-sm btn-outline-success mr-2">Save</button>
            <button onClick={this.handleCancel} type="button" className="btn btn-outline-warning btn-sm">Cancel</button>
          </div>
        </div>
      </form>
    )
  }
};

export default Form;