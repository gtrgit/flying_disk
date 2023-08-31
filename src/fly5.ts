/*
import { engine, CameraModeArea, CameraType, Transform, Entity, AvatarAttach, AvatarAnchorPointType, MeshRenderer, MeshCollider, VisibilityComponent, InputAction, pointerEventsSystem } from '@dcl/sdk/ecs';
import { Vector3, Quaternion } from '@dcl/sdk/math';
import * as utils from "@dcl-sdk/utils";
import { movePlayerTo, triggerEmote } from '~system/RestrictedActions';
import { triggerSceneEmote } from '~system/RestrictedActions';







let flying = false;
let currentYPosition = 0;
let hovering = false;
let handleVerticalMovementAdded = false;

export function toggleFlyingState() {
  flying = !flying;
  console.log("toggled flying");
  setupFlyingDemo();
}

export function toggleHoveringState() {
  hovering = !hovering;
  if (hovering) {
    handleHovering();
  }
}

let platform: Entity | null = null;

export function setupFlyingDemo() {
  if (flying) {
    if (!handleVerticalMovementAdded) {
      engine.addSystem(handleVerticalMovement);
      handleVerticalMovementAdded = true;
      console.log("added flying demo");
      
    }
    movePlayerTo({
      newRelativePosition: Vector3.create(0, 10, 0),
    });
  } else {
    if (handleVerticalMovementAdded) {
      engine.removeSystem(handleVerticalMovement);
      console.log("removed flying demo");
      handleVerticalMovementAdded = false;
    }
  }
}

function createPlatform(position: Vector3) {
  platform = engine.addEntity();
  Transform.create(platform, {
    position: position,
    scale: Vector3.create(5, 0.5, 5),
  });
  AvatarAttach.create(platform, {
    anchorPointId: AvatarAnchorPointType.AAPT_POSITION,
  });
  MeshRenderer.setBox(platform);
  MeshCollider.setBox(platform);
  VisibilityComponent.create(platform, { visible: false });
}

function handleVerticalMovement() {
  const playerTransform = Transform.getMutable(engine.PlayerEntity);
  const cameraTransform = Transform.getMutable(engine.CameraEntity);

  if (flying) {
    if (!platform) {
      createPlatform(playerTransform.position);
      console.log("created platform");
    }

    const speed = 0.1;
    const cameraRotation = cameraTransform.rotation;
    const cameraEulerAngles = quaternionToEulerAngles(cameraRotation);
    const cameraForward = calculateCameraForward(cameraEulerAngles);
    const offset = calculateOffset(cameraForward, speed);

    if (platform && hovering) {
      const platformTransform = Transform.getMutable(platform);
      platformTransform.position.y = playerTransform.position.y + currentYPosition + 10;
    } else if (platform && !hovering) {
      const platformTransform = Transform.getMutable(platform);
      const newPlatformPosition = calculateNewPosition(playerTransform.position, offset);
      platformTransform.position = newPlatformPosition;
    }
  } else if (platform) {
    engine.removeEntity(platform);
    platform = null;
    console.log("exited fly mode");
  }
}



function handleHovering() {
  const playerTransform = Transform.getMutable(engine.PlayerEntity);
  const platformTransform = platform ? Transform.getMutable(platform) : null;
  if (platformTransform) {
    utils.paths.stopPath(platform)
    platformTransform.position.y = playerTransform.position.y;
  }
}

function calculateCameraForward(cameraEulerAngles: Vector3): Vector3 {
  const cameraForward = Vector3.create(
    Math.sin(cameraEulerAngles.y),
    0,
    Math.cos(cameraEulerAngles.y)
  );
  return cameraForward;
}

function calculateOffset(cameraForward: Vector3, speed: number): Vector3 {
  const offset = Vector3.create(
    cameraForward.x * speed,
    cameraForward.y * speed,
    cameraForward.z * speed
  );
  return offset;
}

function calculateNewPosition(position: Vector3, offset: Vector3): Vector3 {
  const newPosition = Vector3.create(
    position.x + offset.x,
    position.y + offset.y,
    position.z + offset.z
  );
  return newPosition;
}

function quaternionToEulerAngles(quaternion: Quaternion): Vector3 {
  const x = Math.atan2(2 * (quaternion.w * quaternion.x + quaternion.y * quaternion.z),
    1 - 2 * (quaternion.x * quaternion.x + quaternion.y * quaternion.y));
  const y = Math.asin(2 * (quaternion.w * quaternion.y - quaternion.z * quaternion.x));
  const z = Math.atan2(2 * (quaternion.w * quaternion.z + quaternion.x * quaternion.y),
    1 - 2 * (quaternion.y * quaternion.y + quaternion.z * quaternion.z));
  return Vector3.create(x, y, z);
}
*/