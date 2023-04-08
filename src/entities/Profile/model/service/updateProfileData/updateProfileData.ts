/* eslint-disable no-unreachable */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { validateProfileData } from "../validateProfileData/validateProfileData";
import { Profile, ValidateProfileError } from "../../types/profile";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
>("profile/updateProfileData", async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const formData = getProfileForm(getState());
    const errors = validateProfileData(formData);

    if (!formData) {
        return rejectWithValue(errors);
    }
    try {
        const response = await extra.api.put<Profile>(
            `/profile/${formData.id}`,
            formData
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (err) {
        return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
});
