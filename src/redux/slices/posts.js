import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "../../axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts')
    return data;
});
export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
    axios.delete(`/posts/${id}`)
});
export const fetchLikePost = createAsyncThunk('posts/fetchLikePost', async (id) => {
    await axios.post(`/posts/${id}/like`);
    return id;
});

export const fetchPostsByType = createAsyncThunk('posts/fetchPostsByType', async (propertyType) => {
    const { data } = await axios.get(`/posts/?typeOfProperty=${propertyType}`);
    return data;
});


export const fetchPostByUserId = createAsyncThunk('posts/fetchPostByUserId', async (userId) => {
    const { data } = await axios.get(`/posts/user/${userId}`);
    return data;
});
const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    filteredPosts: {
        items: [],
        status: 'loading'
    },
    postsByUserId: {
        items: [],
        status: 'loading'
    }
};
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        //Получение статей
        [fetchPosts.pending]: (state) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded'
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = []
            state.posts.status = 'error'
        },



        [fetchPostsByType.pending]: (state) => {
            state.postsByUserId.items = [];
            state.postsByUserId.status = 'loading';
        },
        [fetchPostsByType.fulfilled]: (state, action) => {
            state.postsByUserId.items = action.payload;
            state.postsByUserId.status = 'loaded';
        },
        [fetchPostsByType.rejected]: (state) => {
            state.postsByUserId.items = [];
            state.postsByUserId.status = 'error';
        },

        [fetchPostByUserId.pending]: (state) => {
            state.postsByUserId.items = [];
            state.postsByUserId.status = 'loading';
        },
        [fetchPostByUserId.fulfilled]: (state, action) => {
            state.postsByUserId.items = action.payload;
            state.postsByUserId.status = 'loaded';
        },
        [fetchPostByUserId.rejected]: (state) => {
            state.postsByUserId.items = [];
            state.postsByUserId.status = 'error';
        },


        //удаление статей
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id != action.meta.arg)
        },

        [fetchLikePost.pending]: (state,action) => {
            const postId = action.payload;
            const post = state.items.find(obj => obj.id === postId);
            if (post) {
                post.isLiked = true;
                post.likesCount += 1;
            }
        },
        [fetchLikePost.rejected]: (state, action) => {
            const postId = action.payload;
            const post = state.posts.items.find(obj => obj.id === postId);
            if (post) {
                post.isLiked = false;
                post.likesCount -= 1;
            }
        },





    }
})
export const postsReducer = postsSlice.reducer;