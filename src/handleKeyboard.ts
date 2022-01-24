import * as BABYLON from "babylonjs";
import { DuelScene } from "./index";

export function handleKeyboard(scene: DuelScene) {
  scene.onKeyboardObservable.add((kbInfo) => {
    switch (kbInfo.type) {
      case BABYLON.KeyboardEventTypes.KEYDOWN:
        if (kbInfo.event.key === "z") {
          scene.activeCamera.position.y++;
        }
        if (kbInfo.event.key === "x") {
          scene.activeCamera.position.y--;
        }

        break;
      case BABYLON.KeyboardEventTypes.KEYUP:
        console.log("KEY UP: ", kbInfo.event.code);
        break;
    }
  });
}
