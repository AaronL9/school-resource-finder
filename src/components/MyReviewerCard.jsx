import React from 'react'

export default function MyReviewerCard() {
  return (
    <ul className="my-cards">
      <li className="my-cards__item">
        <div className="my-card">
          <div className="my-card__image my-card__image--fence" />
          <div className="my-card__content">
            <div className="my-card__title">Flex</div>
            <p className="my-card__text">
              This is the shorthand for flex-grow, flex-shrink and flex-basis
              combined. The second and third parameters (flex-shrink and
              flex-basis) are optional. Default is 0 1 auto.{" "}
            </p>
            <button className="btn btn--block my-card__btn">Button</button>
          </div>
        </div>
      </li>     
    </ul>
  );
}
