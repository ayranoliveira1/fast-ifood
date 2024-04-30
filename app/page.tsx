import CategotyList from "./components/categoty-list";
import Header from "./components/header";
import Search from "./components/search";

const Home = () => {
  return (
    <>
      <Header />

      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategotyList />
      </div>
    </>
  );
};

export default Home;
