import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import NewsbodyData from "./Components/newBodyData";
import Footer from "./Components/footer";
import Category from "./Components/category";
import News from "./Components/news";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<NewsbodyData />}></Route>
          <Route path="/news/:newsId" exact element={<News />}></Route>
          <Route path="/:categoryName" exact element={<Category />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
