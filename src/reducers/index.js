const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 0
};

const addCartItem = (state, book, idx, item) => {
  const newItem = item 
    ? updateCartItem(item, 1, book.price)
    : {
      id: book.id, 
      title: book.title,
      count: 1,
      total: book.price
    };

  return insertCartItem(state, newItem, idx);
}

const cartSum = (cartItems) => {
  return cartItems.reduce((a, e) => a + e.total, 0);
}

const decreaseCartItem = (state, book, idx, item) => {
  return item.count > 1 ? insertCartItem(state, updateCartItem(item, -1, book.price), idx) : deleteCartItem(state, book, idx, item);
}

const deleteCartItem = (state, book, idx, item) => {
  const newCart = state.cartItems.length > 1 ? [...state.cartItems.slice(0, idx), ...state.cartItems.slice(idx + 1)] : [];
    return makeNewState(state, newCart);
}

const getNewData = (state, id, fn) => {
  const { books, cartItems } = state;
  const book = books.find((book) => book.id === id);
  const idx = cartItems.findIndex(item => item.id === book.id);
  const item = cartItems[idx];
  return fn(state, book, idx, item);  
}

const increaseCartitem = (state, book, idx, item) => {
  return insertCartItem(state, updateCartItem(item, 1, book.price), idx);
}

const insertCartItem = (state, item, idx) => {
  const newCart = idx >= 0 ? [...state.cartItems.slice(0, idx), item, ...state.cartItems.slice(idx + 1)] : [...state.cartItems, item];  
  return makeNewState(state, newCart);
}

const makeNewState = (state, newCart) => {
  return {
    ...state,
    cartItems: newCart,
    orderTotal: cartSum(newCart)
  };
}

const updateCartItem = (item, count, price) => {
  return {
    ...item,
    count: item.count + count,
    total: item.total + count * price
  };    
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        error: null,
        cartItems: state.cartItems
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
    case 'BOOK_ADDED_TO_CART': {
      return getNewData(state, action.payload, addCartItem);
    }
    case 'CART_ROW_INCREASE': {
      return getNewData(state, action.payload, increaseCartitem);
    }
    case 'CART_ROW_DECREASE': {
      return getNewData(state, action.payload, decreaseCartItem);
    }
    case 'CART_ROW_DELETE':
      return getNewData(state, action.payload, deleteCartItem);    
    default: 
      return state;
  }
}

export default reducer;