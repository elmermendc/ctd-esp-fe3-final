import axios from "axios";
import { createContext, useEffect, useMemo, useReducer } from "react";

//export const initialState = {theme: "", data: []}

const actions = {
  SET_THEME: 'SET_THEME',
  SET_DENTISTS: 'SET_DENTISTS',
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  RESET_FAVORITES: 'RESET_FAVORITES'
};

const loadFromLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_THEME:
      return { ...state, theme: action.payload };
    case actions.SET_DENTISTS:
      return { ...state, dentists: action.payload };
    case actions.ADD_FAVORITE:
      const addedFavorites = [...state.favorites, action.payload];
      return { ...state, favorites: addedFavorites };
    case actions.REMOVE_FAVORITE:
      const removedFavorites = state.favorites.filter(d => d.id !== action.payload.id);
      return { ...state, favorites: removedFavorites };
    case actions.RESET_FAVORITES:
      return { ...state, favorites: [] };
    default:
      return state;
  }
};

const getInitialState = () => {
  const theme = loadFromLocalStorage('theme', 'light');
  const favorites = loadFromLocalStorage('favorites', []);
  return { theme, dentists: [], favorites };
};


export const ContextGlobal = createContext(undefined);

export const ContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(globalReducer, getInitialState());

  const setTheme = (theme) => dispatch({ type: actions.SET_THEME, payload: theme });
  const setDentists = (dentists) => dispatch({ type: actions.SET_DENTISTS, payload: dentists });
  const addFavorite = (dentist) => dispatch({ type: actions.ADD_FAVORITE, payload: dentist });
  const removeFavorite = (dentist) => dispatch({ type: actions.REMOVE_FAVORITE, payload: dentist });
  const resetFavorites = () => dispatch({ type: actions.RESET_FAVORITES });


  const fetchDentists = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setDentists(response.data);
    } catch (error) {
      console.error('Error dentists:', error);
    }
  };

  useEffect(() => {
    fetchDentists();
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
    localStorage.setItem("theme", JSON.stringify(state.theme));
  }, [state.favorites, state.theme]);

  const value = useMemo(() => ({
    ...state,
    setTheme,
    setDentists,
    addFavorite,
    removeFavorite,
    resetFavorites,
  }), [state]);


  return (
    <ContextGlobal.Provider value={value}>
      {children}
    </ContextGlobal.Provider>
  );
};
