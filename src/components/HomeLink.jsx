import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/home_card.css";

// export default function HomeLink({LinkName, LinkIcon, color}) {
//   return (
//     <Link>
//       <img src={LinkIcon}/>
//       <span className={`link-name ${color}`}>{LinkName}</span>
//     </Link>
//   )
// }

export default function HomeLink({ title, SvgIcon, variant }) {
  return (
    <div className="body">
      <a className={`card ${variant}`} href="#">
        <div className="overlay"></div>
        <div className="circle">
          {SvgIcon}
        </div>
        <p>{title}</p>
      </a>
    </div>
  );
}
