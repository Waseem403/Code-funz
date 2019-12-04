import React from "react";
import img1 from "../Images/img1.jpeg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


export default function Quotes() {
  return (
    <React.Fragment >
      <Carousel showThumbs={
        false
      } >
        <div>
          <img src={img1} alt={"not found"} />
        </div >
        <div >
          <img src={img1} alt={"not found"} />
        </div >
      </Carousel>
    </React.Fragment >
  );
}