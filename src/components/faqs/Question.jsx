import React from 'react'

export default function Question({content}) {
  return (
    <details role="group">
      <summary role="button" aria-expanded="false">
        <strong>{content.question}</strong>
      </summary>
      <p>
        {content.answer}
      </p>
    </details>
  );
}
