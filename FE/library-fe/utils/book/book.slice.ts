import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  books: [],
};

const booksSlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    setBooks: (state, { payload }: PayloadAction<any>) => {
      state.books = payload;
    },
  },
});

// actions
export const {
  setBooks,
} = booksSlice.actions;

//selectors
export const selectBooks = (state: any) => state.library.books;

export default booksSlice;
