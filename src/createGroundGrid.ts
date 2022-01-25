import * as BABYLON from "babylonjs";
import * as Material from "babylonjs-materials";
import { DuelScene } from "./index";

export function createGroundGrid(scene: DuelScene) {
  const gridMaterial = new Material.GridMaterial("gridMaterial", scene);
  gridMaterial.majorUnitFrequency = 10;
  gridMaterial.minorUnitVisibility = 0;

  gridMaterial.gridRatio = 0.1;
  gridMaterial.backFaceCulling = false;
  gridMaterial.mainColor = new BABYLON.Color3(0, 0, 0);
  gridMaterial.lineColor = new BABYLON.Color3(1, 1, 1);
  // Create Ground
  const ground = BABYLON.Mesh.CreatePlane("ground", 1000.0, scene);
  ground.position = new BABYLON.Vector3(0, -0.001, 0);
  ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);

  ground.material = gridMaterial;
}
