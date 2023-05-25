import { PUBLIC_STATIC_ASSETS_URL } from '@/config';

type Props = {
  width?: string;
  src: string;
  noData?: JSX.Element;
};
const ImageView: React.FC<Props> = ({ src, width = 'auto', noData }) => {
  return (
    <div>
      {src ? (
        <img
          style={{ width: width }}
          src={PUBLIC_STATIC_ASSETS_URL + src}
          alt="图片"
        />
      ) : (
        noData ?? <div>暂无数据</div>
      )}
    </div>
  );
};
export default ImageView;
