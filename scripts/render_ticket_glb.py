import bpy
import os
from mathutils import Vector


BASE_DIR = os.path.dirname(os.path.dirname(__file__))
GLB_PATH = os.path.join(BASE_DIR, "public", "ticket-print.glb")
OUTPUT_PATH = "/tmp/ticket-print-render.png"


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)


def look_at(obj, target):
    direction = target - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def main():
    clear_scene()
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE"
    scene.render.resolution_x = 900
    scene.render.resolution_y = 900
    scene.render.film_transparent = False

    bpy.ops.import_scene.gltf(filepath=GLB_PATH)

    mins = [float("inf")] * 3
    maxs = [float("-inf")] * 3
    meshes = []
    for obj in bpy.context.scene.objects:
      if obj.type != "MESH":
        continue
      meshes.append(obj)
      for corner in obj.bound_box:
        world = obj.matrix_world @ Vector(corner)
        for i in range(3):
          mins[i] = min(mins[i], world[i])
          maxs[i] = max(maxs[i], world[i])

    center = Vector(((mins[0] + maxs[0]) / 2, (mins[1] + maxs[1]) / 2, (mins[2] + maxs[2]) / 2))
    size_z = maxs[2] - mins[2]

    camera_data = bpy.data.cameras.new("Camera")
    camera = bpy.data.objects.new("Camera", camera_data)
    bpy.context.collection.objects.link(camera)
    scene.camera = camera
    camera.location = Vector((0.0, -3.4, center.z - 1.1))
    camera.data.lens = 40
    look_at(camera, Vector((0.0, 0.0, center.z - 1.2)))

    light_data = bpy.data.lights.new(name="Area", type="AREA")
    light_data.energy = 3500
    light_data.shape = "RECTANGLE"
    light = bpy.data.objects.new(name="Area", object_data=light_data)
    bpy.context.collection.objects.link(light)
    light.location = Vector((0.0, -2.0, center.z))
    light.scale = (3.0, 3.0, 3.0)
    look_at(light, center)

    scene.frame_set(96)
    scene.render.filepath = OUTPUT_PATH
    bpy.ops.render.render(write_still=True)
    print("OUTPUT", OUTPUT_PATH)
    print("CENTER", center)
    print("SIZE_Z", size_z)


if __name__ == "__main__":
    main()
