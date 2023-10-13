import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "../../axios";

export const AddPost = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);
    const [isLoading, setLoading] = React.useState(false);
    const [text, setText] = React.useState('');
    const [typeOfPost, setTypeOfPost] = React.useState('')
    const [typeOfProperty, setTypeOfProperty] = React.useState('')
    const [title, setTitle] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const inputFileRef = React.useRef(null);
    const [yearOfConstruction, setYearOfConstruction] = React.useState(null);
    const [price, setPrice] = React.useState('');
    const [countOfRooms, setCountOfRooms] = React.useState([]);
    const [totalArea, setTotalArea] = React.useState('');


    const isEditing = Boolean(id);

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file)
            const {data} = await axios.post('/upload', formData)
            setImageUrl(data.url);
        } catch (err) {
            console.warn(err);
            alert('ошибка при загрузке файла !');
        }
    };
    const onClickRemoveImage = async () => {

        setImageUrl('');
    };

    const onChange = React.useCallback((value) => {
        setText(value);
    }, []);

    const onSubmit = async () => {
        try {
            setLoading(true);

            const fields = {
                title,
                imageUrl,
                text,
                typeOfPost,
                typeOfProperty,
                yearOfConstruction,
                price,
                countOfRooms,
                totalArea,
            }
            const {data} = isEditing
                ? await axios.patch(`/posts/${id}`, fields)
                : await axios.post('/posts', fields);

            const _id = isEditing ? id : data._id;
            navigate(`/posts/${_id}`);
        } catch (err) {
            console.warn(err);
            console.log('Ошибка при создании статьи!')
        }
    }
    React.useEffect(() => {
        if (id) {
            axios.get(`/posts/${id}`).then(({data}) => {
                setTitle(data.title);
                setText(data.text);
                setTypeOfPost(data.typeOfPost);
                setTypeOfProperty(data.typeOfProperty);
                setImageUrl(data.imageUrl)

                setPrice(data.price)
                setTotalArea(data.totalArea)
                setCountOfRooms(data.countOfRooms)
                setYearOfConstruction(data.yearOfConstruction)

            }).catch(err => {
                console.warn(err);
                alert('Ошибка при получении статьи')
            })
        }
    }, [])

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );


    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/"/>;
    }



    const handleNumericInputChange = (value, setValue) => {
        const numericValue = value.replace(/\D/g, ''); // Фильтрация только цифр
        setValue(numericValue);
    };
    return (
        <Paper style={{padding: 30}}>
            <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
                Загрузить превью
            </Button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
            {imageUrl && (
                <>
                    <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                        Удалить
                    </Button>
                    <br/>
                    <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded"/>
                </>
            )}

            <br/>
            <br/>
            <TextField
                classes={{root: styles.title}}
                variant="standard"
                placeholder="Заголовок статьи..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                fullWidth
            />


            <FormControlLabel
                control={
                    <Checkbox
                        checked={typeOfPost === 'Продажа'}
                        onChange={() => setTypeOfPost(typeOfPost === 'Продажа' ? '' : 'Продажа')}
                        color="primary"
                    />
                }
                label="Продажа"
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={typeOfPost === 'Сдача'}
                        onChange={() => setTypeOfPost(typeOfPost === 'Сдача' ? '' : 'Сдача')}
                        color="primary"
                    />
                }
                label="Сдача"
            />
            <br/>
            <br/>
            <Select
                value={typeOfProperty}
                onChange={(e) => setTypeOfProperty(e.target.value)}
                displayEmpty
                fullWidth
            >
                <MenuItem value="" disabled>
                    Тип недвижимости
                </MenuItem>
                <MenuItem value="Квартира">Квартира</MenuItem>
                <MenuItem value="Пентхаус">Пентхаус</MenuItem>
                <MenuItem value="Дом">Дом</MenuItem>
            </Select>

            <Select
                value={countOfRooms}
                onChange={e => setCountOfRooms(e.target.value)}
                displayEmpty
                fullWidth
            >
                <MenuItem value="" disabled>
                    Количество комнат
                </MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
            </Select>
            <TextField

                variant="standard"
                placeholder="Общая площадь"
                value={totalArea}
                onChange={(e) => handleNumericInputChange(e.target.value, setTotalArea)}
                fullWidth
            />

            <TextField
                variant="standard"
                placeholder="Год постройки"
                value={yearOfConstruction}
                onChange={(e) => handleNumericInputChange(e.target.value, setYearOfConstruction)}
                fullWidth
            />
            <TextField
                variant="standard"
                placeholder="Цена"
                value={price}
                onChange={(e) => handleNumericInputChange(e.target.value, setPrice)}
                fullWidth
            />

            <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options}/>
            <div className={styles.buttons}>
                <Button onClick={onSubmit} size="large" variant="contained">
                    {isEditing ? 'Сохранить' : 'Подать обьявление'}
                </Button>
                <a href="/">
                    <Button size="large">Отмена</Button>
                </a>
            </div>
        </Paper>
    );
};
