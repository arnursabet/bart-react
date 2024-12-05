export const initialState = {
  showHero: true,
  routeData: null,
  isMapModalOpen: false
};

export const tripPlannerReducer = (state, action) => {
  switch (action.type) {
    case 'SUBMIT_FORM':
      return {
        ...state,
        routeData: action.payload,
        showHero: false
      };
    case 'TOGGLE_MAP':
      return {
        ...state,
        isMapModalOpen: !state.isMapModalOpen
      };
    case 'RESET':
      return {
        ...state,
        showHero: true,
        routeData: null
      };
    default:
      return state;
  }
}; 