import bpy
import os
from mathutils import Vector


GLB_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "public",
    "ticket-print.glb",
)


def main():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    bpy.ops.import_scene.gltf(filepath=GLB_PATH)

    mins = [float("inf")] * 3
    maxs = [float("-inf")] * 3

    for obj in bpy.context.scene.objects:
        if obj.type != "MESH":
            continue
        for corner in obj.bound_box:
            world = obj.matrix_world @ Vector(corner)
            for i in range(3):
                mins[i] = min(mins[i], world[i])
                maxs[i] = max(maxs[i], world[i])

    print("BBOX_MIN", mins)
    print("BBOX_MAX", maxs)
    print("BBOX_SIZE", [maxs[i] - mins[i] for i in range(3)])


if __name__ == "__main__":
    main()
