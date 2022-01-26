import * as BABYLON from "babylonjs";
import * as Material from "babylonjs-materials";
import { DuelScene } from "./index";

export function createGroundGrid(scene: DuelScene) {
  // Material
  const checkerMaterial = new BABYLON.StandardMaterial("amiga", scene);
  // Load the wireframe texture as a wrapping texture

  checkerMaterial.diffuseTexture = new BABYLON.Texture(
    "./wireframe.png",
    scene
  );
  console.log(checkerMaterial);
  //checkerMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  checkerMaterial.diffuseTexture.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
  checkerMaterial.diffuseTexture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
  checkerMaterial.specularColor = new BABYLON.Color3(1.0, 1.0, 1.0);

  checkerMaterial.backFaceCulling = true;

  // Create a plane with the gridMaterial tiled across it

  const ground = BABYLON.MeshBuilder.CreateTiledPlane(
    "bigoldplane",
    {
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
      pattern: BABYLON.Mesh.NO_FLIP,
      width: 400,
      height: 400,
      tileSize: 4,
      tileWidth: 4,
      alignHorizontal: 1,
      alignVertical: 1,
    },
    scene
  );

  // // Create Ground
  //const ground = BABYLON.Mesh.CreatePlane("ground", 1000.0, scene);
  ground.position = new BABYLON.Vector3(0, -0.001, 0);
  ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);

  ground.material = checkerMaterial;
  ground.checkCollisions = true;
  ground.isPickable = false;

  new BABYLON.PhysicsImpostor(
    ground,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 0 },
    scene
  );
}
