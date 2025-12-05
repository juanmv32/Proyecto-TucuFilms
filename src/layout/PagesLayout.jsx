import { Outlet } from "react-router-dom";
import NavBarApp from "../components/NavbarApp";
import FooterApp from "../components/FooterApp";

const PagesLayout = () => {
  return (
    <>
      <header>
        <NavBarApp/>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <FooterApp/>
      </footer>
    </>
  );
};

export default PagesLayout;