import * as BABYLON from "babylonjs";
import * as Material from "babylonjs-materials";
import { DuelScene } from "./index";

export function createPlayerMarker(scene: DuelScene) {
    // create a rainbow pyramid 3d model with all colors
    // array of all colors in the rainbox
    const rainbow = [
        BABYLON.Color3.Red(),
        new BABYLON.Color3(1, 0.5, 0),
        BABYLON.Color3.Yellow(),
        BABYLON.Color3.Green(),
        BABYLON.Color3.Blue(),
        new BABYLON.Color3(122 / 255, 0, 229 / 255),
        new BABYLON.Color3(212 / 255, 0, 200 / 255),
    ];

    let meshArray = [];
    // create a pyramid of rainbow coloured cylinders
    for (let f = 0; f < 28; f++) {
        const cylinder = BABYLON.MeshBuilder.CreateCylinder(
            "rainbowCylinder",
            {
                diameter: (28 - f) * 4,
                height: 1,
                tessellation: 12 + 6 * (28 - f),
            },
            scene
        );
        cylinder.material = new Material.SimpleMaterial("rainbow", scene);
        (cylinder.material as any).diffuseColor = rainbow[f % rainbow.length];
        cylinder.position.y = f;
        cylinder.position.x = 0;
        cylinder.position.z = 0;
        meshArray.push(cylinder);
    }
    // Put the meshArray into a group
    const playerMarker = new BABYLON.Mesh("playerMarker");
    for (let i = 0; i < meshArray.length; i++) {
        playerMarker.addChild(meshArray[i]);
    }

    playerMarker.position = new BABYLON.Vector3(0, -25, 100);

    return playerMarker;
}
