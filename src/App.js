import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBook from './SearchBook'
import BookList from './BookList'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [] 
  };

  componentDidMount() {
    this.updateData()
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.updateData()
    })
  }

  updateData = () => {
    BooksAPI.getAll().then(data => {
            this.setState({
              books: data
            })
    });    
  }

  render() {
    return (
      <div className="app">
      {/*For current app*/}
        <Route exact path="/" render={() => <BookList currentBooks={this.state.books} />} />
      {/*When the user clicks on search button*/}
        <Route
        path="/search"
        render={() =>
        <SearchBook updateShelf={this.updateShelf} currentBooks={this.state.books} />}/>
      </div>
    );
  }
}

export default BooksApp
