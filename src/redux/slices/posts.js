import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "../../axios";

// Mock data that will always be available
const mockPosts = [
    {
        _id: 'mock1',
        title: 'Modern Apartment in City Center',
        text: 'Beautiful modern apartment located in the heart of the city. Recently renovated with high-quality materials. Features include a fully equipped kitchen, spacious living room, and a cozy bedroom.',
        typeOfPost: 'Sale',
        typeOfProperty: 'Flat',
        viewsCount: 150,
        price: 250000,
        countOfRooms: 2,
        yearOfConstruction: 2015,
        totalArea: 75,
        likesCount: 25,
        imageUrl: '/uploads/estate1.jpg',
        user: {
            _id: 'mockUser1',
            fullName: 'Demo User',
            email: 'demo@example.com',
            imageUrl: '/uploads/avatar1.jpg'
        },
        createdAt: new Date().toISOString()
    },
    {
        _id: 'mock2',
        title: 'Luxury Penthouse with Sea View',
        text: 'Stunning penthouse with panoramic sea views. Features include a private terrace, modern appliances, and premium finishes throughout. Perfect for those seeking luxury living.',
        typeOfPost: 'Rent',
        typeOfProperty: 'Penthouse',
        viewsCount: 200,
        price: 5000,
        countOfRooms: 3,
        yearOfConstruction: 2020,
        totalArea: 150,
        likesCount: 35,
        imageUrl: '/uploads/estate2.jpg',
        user: {
            _id: 'mockUser1',
            fullName: 'Demo User',
            email: 'demo@example.com',
            imageUrl: '/uploads/avatar2.jpg'
        },
        createdAt: new Date().toISOString()
    },
    {
        _id: 'mock3',
        title: 'Family House with Garden',
        text: 'Spacious family house with a beautiful garden. Located in a quiet neighborhood. Features include a large kitchen, multiple bedrooms, and a backyard perfect for family gatherings.',
        typeOfPost: 'Sale',
        typeOfProperty: 'House',
        viewsCount: 180,
        price: 450000,
        countOfRooms: 4,
        yearOfConstruction: 2018,
        totalArea: 200,
        likesCount: 30,
        imageUrl: '/uploads/estate3.jpg',
        user: {
            _id: 'mockUser1',
            fullName: 'Demo User',
            email: 'demo@example.com',
            imageUrl: '/uploads/avatar1.jpg'
        },
        createdAt: new Date().toISOString()
    }
];

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    console.log('Fetching posts from API...');
    try {
        const {data} = await axios.get('/posts');
        console.log('Received posts data:', data);
        // Combine mock data with real data
        return [...mockPosts, ...data];
    } catch (error) {
        console.error('Error fetching posts:', error);
        // If there's an error, return mock data
        return mockPosts;
    }
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
        items: mockPosts, // Initialize with mock data
        status: 'loaded'
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
            console.log('Posts fetch pending...');
            // Keep mock data while loading
            state.posts.items = mockPosts;
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            console.log('Posts fetch fulfilled:', action.payload);
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            console.log('Posts fetch rejected');
            // Keep mock data on error
            state.posts.items = mockPosts;
            state.posts.status = 'loaded';
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