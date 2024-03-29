import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux/es/types';
import { RootState, AppDispatch } from '../state/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
