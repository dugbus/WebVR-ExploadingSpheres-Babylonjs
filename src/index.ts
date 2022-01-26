import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import { addSpheres } from "./sphere";
import { addLabelToScene, updateScore } from "./score";
import * as Material from "babylonjs-materials";
import { MergeMeshesOptimization } from "babylonjs/index";
import { createSceneWithLights } from "./createSceneWithLights";
import { setupCamera } from "./setupCamera";
import { createGroundGrid } from "./createGroundGrid";
import { handleKeyboard } from "./handleKeyboard";
import { createPlayerMarker } from "./createPlayerMarker";

export const canvas = document.getElementById(
  "renderCanvas"
) as HTMLCanvasElement;
export const engine: BABYLON.Engine = new BABYLON.Engine(canvas, true, {
  deterministicLockstep: true,
});

export interface DuelScene extends BABYLON.Scene {
  duel?: {
    camera?: BABYLON.VRDeviceOrientationArcRotateCamera;
    sphereLight?: BABYLON.DirectionalLight;
    players?: Array<BABYLON.Mesh>;
  };
}
function createScene(): BABYLON.Scene {
  // Create scene
  const scene: DuelScene = createSceneWithLights();

  setupCamera(scene);

  // const pipeline = new BABYLON.DefaultRenderingPipeline(
  //   "defaultPipeline", // The name of the pipeline
  //   true, // Do you want the pipeline to use HDR texture?
  //   scene, // The scene instance
  //   [scene.duel.camera] // The list of cameras to be attached to
  // );
  // pipeline.bloomEnabled = true;
  // pipeline.bloomThreshold = 0.8;
  // pipeline.bloomWeight = 0.3;
  // pipeline.bloomKernel = 64;
  // pipeline.bloomScale = 0.5;

  createGroundGrid(scene);

  handleKeyboard(scene);
  const sky = BABYLON.MeshBuilder.CreateBox("sky", { size: 1000 }, scene);
  sky.material = new Material.SkyMaterial("sky", scene);

  const playerMarker: BABYLON.Mesh = createPlayerMarker(scene);

  scene.duel.players.push(playerMarker);

  const manager = new GUI.GUI3DManager(scene);

  // Create a horizontal stack panel
  const panel = new GUI.StackPanel3D();
  panel.margin = 0.02;
  manager.addControl(panel);
  //startGameButton(panel);
  addLabelToScene();
  // Enable VR
  const vrHelper = scene.createDefaultVRExperience();
  vrHelper.enableInteractions();

  return scene;
}

const startGameButton = function (panel: GUI.StackPanel3D) {
  const button = new GUI.Button3D();
  panel.addControl(button);
  button.onPointerUpObservable.add(function () {
    //reset score
    updateScore(0);
    addSpheres(scene);
  });
  const text1 = new GUI.TextBlock();
  text1.text = "Eat a weasel";
  text1.color = "white";
  text1.fontSize = 12;
  button.content = text1;
};
var scene: DuelScene = createScene();

engine.runRenderLoop(() => {
  //scene.duel.players[0].position.y += 0.01;
  scene.render();
});
