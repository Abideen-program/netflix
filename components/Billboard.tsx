import useBillboard from "@/hook/useBillboard";

const Billboard = () => {
  const { data } = useBillboard();

  return <div>Billboard</div>;
};

export default Billboard;
