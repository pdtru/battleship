import Footer from "./component/Footer";
import GameContainer from "./component/GameContainer";
import Header from "./component/Header";
import { useEffect } from "react";
import AppState from "./stores/AppState";
import GameBoard from "./models/GameBoard";

const App = () => {
  useEffect(() => {
    const cpuBoard = new GameBoard();
    cpuBoard.setRandomShips();
    AppState.playerBoard = new GameBoard();
    AppState.cpuBoard = cpuBoard;
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
