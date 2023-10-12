abstract class GameMessageController {
  public static createSetUpMessage = (shipName: string) => {
    return `Place your ${shipName}`;
  };
}

export default GameMessageController;
