import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import React from "react";
import ReviewerCard from "./ReviewerCard";

export default function ReviewerSlider() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5,
      speed: 1000,
    },
    bigTablet: {
      breakpoint: { max: 1024, min: 785 },
      items: 3,
      slidesToSlide: 3,
    },
    smallTablet: {
      breakpoint: { max: 785, min: 500 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel infinite responsive={responsive}>
      <ReviewerCard />
      <ReviewerCard />
      <ReviewerCard />
      <ReviewerCard />
      <ReviewerCard />
      <ReviewerCard />
      <ReviewerCard />
      <ReviewerCard />
    </Carousel>
  );
}
