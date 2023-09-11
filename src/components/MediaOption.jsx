import React from "react";

export default function MediaOption({ source, name }) {
  return (
    <a href="">
      <img src={source} alt="icon" />
      <span>{name}</span>
    </a>
  );
}
