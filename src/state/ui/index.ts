import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store from '../store';
import { RootState, Thunk, Dispatch } from '../store';

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark'
}

interface UIState {
  themeMode: ThemeMode;
  menuOpen: boolean;
}

const initialState: UIState = {
  themeMode: ThemeMode.LIGHT,
  menuOpen: false,
};

// Slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
    setMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.menuOpen = action.payload;
    }
  }
});

// Reducers
export default uiSlice.reducer;

// Selectors
export const uiSelector = (state: RootState) => state.ui;

// Actions
const { setThemeMode, setMenuOpen } = uiSlice.actions;

// Thunks
export const toggleThemeMode = (): Thunk => (dispatch: Dispatch) => {
  const { themeMode } = store.getState().ui;
  const mode = themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;

  dispatch(setThemeMode(mode));
};

export const toggleMenu = (): Thunk => (dispatch: Dispatch) => {
  const { menuOpen } = store.getState().ui;
  const open = !menuOpen ;

  dispatch(setMenuOpen(open));
};
