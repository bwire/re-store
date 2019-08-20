import React, { Component } from 'react';
import { connect } from 'react-redux';

import BookListItem from '../book-list-item';
import withBookstoreService from '../hoc';
import { booksLoaded, booksRequested } from '../../actions';
import { compose } from '../../services/utils';
import Spinner from '../spinner';

import './book-list.css';

class BookList extends Component {
  componentDidMount() {
    const { bookstoreService, booksLoaded, booksRequested } = this.props;
    booksRequested();
    bookstoreService.getBooks()
      .then((data) => booksLoaded(data));
  }

  render() {
    const { books, loading } = this.props;
    if (loading)
      return <Spinner />;
    else 
      return (
        <ul className="book-list">
          { books.map(book => <li key={ book.id }><BookListItem book={ book } /></li>) }
        </ul>
      );
  }
};

const mapStateToProps = ({ books, loading }) => {
  return { books, loading };
}

export default compose(
  withBookstoreService(), 
  connect(mapStateToProps, { booksLoaded, booksRequested })
)(BookList);