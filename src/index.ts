import { Engine, Scene, HemisphericLight, Vector3, CannonJSPlugin, StandardMaterial, DirectionalLight, Color4 } from "babylonjs";
import * as GUI from  "babylonjs-gui";
import {CloudProceduralTexture, GrassProceduralTexture} from "babylonjs-procedural-textures";
import { addSpheres } from "./sphere";
import { addLabelToScene, updateScore } from "./score";
var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true);

console.log('I am running')
function createScene(): Scene {
    // Create scene
    const scene: Scene = new Scene(engine);
    
    const sphereLight = new DirectionalLight("dir02", new Vector3(0.2, -1, 0), scene);
    sphereLight.position = new Vector3(0, 80, 0);

    const gravityVector = new BABYLON.Vector3(0, -1, 0);
    scene.enablePhysics(gravityVector, new CannonJSPlugin);

    scene.clearColor = BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    const camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 2, 0), scene);
    //const camera = new BABYLON.("UniversalCamera", new BABYLON.Vector3(0, 2,0), scene);
    //camera.checkCollisions = true;
    // camera.applyGravity = true;
    7
    // Targets the camera to a particular position. In this case the scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas
    camera.attachControl(canvas, true);


    // I made a grid material
    var grassMaterial = new BABYLON.GridMaterial("grid", scene);
    grassMaterial.majorUnitFrequency = 10;
    grassMaterial.minorUnitVisibility = 0;
    grassMaterial.gridRatio = 0.1;
    grassMaterial.backFaceCulling = false;
    grassMaterial.mainColor = new BABYLON.Color3(0, 0, 0);
    grassMaterial.lineColor = new BABYLON.Color3(1, 1, 1);
    
    scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
          case BABYLON.KeyboardEventTypes.KEYDOWN:
            if (kbInfo.event.key === 'z') {
                console.log('I got here')

                const currentPosition = new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z);
                currentPosition.y ++
                camera.position = currentPosition;
                // update the camera position
                camera.position = new BABYLON.Vector3(currentPosition.x, currentPosition.y, currentPosition.z);                
            }
            if (kbInfo.event.key === 'x') {
                camera.position.z -= 1;
            }
            camera.update()
            break;
          case BABYLON.KeyboardEventTypes.KEYUP:
            console.log("KEY UP: ", kbInfo.event.code);
            break;
        }
      });
    // Create Ground
    var ground = BABYLON.Mesh.CreatePlane("ground", 150.0, scene);
    ground.position = new BABYLON.Vector3(0, -0.001, 0);
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);

    ground.material = grassMaterial;
 
    // Create the 3D UI manager
    var manager = new GUI.GUI3DManager(scene);
    // Create a horizontal stack panel
    var panel = new GUI.StackPanel3D();
    panel.margin = 0.02;
    manager.addControl(panel);
    startGameButton(panel);
    addLabelToScene();
    // Enable VR
    var vrHelper = scene.createDefaultVRExperience();
    vrHelper.enableInteractions();

    return scene;
}

var startGameButton = function (panel) {
    var button = new GUI.Button3D();
    panel.addControl(button);
    button.onPointerUpObservable.add(function () {
        //reset score
        updateScore(0);
        addSpheres(scene);
    });
    var text1 = new GUI.TextBlock();
    text1.text = "Eat a weasel";
    text1.color = "white";
    text1.fontSize = 12;
    button.content = text1;
}
var scene: Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});
