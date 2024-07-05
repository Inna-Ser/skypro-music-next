import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store"
import { getFavoriteTracks } from "@/store/slices/features/trackSlice";

export const useInitializeLikedTracks=() => {
    const dispatch = useAppDispatch();
    const tokens = useAppSelector(state =>state.auth.tokens);
    useEffect(() => {
        if(tokens.access) {
            dispatch(getFavoriteTracks(tokens.access))
        }
    }, [tokens, dispatch])
}