import React, { useEffect, useState } from "react";
import "../assets/css/submit_reviewer.css";
import { TagsInput } from "react-tag-input-component";
import supabase from "../config/supabaseClient";
import { useAuthContext } from "../hooks/useAuthContext";

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
  const [reviewerValue, setReviewerValue] = useState({
    student_id: user.id,
    title: "",
    subject: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewerValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

        const { error } = await supabase.storage
          .from("reviewers")
          .upload(`${folder}/${reviewer_id}`, data.file);

        if (error) console.log(error.message);
      });

      console.log('uploaded')
    }

    if (reviewer_error) console.log(error.message);
  };

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     // Use the JS library to download a file.

  //     const { data, error } = await supabase.storage
  //       .from("reviewer_pdf")
  //       .download("images/reviewer_image");

  //     if (error) console.log(error.message)
  //     if (data) {
  //       setImage(URL.createObjectURL(data));
  //     }
  //   };
  //   fetchImage();
  // }, []);
  return (
    <>
      <h1 className="submit__title">Submit Reviewer</h1>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form onSubmit={handleSubmit}>
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
            </div>
            <div className="formbold-mb-5">
              <label htmlFor="description" className="formbold-form-label">
                Short Description:
              </label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Enter description"
                className="formbold-form-input"
                onChange={handleInputChange}
              />
            </div>
            <label className="formbold-form-label">Tags</label>
            <TagsInput
              value={tags}
              onChange={setTags}
              name="tags"
              placeHolder="Enter tags"
            />
            <br />
            <FilePond
              files={reviewerFiles}
              onupdatefiles={setReviewerFiles}
              allowMultiple={true}
              acceptedFileTypes={["application/pdf", "image/*"]}
              allowFileTypeValidation={true}
              maxFiles={2}
              name="file" /* sets the file input name, it's filepond by default */
              labelIdle='Drag & Drop your pdf and image or <span class="filepond--label-action">Browse</span>'
            />
            <div>
              <button className="formbold-btn w-full">Upload Reviewer</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
