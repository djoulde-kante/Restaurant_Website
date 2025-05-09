import { createContext, useContext, useReducer } from 'react';

// Types d'actions
const ActionTypes = {
  SET_MENU_ITEMS: 'SET_MENU_ITEMS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// État initial
const initialState = {
  menuItems: [],
  isLoading: false,
  error: null
};

// Réducteur
const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_MENU_ITEMS:
      return {
        ...state,
        menuItems: action.payload,
        isLoading: false
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Contexte
const AppStateContext = createContext();

// Provider Component
export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={[state, dispatch]}>
      {children}
    </AppStateContext.Provider>
  );
};

// Hook personnalisé pour utiliser l'état
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState doit être utilisé dans un AppStateProvider');
  }
  const [state, dispatch] = context;

  // Actions
  const setMenuItems = (items) => {
    dispatch({ type: ActionTypes.SET_MENU_ITEMS, payload: items });
  };

  const setLoading = (isLoading) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: isLoading });
  };

  const setError = (error) => {
    dispatch({ type: ActionTypes.SET_ERROR, payload: error });
  };

  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  };

  return {
    ...state,
    setMenuItems,
    setLoading,
    setError,
    clearError
  };
};