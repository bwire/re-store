const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 350
};

const updateCartItem = (book, item = {}) => {
  const { id = book.id, title = book.title, count = 0, total = 0 } = item;
  return {
    id: id,
    title: title,
    count: count + 1,
    total: total + book.price
  };
}

const updateCartItems = (state, id) => {
  const book = state.books.find((book) => book.id === id);
  const idx = state.cartItems.findIndex(item => item.id === book.id);    
  const newItem = updateCartItem(book, state.cartItems[idx]);
  return idx >= 0 
    ? [...state.cartItems.slice(0, idx), newItem, ...state.cartItems.slice(idx + 1)]
    : [...state.cartItems, newItem];
}

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
      return {
        ...state,
        cartItems: updateCartItems(state, action.payload)
      };
      
    default: 
      return state;
  }
}

export default reducer;