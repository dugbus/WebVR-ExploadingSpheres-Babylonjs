import * as BABYLON from "babylonjs";
import { DuelScene, canvas } from "./index";

export function setupCamera(scene: DuelScene) {
    scene.duel.camera = new BABYLON.VRDeviceOrientationArcRotateCamera(
        "Camera",
        Math.PI / 2,
        Math.PI / 4,
        25,
        new BABYLON.Vector3(0, 0, 0),
        scene
    );
    //const camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 2, 0), scene);
    //const camera = new BABYLON.("UniversalCamera", new BABYLON.Vector3(0, 2,0), scene);
    //camera.checkCollisions = true;
    // camera.applyGravity = true;
    // Targets the camera to a particular position. In this case the scene origin
    scene.duel.camera.setTarget(BABYLON.Vector3.Zero());
    scene.duel.camera.position = new BABYLON.Vector3(0, 2, -10);
    // Attach the camera to the canvas
    scene.duel.camera.attachControl(canvas, true);
}
