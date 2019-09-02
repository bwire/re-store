const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 350
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        error: null,
        cartItems: state.cartItems,
        orderTotal: state.orderTotal
      };
    case 'FETCH_BOOKS_LOADED':
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload,
      };
    case 'BOOK_ADDED_TO_CART':
      const id = action.payload.bookId;
      const book = state.books.find((book) => book.id === id);
      const newItem = {
        id: book.id,
        name: book.title,
        count: 1,
        total: book.price
      };
      
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          newItem
        ]
      };
      
    default: 
      return state;
  }
}

export default reducer;