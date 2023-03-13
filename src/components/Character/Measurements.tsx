const Measurements = ({
  amount,
  metric,
  isLoading,
}: {
  amount?: string;
  metric: string;
  isLoading?: boolean;
}) => {
  return (
    <div className="flex flex-col items-center gap-[6px]">
      {isLoading ? (
        <>
          <div className="h-[36px] w-[36px] rounded-full bg-gray-300"></div>
          <span className="my-1 h-2 w-8 rounded bg-gray-300"></span>
        </>
      ) : amount && amount !== "unknown" ? (
        <>
          <div className="relative h-[36px] w-[36px]">
            <span className="absolute top-0 left-0 rounded-full border-[3px] border-[#212121] p-[15px]"></span>
            <span
              className={`absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-[15px] ${
                amount.length > 3 ? "text-xs" : ""
              }`}
            >
              {amount}
            </span>
          </div>
          <span className="text-xs">{metric}</span>
        </>
      ) : null}
    </div>
  );
};

export default Measurements;
