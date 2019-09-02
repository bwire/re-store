const booksLoaded = (newBooks) => {
  return {
    type: 'FETCH_BOOKS_LOADED',
    payload: newBooks
  }
}

const booksRequested = () => {
  return {
    type: 'FETCH_BOOKS_SUCCESS'
  }
}

const booksError = (error) => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: error
  }
}

const fetchBooks = (bookstoreService, dispatch) => 
  () => {
    dispatch(booksRequested());
    bookstoreService.getBooks()
      .then((data) => dispatch(booksLoaded(data)))
      .catch((error) => dispatch(booksError(error)));
  };

export const bookAddedToCart = (bookId) => {
  return {
    type: 'BOOK_ADDED_TO_CART',
    payload: bookId
  }
}

export { fetchBooks };