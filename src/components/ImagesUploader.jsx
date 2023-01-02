import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const ImagesUploader = ({
  setColorList,
  colorList,
  index,
  fileList,
  deleteString,
  setDeleteString,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    //Is used to change picture
    // const foundIndex = fileList.findIndex(x => x.uid === file.uid);
    // var temp = Array.from(fileList);
    // temp[foundIndex] = file;
    // setFileList(temp);
  };
  const handleChange = ({ fileList: newFileList }) => {
    setColorList(
      colorList.map((color, i) =>
        i === index ? { ...color, fileList: newFileList } : { ...color }
      )
    );
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const handleUpload = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
      //   console.log(file);
    }, 0);
  };

  const onRemove = (file) => {
    setDeleteString([...deleteString,file.id]);
  };

  return (
    <>
      <Upload
        customRequest={handleUpload}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={onRemove}
        accept="image/*"
        // showUploadList={{
        //   showPreviewIcon: true,
        //   previewIcon: (
        //     <Upload name="file" id="custom-upload">
        //       <CameraOutlined
        //         style={{
        //           color: "#fff",
        //         }}
        //         title="Change Picture"
        //         className="opacity-50 hover:opacity-100"
        //       />
        //     </Upload>
        //   ),
        // }}
      >
        {fileList?.length >= 10 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default ImagesUploader;
