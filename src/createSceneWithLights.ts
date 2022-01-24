import * as BABYLON from "babylonjs";
import { DuelScene, engine } from "./index";

export function createSceneWithLights() {
  const scene: DuelScene = new BABYLON.Scene(engine);
  scene.duel = {
    players: [],
  };

  const sphereLight = new BABYLON.DirectionalLight(
    "dir02",
    new BABYLON.Vector3(1, 0, 0),
    scene
  );
  sphereLight.diffuse = new BABYLON.Color3(1, 1, 1);
  sphereLight.position = new BABYLON.Vector3(80, 0, 0);

  const ambientLight = new BABYLON.HemisphericLight(
    "ambient",
    new BABYLON.Vector3(0, 0.75, 0),
    scene
  );
  ambientLight.diffuse = new BABYLON.Color3(0.8, 0.8, 0.8);
  ambientLight.specular = new BABYLON.Color3(1, 1, 1);
  ambientLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);

  const gravityVector = new BABYLON.Vector3(0, -1, 0);
  scene.enablePhysics(gravityVector);

  scene.clearColor = BABYLON.Color4.FromColor3(BABYLON.Color3.Black());
  return scene;
}
