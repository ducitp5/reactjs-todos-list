import React from 'react';
import './App.css';
import { Logo } from './components/Logo';
import { Header } from './components/Header';
import { Controller } from './components/Controller';
import { Form } from './components/Form';
import { List } from './components/List';
import { Footer } from './components/Footer';
// import items from './mocks/tasks';
import {filter, includes, orderBy as funcOrderBy, remove, reject} from 'lodash';
import uuid from 'react-uuid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemSelected: null, 
      showForm: false,
      strSearch: "",
      orderBy: "time",
      orderDif: "asc",
      filterLevel: null // Add filter level to state
    }
  }

  UNSAFE_componentWillMount() {
    let items = JSON.parse(localStorage.getItem("task")) || [];
    this.setState({
      items: items
    })
  }

  handleToggleForm = () => {
    this.setState({
      showForm: !this.state.showForm,
      itemSelected: null
    })
  }

  handleCancel = () => {
    this.setState({
      showForm: false
    })
  }

  handleSearch = (value) => {
    this.setState({
      strSearch: value
    })
  }

  handleSort = (orderBy, orderDif) => {
    this.setState({
      orderBy: orderBy,
      orderDif: orderDif
    })
  }

  handleDelete = (id) => {
    let items = this.state.items;
    remove(items, (item) => {
      return item.id === id;
    });
    this.setState({
      items: this.state.items
    })
    
    localStorage.setItem("task", JSON.stringify(items));
  }

  handleSubmit = (item) => {
    let {items} = this.state;
    let id = null;

    if (item.id !== '') {
      // edit
      items = reject(items, {id: item.id});
      id = item.id;

      // items.forEach((elm,key) => {
      //   if (elm.id === item.id) {
      //     items[key].name = item.name;
      //     items[key].level = +item.level;
      //   }
      // })
    } else {
      // add
      id = uuid();
    }
    
    items.push({
      id: id,
      name: item.name,
      age: item.age,
      level: +item.level,
      time: +item.time,
      status: +item.status
    })

    this.setState({
      items: items, 
      showForm: false
    })

    localStorage.setItem("task", JSON.stringify(items));
  }

  handleEdit = (item) => {
    this.setState({
      itemSelected: item,
      showForm: true
    })
  }

  handleLevelFilter = (level) => {
    this.setState({
      filterLevel: level
    });
  };

  render() {
    let itemsOrigin = this.state.items ? [...this.state.items] : [];
    let items = [];
    let elmForm = null;
    const { orderBy, orderDif, showForm, strSearch, itemSelected, filterLevel } = this.state;

    // Filter items based on search and level filter
    items = filter(itemsOrigin, (item) => includes(item.name, strSearch));

    if (filterLevel !== null) {
      items = items.filter((item) => item.level === filterLevel);
    }

    items = funcOrderBy(items, [orderBy], [orderDif]);

    if (showForm) {
      elmForm = <Form itemSelected={itemSelected} onClickSubmit={this.handleSubmit} onClickCancel={this.handleCancel} />;
    }
    return (
      <div className="App" >
        <Logo />
        <div className="container mt-3 mb-3 mt-lg-5 mb-lg-5">
          <div className="card text-center border-secondary">
            <Header />
            <div className="card-body">
              <Controller
                orderBy={orderBy}
                orderDif={orderDif}
                onClickSort={this.handleSort}
                onClickSearch={this.handleSearch}
                onClickAdd={this.handleToggleForm} 
                showForm={showForm}
              />
              {elmForm}
              <List 
                onClickEdit={this.handleEdit}
                items={items}
                onClickDelete={this.handleDelete}
                onClickLevelFilter={this.handleLevelFilter} // Pass level filter handler
              />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    )
  }
};

export default App;
