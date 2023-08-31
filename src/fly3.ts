/*

import { AvatarAnchorPointType, CameraMode, AvatarAttach, CameraType, InputAction, MeshCollider, MeshRenderer, Transform, engine, inputSystem } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { movePlayerTo } from '~system/RestrictedActions'
import * as utils from "@dcl-sdk/utils"

export let flying = new Boolean();
flying = false;
let currentYPosition = 0; // Initialize the current Y position



export function handleVerticalMovement() {
    if (flying) return;

    const playerTransform = Transform.getMutable(engine.PlayerEntity);
    const playerPos = playerTransform.position;

    currentYPosition += 1;

    const newPosition = Vector3.create(playerPos.x, playerPos.y + currentYPosition, playerPos.z);

    playerTransform.position = newPosition;

    
    const mainPlatform = createAndMovePlatform(playerPos);
    function createAndMovePlatform(playerPosition: Vector3) {
        const platform = engine.addEntity();
        Transform.create(platform, {
            position: Vector3.create(playerPosition.x, playerPosition.y + currentYPosition, playerPosition.z),
            scale: Vector3.create(10, 2, 0.2),
        });
        MeshRenderer.setBox(platform);
        MeshCollider.setBox(platform);

        utils.paths.startSmoothPath(
            platform,
            [
                Vector3.create(playerPosition.x, currentYPosition, playerPosition.z),
                Vector3.create(playerPosition.x, currentYPosition + 10, playerPosition.z),
            ],
            5, // duration
            2,
            true,
            // onFinishCallback
            () => {
                currentYPosition += 5;
                createAndMovePlatform(playerPosition);
            }
        );

        return platform;
    }
}

// Add a system to handle vertical movement
engine.addSystem(handleVerticalMovement);
    
 






//AvatarAttach.create(platform, {
//    anchorPointId: AvatarAnchorPointType.AAPT_POSITION -1,
//})


  /*
    // Get the current player's position
    const playerPos = playerTransform.position;
  
    // Get the current camera's position
    const cameraPos = cameraTransform.position;
  
    // Calculate the new Y position for the player (for example, moving up by 1 unit)
    const newY = playerPos.y + 0.001;
  
    // Calculate the new Y position for the camera (maintain the relative offset)
    const newCameraY = cameraPos.y + 0.001;
  
    // Update the player's position
    playerTransform.position = Vector3.create(playerPos.x, newY, playerPos.z);
  
    // Update the camera's position
   // Update the camera's position
const newCameraTransform = Vector3.create(cameraPos.x, newCameraY, cameraPos.z);
cameraTransform.position = newCameraTransform;
*/

  
  
  // Add a system to handle vertical movement
  //engine.addSystem(handleVerticalMovement);


  /*

  export function handleKeyPress() {
    const cmd = inputSystem.getInputCommand(
        InputAction.IA_PRIMARY,
        0
    );
    if (cmd) {
        //what walking triggers goes here
        console.log("walk trigger working");

    movePlayerTo({
        newRelativePosition: Vector3.create(0, 10, 0)

    })
    }

  }
*/
  

/*

  //let previousCameraMode: CameraType

  engine.addSystem(function cameraModeCheck() {
    let cameraEntity = CameraMode.get(engine.CameraEntity)
  
    if (!cameraEntity) return
  
   
      if (cameraEntity.mode == CameraType.CT_THIRD_PERSON) {
        console.log("The player is using the 3rd person camera")
      } else {
        console.log("The player is using the 1st person camera")
      }
    }
  )
  



*/