import "../assets/css/navbar.css";

export default function NavBar({ setIsOpen }) {
  const handleClick = () => {
    setIsOpen('open')
  }
  return (
    <nav>
      <div className="left-corner">
        <button onClick={handleClick}>
          <img id="hamburger" src="/svg/hamburger.svg" />
        </button>
        <h2>School Resource Finder</h2>
      </div>
      <div className="right-corner">
        <img id="question" src="/svg/question.svg" />
        <img id="heart" src="/svg/heart.svg" />
        <img id="notification-bell" src="/svg/notification-bell.svg" />
        <img id="profile-picture" src="/images/profile.jpg" />
      </div>
    </nav>
  );
}
