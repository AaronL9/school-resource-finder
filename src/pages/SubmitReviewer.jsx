import React, { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import supabase from "../config/supabaseClient";
import { useAuthContext } from "../hooks/useAuthContext";

// assets
import "../assets/css/submit_reviewer.css";
import SubmitLoader from "../components/SubmitLoader";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

export default function SubmitReviewer() {
  const { user } = useAuthContext();
  const [tags, setTags] = useState([]);
  const [reviewerFiles, setReviewerFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewerValue, setReviewerValue] = useState({
    student_id: user.id,
    title: "",
    subject: "",
    description: "",
  });

  console.log(tags.length)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewerValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    document.body.style.overflow = "hidden";

    const { data: reviewer_data, error: reviewer_error } = await supabase
      .from("reviewers")
      .insert(reviewerValue)
      .select();

    if (reviewer_data) {
      const reviewer_id = reviewer_data[0].reviewer_id;

      // store tags
      const tagRows = tags.map((tag) => {
        return { reviewer_id, tag };
      });
      await supabase.from("tags").insert(tagRows);

      // store files
      reviewerFiles.forEach(async (data) => {
        let fileType = data.file.type;
        let folder;

        fileType.includes("image") ? (folder = "image") : (folder = "pdf");

        const { data:file, error } = await supabase.storage
          .from("reviewers")
          .upload(`${folder}/${reviewer_id}`, data.file);

        if (error) console.log(error.message);
      });

      console.log("uploaded");
    }

    if (reviewer_error) return console.log(error.message);
    setTags([])
    setReviewerFiles([])
    setReviewerValue({
      student_id: user.id,
      title: "",
      subject: "",
      description: "",
    });
    document.body.style.overflow = "visible";
    setIsLoading(false);
  };

  return (
    <div className="submit-reviewer">
      {isLoading && (
        <div className="global-loader">
          <SubmitLoader />
        </div>
      )}
      <h1 className="submit__title">Submit Reviewer</h1>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form className="submit-reviewer__form" onSubmit={handleSubmit}>
            <div className="formbold-mb-5">
              <label htmlFor="title" className="formbold-form-label">
                Title:
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter Title"
                className="formbold-form-input"
                value={reviewerValue.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="formbold-mb-5">
              <label htmlFor="subject" className="formbold-form-label">
                Subject:
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Enter Subject"
                className="formbold-form-input"
                value={reviewerValue.subject}
                onChange={handleInputChange}
                required
              />
            </div>
            <span className="formbold-form-label">Tags (max: 4)</span>
            <TagsInput
              value={tags}
              onChange={tags.length < 4 ? setTags : null}
              name="tags"
              placeHolder={tags.length < 4 ? 'Enter tags' : null}
              isEditOnRemove={true}
            />
            <br />
            <div className="formbold-mb-5">
              <label htmlFor="description" className="formbold-form-label">
                Description:
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                placeholder="Enter description"
                className="formbold-form-input"
                rows={10}
                value={reviewerValue.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <FilePond
              files={reviewerFiles}
              onupdatefiles={setReviewerFiles}
              allowMultiple={true}
              acceptedFileTypes={["application/pdf", "image/*"]}
              allowFileTypeValidation={true}
              maxFiles={2}
              name="file" /* sets the file input name, it's filepond by default */
              labelIdle='Drag & Drop your pdf and image or <span className="filepond--label-action">Browse</span>'
              required
            />
            <div>
              <button className="formbold-btn w-full">Upload Reviewer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
