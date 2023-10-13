    import React, {useEffect, useState} from "react";
    import Tabs from "@mui/material/Tabs";
    import Tab from "@mui/material/Tab";
    import Grid from "@mui/material/Grid";
    import {useDispatch, useSelector} from "react-redux";
    import {Post} from "../components/Post";
    import axios from "../axios";
    import {fetchPosts} from "../redux/slices/posts";
    import Button from "@mui/material/Button";
    import {Box, Modal} from "@mui/material";
    import {useNavigate, useParams} from "react-router-dom";
    import MenuItem from "@mui/material/MenuItem";
    import Select from "@mui/material/Select";
    import {AboutCo} from "../components/AboutCompany";

    export const Home = () => {
        const dispatch = useDispatch();
        const {posts} = useSelector((state) => state.posts);
        const [currentTab, setCurrentTab] = React.useState(0);
        const [popularPosts, setPopularPosts] = React.useState([]);
        const [displayedPosts, setDisplayedPosts] = useState([]);
        const navigate = useNavigate();
        const { typeOfPost } = useParams();
        const [ userData,setUserData] = useState(null);
        const handleTabChange = (event, newValue) => {

            setCurrentTab(newValue);
            if (newValue === 1) {
                setDisplayedPosts(popularPosts);
            } else {
                setDisplayedPosts(posts.items);
            }
        };
        const isPostsLoading = posts.status == "loading";

        React.useEffect(() => {
            dispatch(fetchPosts()).then(() => {
                const sortedPosts = posts.items.slice().sort((a, b) => b.viewsCount - a.viewsCount);
                setPopularPosts(sortedPosts);
            });
        }, []);

        useEffect(() => {
            if (typeOfPost) {
                // Фильтруем посты на основе типа недвижимости из URL
                const filteredPosts = posts.items.filter((post) => post.typeOfProperty === typeOfPost);
                setDisplayedPosts(filteredPosts);
            } else {
                setDisplayedPosts(posts.items);
            }
        }, [typeOfPost, posts.items]);



        React.useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get('/users/me');
                    setUserData(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchUserData();
        }, []);

        const getPostsByTab = (tabIndex) => {
            if (tabIndex === 1) {
                // Вкладка "Популярные" - сортируем посты по убыванию viewCount
                return posts.items.slice().sort((a, b) => b.viewsCount - a.viewsCount);
            } else {
                // Вкладка "Новые" - возвращаем исходный порядок постов
                return posts.items;
            }
        };

        return (
            <>



                <Tabs
                    style={{marginBottom: 15}}
                    aria-label="basic tabs example"
                    value={currentTab}
                    onChange={handleTabChange}
                >
                    <Tab label="Новые"/>
                    <Tab label="Популярные"/>
                </Tabs>
                <Grid container spacing={4}>
                    <Grid xs={8} item>
                        {(isPostsLoading ? [...Array(5)] : getPostsByTab(currentTab)).map((obj, index) =>
                            isPostsLoading ? (

                                <Post key={index} isLoading={true}/>
                            ) : (
                                <Post
                                    key={index}
                                    id={obj._id}
                                    title={obj.title}
                                    price={obj.price}
                                    totalArea={obj.totalArea}
                                    typeOfProperty={obj.typeOfProperty}
                                    imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                                    user={obj.user}

                                    createdAt={obj.createdAt}
                                    viewsCount={obj.viewsCount}
                                    likesCount={obj.likesCount}
                                    isEditable={userData && userData._id && userData._id.toString() === obj.user._id.toString()}

                                />
                            )
                        )}
                    </Grid>
                    <Grid xs={4} item>
                        <AboutCo/>
                    </Grid>
                </Grid>
            </>
        );
    };
