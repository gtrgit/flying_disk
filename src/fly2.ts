/*import { Schemas, engine, Transform, MeshRenderer, MeshCollider, AvatarAttach } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"


export let flying = new Boolean
flying = false
let currentYPosition = 0; // Initialize the current Y position


  
// Define custom component
const MoveTransportData = {
    start: Schemas.Vector3,
    end: Schemas.Vector3,
    fraction: Schemas.Float,
    speed: Schemas.Float,
  }
  
  const LerpTransformComponent = engine.defineComponent("LerpTransformComponent", MoveTransportData)
  

  
  // Define system for tracking player position and rotation
  export function getPlayerPosition() {
    if (!Transform.has(engine.PlayerEntity)) return;
    if (!Transform.has(engine.CameraEntity)) return;
  
    const playerPos = Transform.get(engine.PlayerEntity).position;
    const playerRot = Transform.get(engine.PlayerEntity).rotation;
  
    // Create entity for the platform
    const myEntity = engine.addEntity();
    Transform.create(myEntity, {
        position: Vector3.create(4, 1, 4)
    });
    MeshRenderer.setBox(myEntity);
    MeshCollider.setBox(myEntity);
    AvatarAttach.create(myEntity)



      // Define system for moving the platform
function LerpMove(dt: number) {
    let transform = Transform.getMutable(myEntity)
    let lerp = LerpTransformComponent.getMutable(myEntity)
    if (lerp.fraction < 1) {
      lerp.fraction += dt * lerp.speed
      transform.position = Vector3.lerp(lerp.start, lerp.end, lerp.fraction)
    }
  }


    // Use the player position to update the platform's end position
    let platformLerp = LerpTransformComponent.getMutable(myEntity);
    platformLerp.end = Vector3.create(playerPos.x, playerPos.y + 1, playerPos.z);
  
    const CameraPos = Transform.get(engine.CameraEntity).position;
    const CameraRot = Transform.get(engine.CameraEntity).rotation;
  
    console.log('playerPos: ', playerPos);
    console.log('playerRot: ', playerRot);
    console.log('cameraPos: ', CameraPos);
    console.log('cameraRot: ', CameraRot);
    
    
    
    // Create LerpTransformComponent for the platform
    LerpTransformComponent.create(myEntity, {
        start: Vector3.create(4, 1, 4),
        end: Vector3.create(4, 10, 4), // End position is initially the same as start position
        fraction: 0,
        speed: 1
    });
    
    // Add systems to the engine
    engine.addSystem(LerpMove);
    engine.addSystem(getPlayerPosition);
}
  
*/


//// HEREHEHEHEHEHEHEHERHEREHRE

////////////////
//// Glitchy working code for fly.ts ///////
////////////

/*import { AvatarAnchorPointType, CameraMode, AvatarAttach, CameraType, InputAction, MeshCollider, MeshRenderer, Transform, engine, inputSystem } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { movePlayerTo } from '~system/RestrictedActions'
import * as utils from "@dcl-sdk/utils"

export let flying = new Boolean
flying = false
let currentYPosition = 0; // Initialize the current Y position

export function handleVerticalMovement() {
    if (flying) return;
  
    //const cameraTransform = Transform.getMutable(engine.CameraEntity);

    
    //if (Transform.has(engine.PlayerEntity)) return;
    
    const playerTransform = Transform.getMutable(engine.PlayerEntity);
    const playerPos = playerTransform.position;
    
    currentYPosition += 1;
    
    const newPosition = Vector3.create(playerPos.x, playerPos.y + currentYPosition, playerPos.z)
    
    playerTransform.position = newPosition;
    
    // simultaneously add a collider under the avatar
    
    movePlayerTo({
         newRelativePosition: Vector3.create(0, 10, 0)
      })


    // make invisible
    const platform = engine.addEntity()
    Transform.create(platform, {
        position: Vector3.create(playerPos.x, playerPos.y + currentYPosition, playerPos.z),
        scale: Vector3.create(10, 2, .2),
        //rotation: Quaternion.fromEulerDegrees(0, 0, 90)
    })
    MeshRenderer.setBox(platform)
    MeshCollider.setBox(platform)
    //AvatarAttach.createOrReplace(platform)


    
           // function to update platform position to match player position
           function followAvatar(dt: number) {
            Transform.createOrReplace(platform, {
                position: Vector3.create(playerPos.x, currentYPosition +2, playerPos.z),
                //scale: Vector3.create(10, .2, 10)
            })
        }
    followAvatar(1)



    function createAndMovePlatform() {

    
        //add something to push the platform up?
        utils.paths.startSmoothPath(
            platform,
            [Vector3.create (playerPos.x, currentYPosition, playerPos.z),
                Vector3.create (playerPos.x, currentYPosition +10, playerPos.z)
            ],
            5, //duration
            2,
            true,
            //onFinishCallback
            () => {
                currentYPosition += 5;

                createAndMovePlatform()
            }
    
        )
    }
    createAndMovePlatform()
    
    //createAndMovePlatform()
    
        //add a delay to this
     
    
 




    }

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