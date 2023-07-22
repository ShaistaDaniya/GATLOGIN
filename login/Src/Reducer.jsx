const initialState = {
    phoneNumber: '',
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PHONE_NUMBER':
        return { ...state, phoneNumber: action.payload };
      default:
        return state;
    }
  };
  
  export default reducer;
  