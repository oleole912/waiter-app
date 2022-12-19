import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Table from "./components/pages/Table";
import NotFound from "./components/views/NotFound";
import Header from "./components/views/Header";
import Footer from "./components/views/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTables } from "./redux/tablesRedux";
import AddTableForm from "./components/pages/AddTableForm";


function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/newtable" element={<AddTableForm />}></Route>
        <Route path="/table/:id" element={<Table />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
