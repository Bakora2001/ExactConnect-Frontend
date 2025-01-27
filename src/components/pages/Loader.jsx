import { TailSpin } from "react-loader-spinner";

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <TailSpin
        height="80"
        width="80"
        color="#7C25BA"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
