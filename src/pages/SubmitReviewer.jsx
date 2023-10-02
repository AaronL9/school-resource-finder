import React, { useState } from "react";
import "../assets/css/submit_reviewer.css";
import { TagsInput } from "react-tag-input-component";

export default function SubmitReviewer() {
  const [selected, setSelected] = useState([]);

  return (
    <>
      <h1 className="submit__title">Submit Reviewer</h1>
      <div className="formbold-main-wrapper">
        {/* Author: FormBold Team */}
        {/* Learn More: https://formbold.com */}
        <div className="formbold-form-wrapper">
          <form action="https://formbold.com/s/FORM_ID" method="POST">
            <div className="formbold-mb-5">
              <label htmlFor="email" className="formbold-form-label">
                Short Description:
              </label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Enter description"
                className="formbold-form-input"
              />
            </div>
            <label htmlFor="rti--input" className="formbold-form-label">
              Tags
            </label>
            <TagsInput
              value={selected}
              onChange={setSelected}
              name="tags"
              placeHolder="Enter tags"
            />
            <br />
            <div className="mb-6 pt-4">
              <label className="formbold-form-label formbold-form-label-2">
                Upload File
              </label>
              <div className="formbold-mb-5 formbold-file-input">
                <input type="file" name="file" id="file" />
                <label htmlFor="file">
                  <div>
                    <span className="formbold-drop-file">
                      {" "}
                      Drop files here{" "}
                    </span>
                    <span className="formbold-or"> Or </span>
                    <span className="formbold-browse"> Browse </span>
                  </div>
                </label>
              </div>
              {/* <div className="formbold-file-list formbold-mb-5">
                <div className="formbold-file-item">
                  <span className="formbold-file-name"> banner-design.png </span>
                  <button>
                    <svg
                      width={10}
                      height={10}
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
                <div className="formbold-progress-bar">
                  <div className="formbold-progress" />
                </div>
              </div> */}
            </div>
            <div>
              <button className="formbold-btn w-full">Upload Reviewer</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
