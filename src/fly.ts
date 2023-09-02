import { engine, CameraModeArea, CameraType,Material,TextureFilterMode,MaterialTransparencyMode, Transform, Entity, AvatarAttach, AvatarAnchorPointType, MeshRenderer, MeshCollider, VisibilityComponent, InputAction, pointerEventsSystem, TransformType } from '@dcl/sdk/ecs';
import { Vector3, Quaternion } from '@dcl/sdk/math';
//import * as utils from "@dcl-sdk/utils";
import { movePlayerTo } from '~system/RestrictedActions';
import { triggerSceneEmote } from '~system/RestrictedActions';
import { Color4 } from '@dcl/sdk/math'


//// Ideal mechanism: 
/// Player clicks Fly on UI (or other button) which triggers a custom animation 
// clicking Fly also starts flymode where players gradually move upwards as they move in any direction
// in flymode, when not moving, the player should hover at a constant Y position
// when player clicks exit fly they should fall to the ground and remove flymode





/// Main issue: Player falling instead of hovering in mid air when still and glitchy camera angles




// If a player can perform a custom animation while flying (instead of walking/running) that would be awesome
// If the camera movements could be smoother and less glitchy it would be really nice




let flying = false;
let hovering = false;
let handleVerticalMovementAdded = false;
let playerTransform: TransformType; // Initialize as null
let currentYPosition: number = 0; // Initialize as 0
let lastUpdateTimestamp = 0; // Initialize with current timestamp
//const PlayerTransform = Transform.get(engine.PlayerEntity);

export function toggleFlyingState() {
  flying = !flying;
  // console.log("Toggled flying");
  setupFlyingDemo();
}

export function toggleHoveringState() {
  hovering = !hovering;
  setupFlyingDemo();
}

let platform: Entity //| null = null;


export function setupFlyingDemo() {
  if (flying) {
    if (!handleVerticalMovementAdded) {
      triggerSceneEmote({ src: 'models/fly.glb', loop: true });
      engine.addSystem(handleVerticalMovement);
      handleVerticalMovementAdded = true;
      // console.log("Added flying demo");
    }
   // movePlayerTo({
   //   newRelativePosition: Vector3.create(0, 100, 0),
   // });
  } else {
    if (handleVerticalMovementAdded) {
      engine.removeSystem(handleVerticalMovement);
      // console.log("Removed flying demo");
      handleVerticalMovementAdded = false;
    }
  }

  if (platform && hovering) {
    const platformTransform = Transform.getMutable(platform);
    const PlayerTransform = Transform.get(engine.PlayerEntity);
  
    platformTransform.position.y = playerTransform.position.y;
  }

  else if (platform) {
    engine.removeEntity(platform);
    // platform = null;
    // console.log("exited fly mode")
  }

  if(!flying && !InputAction.IA_ANY && playerTransform) {
    const currentTime = Date.now();
    const timeSinceLastUpdate = currentTime - lastUpdateTimestamp;

    //Limit no. of updates
    if (timeSinceLastUpdate >= 1000000) {
      lastUpdateTimestamp = currentTime;
      const playerPosition = playerTransform.position;
      const updatedPlayerPosition = Vector3.create(playerPosition.x, currentYPosition, playerPosition.z);
      playerTransform.position = updatedPlayerPosition;
    }

    
  }

}

function createPlatform(position: Vector3) {
  if (!platform) {
    platform = engine.addEntity();
    let playerTransform = Transform.getMutable(engine.PlayerEntity)
    Transform.create(platform, {
      position: Vector3.add(playerTransform.position, Vector3.create(0, -2.5, 0)), // Adjust the Y offset as needed
      scale: Vector3.create(10, 0.1, 10),
    });
        
    
    MeshRenderer.setBox(platform);
    MeshCollider.setBox(platform);
    VisibilityComponent.create(platform, { visible: true });

      
   
        //Create material and configure its fields
        Material.setPbrMaterial(platform, {
          texture: Material.Texture.Common({
            src: 'materials/slow_fast_circle.png',
            filterMode: TextureFilterMode.TFM_BILINEAR
          }),
          transparencyMode: MaterialTransparencyMode.MTM_ALPHA_TEST,
          alphaTest: .1
        })

  }
  //AvatarAttach.create(platform, {
  //  anchorPointId: AvatarAnchorPointType.AAPT_POSITION,
  //});
}

// ... (import statements and other code)

// Define initial speed for vertical movement
let verticalSpeed = 0;

// ... (rest of the code)

function handleVerticalMovement() {
  const playerTransform = Transform.get(engine.PlayerEntity);
  const cameraTransform = Transform.get(engine.CameraEntity);

  if (flying) {
    if (!platform) {
      createPlatform(playerTransform.position);
      console.log("Created platform");
    }

    const speed = 0.1;
    const cameraRotation = cameraTransform.rotation;
    const cameraEulerAngles = quaternionToEulerAngles(cameraRotation);
    // console.log("Camera EulerAngles:"+ cameraEulerAngles.x);
    const cameraForward = calculateCameraForward(cameraEulerAngles);
    const offset = calculateOffset(cameraForward, speed);

    if (platform && !hovering) {
      const platformTransform = Transform.getMutable(platform);

      const verticalAngleDegrees = cameraEulerAngles.x;

      const rotationX = cameraEulerAngles.x
      const rotationY = cameraEulerAngles.y

      // console.log("rotation x: "+ cameraEulerAngles.x+ " r y: "+ cameraEulerAngles.y+" r z: "+cameraEulerAngles.z);

      // console.log("Vertical Angle:"+ verticalAngleDegrees);

      
      if (rotationX <= 0 && rotationX >= -0.6 && rotationY >= -1.5 && rotationY <= 1.5) {
        // UP w NW N NE e 
        verticalSpeed = speed;
        console.log("Looking up"+ " x "+rotationX +" y "+rotationY);
      } else if (rotationX <= 3.14 && rotationX >= 2.5 && rotationY >= -1.5 && rotationY <= 1.55) {
        // UP e SE S SW w 
        verticalSpeed = speed;
        console.log("Looking up"+  " x "+rotationX +" y "+rotationY);
      }
      if (rotationX >= 0 && rotationX <= 1.05 && rotationY >= -1.5 && rotationY <= 1.55) {
        // DOWN w NW N NE e 
        verticalSpeed = -speed * 15;
        console.log("Looking down"+ " x "+rotationX +" y "+rotationY);
      } else if (rotationX >= -3.14 && rotationX <= -2.17 && rotationY >= -1.5 && rotationY <= 1.55) {
        // DOWN e SE S SW w 
        verticalSpeed = -speed * 15;
        console.log("Looking down"+ " x "+rotationX +" y "+rotationY);
      }
      
      // if (verticalAngleDegrees >= -7 && verticalAngleDegrees <= 0) {
      //   verticalSpeed = speed;
      //   console.log("Looking up");
      // } else if (verticalAngleDegrees >= 0 && verticalAngleDegrees <= 7) {
      //   verticalSpeed = -speed * 15;
      //   console.log("Looking down");
      // } else {
      //   verticalSpeed = 0; // No vertical movement if outside specified angle ranges
      // }

      // // Calculate the vertical speed based on camera angle
      // if (verticalAngleDegrees >= -7 && verticalAngleDegrees <= 0) {
      //   verticalSpeed = speed;
      //   console.log("Looking up");
      // } else if (verticalAngleDegrees >= 0 && verticalAngleDegrees <= 7) {
      //   verticalSpeed = -speed * 15;
      //   console.log("Looking down");
      // } else {
      //   verticalSpeed = 0; // No vertical movement if outside specified angle ranges
      // }

      // Modify the offset to include vertical movement
      const modifiedOffset = calculateOffsetWithVertical(offset, verticalSpeed);

      // Calculate the new platform position
      const newPlatformPosition = calculateNewPosition(playerTransform.position, modifiedOffset);
      platformTransform.position = newPlatformPosition;
    }
  } else if (platform) {
    engine.removeEntity(platform);
    // platform = null;
    console.log("Exited fly mode");
  }
}

// Function to calculate offset with vertical movement
function calculateOffsetWithVertical(offset: Vector3, verticalSpeed: number): Vector3 {
  const modifiedOffset = Vector3.create(
    offset.x,
    offset.y + verticalSpeed, // Add vertical movement
    offset.z
  );
  return modifiedOffset;
}

// ... (rest of the code)

// ... (export statements and comments)



// Maths to switch between quaternion and euler for the camera
function quaternionToEulerAngles(quaternion: Quaternion): Vector3 {
  const x = Math.atan2(2 * (quaternion.w * quaternion.x + quaternion.y * quaternion.z),
    1 - 2 * (quaternion.x * quaternion.x + quaternion.y * quaternion.y));
  const y = Math.asin(2 * (quaternion.w * quaternion.y - quaternion.z * quaternion.x));
  const z = Math.atan2(2 * (quaternion.w * quaternion.z + quaternion.x * quaternion.y),
    1 - 2 * (quaternion.y * quaternion.y + quaternion.z * quaternion.z));
  return Vector3.create(x, y, z);
}

// // Calculate camera direction
// function calculateCameraForward(cameraEulerAngles: Vector3): Vector3 {
//   const cameraForward = Vector3.create(
//     Math.sin(cameraEulerAngles.y),
//     0,
//     Math.cos(cameraEulerAngles.y)
//   );
//   return cameraForward;
// }



// Calculate camera direction
function calculateCameraForward(cameraEulerAngles: Vector3): Vector3 {
  const cameraForward = Vector3.create(
    //NW
    // Math.cos(cameraEulerAngles.y),
    // 0,
    // Math.sin(cameraEulerAngles.y)
    //NE
    // Math.sin(cameraEulerAngles.y),
    // 0,
    // Math.cos(cameraEulerAngles.y)

    Math.cos(cameraEulerAngles.y),
    0,
    Math.sin(cameraEulerAngles.y)
  );
  return cameraForward;
}
// Calculate offset
function calculateOffset(cameraForward: Vector3, speed: number): Vector3 {
  const offset = Vector3.create(
    cameraForward.x * speed,
    cameraForward.y * speed,
    cameraForward.z * speed
  );
  return offset;
}

// Calculate new position
function calculateNewPosition(position: Vector3, offset: Vector3): Vector3 {
  const newPosition = Vector3.create(
    position.x + offset.x,
    position.y + offset.y,
    position.z + offset.z
  );
  return newPosition;
}

/*
// Function to exit fly mode and drop the player to the floor
export function exitFlyMode() {
  flying = false; // Disable flying mode

  if (platform) {
    engine.removeEntity(platform); // Remove the platform
    platform = null; // Reset the platform reference
    console.log("exited fly mode");
    engine.removeSystem(handleVerticalMovement)
  }
}
*/