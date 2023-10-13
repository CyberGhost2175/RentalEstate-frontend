import React from "react";

import { Post } from "../components/Post";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const { id } = useParams();
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);



  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);

      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении статьи");
      });
  }, []);


  if(isLoading){
      return <Post isLoading={isLoading} isFullPost/>;
  }


  return (
    <>
      <Post
          id={data._id}
          title={data.title}
          price={data.price}
          totalArea={data.totalArea}
          typeOfProperty={data.typeOfProperty}
          yearOfConstruction={data.yearOfConstruction}
          typeOfPost={data.typeOfPost}
          imageUrl={data.imageUrl?`http://localhost:4444${data.imageUrl}`:''}
          user={data.user}
          createdAt={data.createdAt}
          viewsCount={data.viewsCount}
          likesCount={data.likesCount}
        isFullPost>

          <h3>Описание </h3>
          <ReactMarkdown children={data.text}  />
      </Post>

    </>
  );
};
