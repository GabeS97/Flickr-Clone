import React, { useEffect, useState } from "react";
import Header from "../Banner/Header";
import { useTransition, animated } from "react-spring";
import images from "../../images";
import "./SplashPage.css";
type Props = {};

function SplashPage({}: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setIndex(index + 1)
    }, 5000)

    if (index === images.length - 1) setIndex(0)
  }, [index])
  return (
    <div className="splashPage">
      <img src={images[index].src} alt="" className="splashPage__image" />
      <Header />

      <div className="splashPage__start">
        
      </div>
    </div>
  );
}

export default SplashPage;
