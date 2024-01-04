const handleFileSelect = (callback, e) => {
  const formData = new FormData();
  e.preventDefault();
  const selectedImgUrl = e.target.files[0];
  if (selectedImgUrl && selectedImgUrl.type.startsWith("image/")) {
    formData.append("img", selectedImgUrl);
    callback();
  }
};

export default handleFileSelect;
