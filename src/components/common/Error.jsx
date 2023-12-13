import ErrorSvg from "../../assets/404_page_cover.jpg";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="h-[100%] flex flex-col bg-[#C3E7E5] items-center justify-center">
      {/* <img src={logo} width={250} loading="lazy" className="mx-auto lg:mx-0" /> */}
      <div className="h-full rounded-lg py-1">
        <img src={ErrorSvg} alt="error" className="w-full"/>
      </div>
    </div>
  );
}
