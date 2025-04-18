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
import defaultTasks from './data/defaultTasks.json';

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

  componentDidMount() {
    // Load data from JSON Server
    fetch("http://localhost:3001/tasks")
        .then(response => response.json())
        .then(
            data => {
              this.setState({ items: data })
            }
        )
        .catch(error => console.error("Error loading tasks:", error));
  }

  deleteTaskFromJsonDB = (id) => {
    console.log('deleteTaskFromJsonDB', id)
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE"
    })
        .then(() => {
          // Remove the task from state
          this.setState(prevState => ({
            items: prevState.items.filter(item => item.id !== id)
          }));
        })
        .catch(error => console.error("Error deleting task:", error));
  };

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
    this.deleteTaskFromJsonDB(id);
    // this.deleteTaskFromLocalStorage(id);
  }

  deleteTaskFromLocalStorage = (id) => {

    let items = this.state.items;
    remove(items, (item) => {
      return item.id === id;
    });
    this.setState({
      items: this.state.items
    })
    
    localStorage.setItem("task", JSON.stringify(items));
  }

  addTaskToJsonDB = (item) => {
    console.log('addTaskToJsonDB 1', item, this.state.items)

    if(item.id)   this.deleteTaskFromJsonDB(item.id);

    else{
      item.id = uuid();
    }
    console.log('addTaskToJsonDB 2', item, this.state.items) // when I make update the item, still have the item in this.state.items

    fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(task => {

          console.log(11122, task, this.state.items) // why the item was deleted in this.state.items ?
          this.setState(
            prevState => {
              console.log("Previous state:", prevState); // This logs prevState before updating
              return {
                items: [...prevState.items, task],
                showForm: false
              };
            }
          );
        })
        .catch(error => console.error("Error adding task:", error));
  };

  addTaskTolocalStorage = (item) => {

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

  addNewTaskSubmit = (item) => {

    item.id = uuid();
    this.addTaskToJsonDB(item);
    // this.addTaskTolocalStorage(item)
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

  handleDownloadTasks = () => {
    const tasks = localStorage.getItem("task");
    const tasksData = tasks ? JSON.parse(tasks) : [];

    const fileData = new Blob(
        [JSON.stringify(tasksData, null, 2)],
        { type: 'application/json' }
    );

    const $objectURL = URL.createObjectURL(fileData);

    // Create a temporary link to trigger download
    const $a_downloadLink = document.createElement('a');
    $a_downloadLink.href = $objectURL;
    $a_downloadLink.download = 'defaultTasks.json';

    $a_downloadLink.click();
  };

  handleLoadTaskFromLocal = (event) => {

    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = (e) => {
        try {
          const tasks = JSON.parse(e.target.result);

          localStorage.setItem("task", JSON.stringify(tasks));
          this.setState({ items: tasks });
          alert("Tasks loaded successfully!");
        }
        catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Invalid JSON file format.");
        }
      };
    }
  };

  handleLoadDefaultTasks = () => {
    // Save default tasks to localStorage
    localStorage.setItem("task", JSON.stringify(defaultTasks));

    // Update state with the loaded default tasks to refresh the List component
    this.setState({ items: defaultTasks });

    alert("Default tasks loaded successfully!");
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
      elmForm = <Form itemSelected={itemSelected} onClickSubmit={this.addNewTaskSubmit} onClickCancel={this.handleCancel} />;
    }
    return (
      <div className="App" >
        <Logo />
        <div className="container mt-3 mb-3 mt-lg-5 mb-lg-5">
          <div className="card text-center border-secondary">
            <Header />
            <div className="d-flex justify-content-center mb-3">
              <button onClick={this.handleDownloadTasks} className="btn btn-primary mr-2">
                Save to Local
              </button>
              <label className="btn btn-success mb-0 mr-2"> {/* Different color for Load button */}
                Load Tasks
                <input
                    type="file"
                    accept=".json"
                    onChange={this.handleLoadTaskFromLocal}
                    style={{ display: 'none' }} // Hide the actual input
                />
              </label>
            </div>

            <div className="d-flex justify-content-center mb-3">
              <button onClick={this.handleLoadDefaultTasks} className="btn btn-info mr-2">
                Load Default Tasks
              </button>
            </div>

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
