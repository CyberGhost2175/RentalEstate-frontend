import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
const carouselItem ={
    borderRadius:"10px",
    border:".2px solid black"
}
const text ={
fontWeight:"bold",
    color:"#000"
}
const PropertyCarousel = () => {
    return (
        <Carousel >
                <Carousel.Item>
                    <img
                        style={carouselItem}
                        className="d-block w-100"
                        src="https://i.pinimg.com/564x/9b/fd/b2/9bfdb219562ed67d1981f8c6b8ece94f.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3> Manhattan 2</h3>
                        <p>500 м , 125 000 000 $</p>
                    </Carousel.Caption>
                </Carousel.Item>

            <Carousel.Item>
                <img
                    style={carouselItem}
                    className="d-block w-100"
                    src="https://i.pinimg.com/564x/40/f5/26/40f52678577172e3cf1e7f063a3470c1.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3 style={text}>Penthouse </h3>
                    <p>Beverly Hills. 200 million $</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={carouselItem}
                    className="d-block w-100"
                    src="https://i.pinimg.com/564x/92/69/36/926936813d894df3135d3ec83ace7d64.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>House</h3>
                    <p style={text} >Family Village. 300 million $</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default PropertyCarousel;
