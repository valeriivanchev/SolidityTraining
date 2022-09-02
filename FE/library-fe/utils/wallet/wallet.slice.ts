import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  address: '',
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletAddress: (state, { payload }: PayloadAction<string>) => {
      state.address = payload;
    },
  },
});

// actions
export const {
  setWalletAddress,
} = walletSlice.actions;

//selectors
export const selectWallet = (state: any) => state.wallet;
export const selectWalletAddress = (state: any) => state.wallet.address;

export default walletSlice;
