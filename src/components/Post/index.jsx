import React, {useState} from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import {Link} from "react-router-dom";
import styles from "./Post.module.scss";
import {UserInfo} from "../UserInfo";
import {PostSkeleton} from "./Skeleton";
import {useDispatch} from "react-redux";
import {fetchRemovePost} from "../../redux/slices/posts";
import {logout} from "../../redux/slices/auth";
import axios from "../../axios";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

export const Post = ({
                         id,
                         title,
                         createdAt,
                         imageUrl,
                         user,
                         viewsCount,
                         likesCount,
                         typeOfProperty,
                         typeOfPost,
                         totalArea,
                         price,
                         yearOfConstruction,
                         children,
                         isFullPost,
                         isLoading,
                         isEditable,
                     }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likesCount || 0)
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const dispatch = useDispatch();
    if (isLoading) {
        return <PostSkeleton/>;
    }

    const onClickRemove = () => {
        setDeleteDialogOpen(true);

    };
    const handleDeleteConfirm = () => {
        setDeleteDialogOpen(false);
        dispatch(fetchRemovePost(id));
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };
    const onClickLike = () => {
        if (isLiked) {
            return; // Пользователь уже поставил лайк, ничего не делаем
        }
        axios
            .post(`/posts/${id}/like`)
            .then(() => {
                setLikeCount(likeCount + 1);
                setIsLiked(true);
            })
            .catch((error) => {
                console.log('Ошибка при добавлении лайка', error);
            });
    };
    return (
        <div className={clsx(styles.root, {[styles.rootFull]: isFullPost})}>
            {isEditable && (
                <div className={styles.editButtons}>
                    <Link to={`/posts/${id}/edit`}>
                        <IconButton color="primary">
                            <EditIcon/>
                        </IconButton>
                    </Link>
                    <IconButton onClick={onClickRemove} color="secondary">
                        <DeleteIcon/>
                    </IconButton>
                </div>
            )}
            {isFullPost?
                <img
                    className={clsx(styles.pictFullPost, {[styles.imageFull]: isFullPost})}
                    src={imageUrl}
                    alt={title}
                />
                :
                <>
            {imageUrl && (
                <img
                    className={clsx(styles.image, {[styles.imageFull]: isFullPost})}
                    src={imageUrl}
                    alt={title}
                />
            )}
                </>
            }
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <UserInfo {...user} additionalText={createdAt}/>
                    {isFullPost ?
                        <>
                            <span className={styles.typeOfProp}>{typeOfProperty}</span>
                            <span className={styles.typeOfPost}>{typeOfPost}</span>
                        </>
                        :
                        <span className={styles.typeOfProp}>{typeOfProperty}</span>
                    }
                </div>

                <div className={styles.indention}>
                    <h2
                        className={clsx(styles.title, {[styles.titleFull]: isFullPost})}
                    >
                        {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
                    </h2>
                    {isFullPost ?
                        <div >
                            <br/>
                            <span className={styles.parameters}> Price : <b>{price} $</b></span>
                            <br/>
                            <br/>
                            <span className={styles.parameters}> Total area : {totalArea} м²</span>
                            <br/>
                            <br/>
                            <span className={styles.parameters}>year of construction : {yearOfConstruction} y </span>
                            <br/>
                        </div>
                        :
                        <div>
                            <span><b>{price} $</b></span>
                            <br/>
                            <span className={styles.totalArea}>{totalArea} м²</span>
                        </div>
                    }
                    {children && <div className={styles.content}>{children}</div>}
                    <ul className={styles.postDetails}>

                        <li>
                            <EyeIcon/>
                            <span>{viewsCount}</span>
                        </li>

                        <li>

                            <IconButton
                                onClick={onClickLike}
                                color={isLiked ? 'secondary' : 'default'}
                            >
                                <Button  color="primary" startIcon={<ThumbUpAltIcon/>}/>
                            </IconButton>
                            <span>{likeCount}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <Dialog open={isDeleteDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Deleting post</DialogTitle>
                <DialogContent>
                    <p>Are you sure that you want to delete?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};