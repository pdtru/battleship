import Footer from "./component/Footer";
import GameContainer from "./component/GameContainer";
import Header from "./component/Header";
import { useEffect } from "react";
import GameController from "./controllers/GameController";

const App = () => {
  useEffect(() => {
    GameController.initialize();
  }, []);

  return (
    <>
      <Header />
      <GameContainer />
      <Footer />
    </>
  );
};

export default App;
