import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const NftVideoUploader = ({ getUploadedFile }) => {
    const props = {
        name: "file",
        multiple: false,
        maxCount: 1,
        accept: "video/*",
        onChange(info) {
            const { status } = info.file;
            if (status === "done") {
                message.success(
                    `${info.file.name} file uploaded successfully.`
                );
                getUploadedFile(info.file.originFileObj);
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
        action: "/api/noop",
    };

  return (
    <Dragger {...props}>
        <p className="ant-upload-drag-icon">
            <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to upload</p>
        <p className="ant-upload-hint">
            Upload an Video that will be your NFTs representation.
        </p>
    </Dragger>
  );
};

export default NftVideoUploader