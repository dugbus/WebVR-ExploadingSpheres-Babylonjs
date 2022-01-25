import * as BABYLON from "babylonjs";
import * as Material from "babylonjs-materials";
import { addParticlesToMesh, removeParticlesFromMesh } from "./particles";
import { incrementScore } from "./score";

export function addSpheres(scene: BABYLON.Scene) {
  for (let index = 0; index < 10; index++) {
    addSphere(scene);
  }
}

const addSphere = function (scene: BABYLON.Scene) {
  // Create sphere
  const sphere: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 1 },
    scene as BABYLON.Scene
  );
  sphere.position = new BABYLON.Vector3(
    Math.random() * 20 - 10,
    10,
    Math.random() * 10 - 5
  );
  sphere.material = new Material.SimpleMaterial("sphere material", scene);
  sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
    sphere,
    BABYLON.PhysicsImpostor.SphereImpostor,
    { mass: 1 },
    scene
  );

  // Material
  const materialAmiga = new Material.NormalMaterial("amiga", scene);
  materialAmiga.diffuseTexture = new BABYLON.Texture(
    "textures/amiga.jpg",
    scene
  );
  sphere.material = materialAmiga;

  sphere.actionManager = new BABYLON.ActionManager(scene);
  //add click event to sphere
  sphere.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPickUpTrigger,
      function () {
        const particleSystem = addParticlesToMesh(
          sphere as BABYLON.AbstractMesh,
          scene
        );
        scene.removeMesh(sphere);
        sleep(250).then(() => {
          removeParticlesFromMesh(particleSystem);
          incrementScore();
        });
      }
    )
  );

  const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
};
