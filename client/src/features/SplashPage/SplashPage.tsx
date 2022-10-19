import React, { useEffect, useState } from "react";
import images from "../../images";
import "./SplashPage.css";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
type Props = {};

function SplashPage({}: Props) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIndex(index + 1);
    }, 5000);

    if (index === images?.length - 1) setIndex(0);
  }, [index]);
  return (
    <div className="splashPage">
      <img src={images[index].src} alt="" className="splashPage__image" />
      <Header />

      <div className="splashPage__start">
        <h1 className="splashPage__h1Start">Find your inspiration.</h1>
        <h2 className="splashPage__h2Start">
          Join the Flickr community, home to tens of billions of <br />
          photos and 2 million groups.
        </h2>
        <br />
        <br />
        <button
          className="splashPage__buttonStart"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Start for free
        </button>
      </div>
    </div>
  );
}

export default SplashPage;
