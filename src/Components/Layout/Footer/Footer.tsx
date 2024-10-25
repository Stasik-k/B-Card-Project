import { Footer, FooterLink } from "flowbite-react";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { TRootState } from "../../../Store/BigPie";
import { Link } from "react-router-dom";
import { IoCardSharp } from "react-icons/io5";



const Footer1 = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);

  return (
    <Footer container
      className="flex flex-col items-center justify-center"
    >
      <Footer.LinkGroup className="gap-5">
        <FooterLink className="mt-[13px]" href="/about">About</FooterLink>

        {user && (
          <>
            <Link to="/mycards"><IoCardSharp style={{ margin: '0 23px' }} />My Cards</Link>
            <Link to="/favorites"><FaHeart style={{ margin: '0 20px', color: 'red' }} />Favorites</Link>


          </>
        )}
      </Footer.LinkGroup>
    </Footer>
  );
};

export default Footer1;
