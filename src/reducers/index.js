const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [
    {
      id: 1,
      name: 'Book 1',
      count: 2,
      total: 200
    },
    {
      id: 2,
      name: 'Book 2',
      count: 1,
      total: 150
    }
  ],
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
    default: 
      return state;
  }
}

export default reducer;