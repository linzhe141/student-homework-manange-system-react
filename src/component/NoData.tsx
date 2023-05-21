import noData from '@/assets/img/no-data.png';
const NoData = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={noData} alt="暂无数据" className="w-[300px]" />
      <span className=" pt-2 text-gray-400">暂无数据！</span>
    </div>
  );
};
export default NoData;
