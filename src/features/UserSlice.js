import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient, axiosClientMultipart } from "./API";


export const getAll = () => {

  const url = `/user`;
  return axiosClient.get(url);
}

export const signOut = () => {
  const url = `/signout`;
  return axiosClient.get(url);
}

export const remove = (id) => {
  const url = `/user/${id}`;
  return axiosClient.delete(url);
}
export const upload = (id, data) => {
  const url = `/user/${id}`;
  return axiosClient.put(url, data);
}
export const signupApi = (user) => {
  console.log('chào rồi')
  const url = `/signup`;
  return axiosClientMultipart.post(url, user);
};
export const signinApi = (user) => {
  const url = `/signin`;
  return axiosClient.post(url, user)
};
export const uploadInfoUser = (data) => {
  const url = `/upload-user`;
  return axiosClientMultipart.post(url, data);
};
export const uploadPassword = (data) => {
  const url = `/user/upload/password`;
  return axiosClient.post(url, data);
};
export const getInfoUser = (id) => {
  console.log(id, 'e3wds')
  const url = `/get-user/${id}`;
  return axiosClient.get(url);
};
export const checkEmailUpload = (email) => {
  const url = `/check-email-upload`;
  return axiosClient.post(url, email);
};
export const uploadEmail = (email) => {
  const url = `/upload/email`;
  return axiosClient.post(url, email);
};
export const getOtp_Email = (email) => {
  const url = `/get-otp-email`;
  return axiosClient.post(url, email);
};


export const getUser = createAsyncThunk(
  "users/getUser",
  async (id) => {
    console.log(id, 'chào nehs')
    const { data: user } = await getInfoUser(id);
    return user;
  }
);

export const uploadUser = createAsyncThunk(
  "users/uploadUser",
  async (data) => {
    const { data: user } = await uploadInfoUser(data);
    return user;
  }
);

export const uploadEmailUser = createAsyncThunk(
  "users/uploadEmailUser",
  async (data) => {
    const { data: user } = await uploadEmail(data);
    return user;
  }
);
const userSlice = createSlice({
  name: "users",
  initialState: {
    value: [],
    password: {},
    email: null,
    loading: true
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });

    builder.addCase(uploadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });

    builder.addCase(uploadEmailUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
  },
});
export default userSlice.reducer;
