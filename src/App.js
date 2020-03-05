import React, { Component} from 'react';
import './App.css';
import TodoItem from './Components/TodoItem';
import tick from './img/tick.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
      currentFilter: 'all', //all active complete

      todoItems: [
        { title: 'Mua bim bim', isComplete: true },
        { title: 'Đi đá bóng', isComplete: false },
        { title: 'Đi đổ xăng', isComplete: true }
      ]
    };

    this.middleValue = [...this.state.todoItems];

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAll = this.onAll.bind(this);
    this.onActive = this.onActive.bind(this);
    this.onComplete = this.onComplete.bind(this);
  }

  onItemClicked(item) {
    return (event) => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {...item,
             isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      });

      this.middleValue = [
        ...todoItems.slice(0, index),
        {...item,
           isComplete: !isComplete
        },
        ...todoItems.slice(index + 1)
      ];
    }
  }

  onKeyUp(event) {
    if (event.keyCode === 13) { //enter key
      let text = event.target.value;             
      text = text.trim(); //bỏ all space ở đầu và cuối text
      if (!text) {
        return;
      }

      this.setState({
        newItem: '',
        todoItems: [
          { title: text, isComplete: false },
          ...this.state.todoItems
        ]
      });
     
      this.middleValue = [...this.state.todoItems, { title: text, isComplete: false }];
    } 
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value
    });
  }

  onAll() {
    this.setState({
      currentFilter: 'All',
      todoItems: [...this.middleValue]
    });
  }

  onActive() {
    this.setState({
      currentFilter: 'Acive',
      todoItems: this.middleValue.filter((item) => {
        return item.isComplete === false;
      })
    });
  }

  onComplete() {
    this.setState({
      currentFilter: 'Complete',
      todoItems: this.middleValue.filter((item) => {
        return item.isComplete === true;
      })
    });
  }

  render() {
    const { todoItems, newItem } = this.state;
    return (
      <div className="App">
        <div className="Header">
          <img src={tick} width={32} height={32} />
          <input 
            type="text"
            placeholder="Add a new item" 
            value={newItem}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp} />
        </div>

        {
          todoItems.length > 0 && this.state.todoItems.map((item, index) => 
            <TodoItem 
              key={index} 
              item={item} 
              onClick={this.onItemClicked(item)}/>
          )
        }
        {todoItems.length === 0 && 'Nothing here.'}

        <div className="Footer">
          <p onClick={this.onAll}>All</p>
          <p onClick={this.onActive}>Active</p>
          <p onClick={this.onComplete}>Complete</p>
        </div>
        
      </div>
    );
  }
}

export default App;
