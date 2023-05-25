import { UPLOAD_STATIC_ASSETS_URL } from '@/config';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message as $message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useState } from 'react';
import { useGlobalStore } from '../../store/store';

type Props = {
  onIdChangeHandle: (id: number) => void;
};

const UplodAvatar: React.FC<Props> = ({ onIdChangeHandle }) => {
  const token = useGlobalStore((state) => state.token);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const response = info.file.response;
      if (response.success) {
        onIdChangeHandle(response.data);
      }
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div>
      <Upload
        accept=".jpg,.png,.gif"
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={UPLOAD_STATIC_ASSETS_URL}
        headers={{
          Authorization: token,
        }}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
};
export default UplodAvatar;
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
const beforeUpload = (file: RcFile) => {
  const isJpgOrPng =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/gif';
  if (!isJpgOrPng) {
    $message.error('只能上传JPG/PNG/GIF文件!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    $message.error('图片大小不能超过2MB!');
  }
  return isJpgOrPng && isLt2M;
};
