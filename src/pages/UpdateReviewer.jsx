import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import supabase from "../config/supabaseClient";
import { useAuthContext } from "../hooks/useAuthContext";

// assets
import "../assets/css/submit_reviewer.css";
import SubmitLoader from "../components/SubmitLoader";

// component
import Button from "../components/button";

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
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { id } = useParams();
  const [tags, setTags] = useState([]);
  const [reviewerFiles, setReviewerFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleUpdate = async (e) => {
    setIsLoading(true);

    // update reviewers
    const { error: reviewers_error } = await supabase
      .from("reviewers")
      .upsert([reviewerValue]);
    if (reviewers_error) return console.log(reviewers_error.message);

    // delete tags before update
    const { error: delete_error } = await supabase
      .from("tags")
      .delete()
      .eq("reviewer_id", id);
    if (delete_error) return console.log(delete_error.message);

    // update tags
    const updatedTags = tags.map((tag) => {
      return { reviewer_id: id, tag: tag };
    });
    const { error: tags_error } = await supabase
      .from("tags")
      .upsert(updatedTags);
    if (tags_error) return console.log(tags_error.message);

    // update files
    reviewerFiles.forEach(async (data) => {
      let fileType = data.file.type;
      let folder;

      fileType.includes("image") ? (folder = "image") : (folder = "pdf");
      const { error } = await supabase.storage
        .from("reviewers")
        .update(`${folder}/${id}`, data.file, {
          cacheControl: "3600",
          upsert: true,
        });
      if (error) return console.log(error.message);
    });

    navigate('/student/profile')
  };

  const handleDelete = async (e) => {
    setIsLoading(true);
    const { error } = await supabase
      .from("reviewers")
      .delete()
      .eq("reviewer_id", id);

    if (!error) navigate("/student/profile");
  };

  useEffect(() => {
    const fetchReviewer = async () => {
      setIsLoading(true);
      let { data: reviewers, error: reviewers_error } = await supabase
        .from("reviewers")
        .select("reviewer_id ,title, subject, description")
        .eq("reviewer_id", id)
        .eq("student_id", user.id);

      if (reviewers.length) {
        let { data: tags, error: tags_error } = await supabase
          .from("tags")
          .select("tag")
          .eq("reviewer_id", reviewers[0].reviewer_id);

        if (tags_error) console.log(tags_error.message);
        if (tags) {
          const reviewerTags = tags.map((data) => data.tag);
          setTags(reviewerTags);
        }

        setReviewerValue((prevState) => ({
          ...prevState,
          ...reviewers[0],
        }));
      }
      if (reviewers_error) console.log(reviewers_error.message);
      setIsLoading(false);
    };
    fetchReviewer();
  }, []);

  return (
    <div className="submit-reviewer">
      {isLoading && (
        <div className="global-loader">
          <SubmitLoader />
        </div>
      )}
      <h1 className="submit__title">Update Reviewer</h1>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form className="submit-reviewer__form">
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
            <span className="formbold-form-label">Tags</span>
            <TagsInput
              value={tags}
              onChange={setTags}
              name="tags"
              placeHolder="Enter tags"
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
            <div className="update-reviewer__button">
              <Button
                source={"/svg/update.svg"}
                type={"update"}
                text={"Update"}
                action={handleUpdate}
              />
              <Button
                source={"/svg/delete.svg"}
                type={"delete"}
                text={"Delete"}
                action={handleDelete}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
