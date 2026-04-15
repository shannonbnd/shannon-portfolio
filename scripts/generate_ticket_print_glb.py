import math
import os

import bpy


OUTPUT_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "public",
    "ticket-print.glb",
)


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for datablock in (
        bpy.data.meshes,
        bpy.data.materials,
        bpy.data.actions,
        bpy.data.images,
        bpy.data.armatures,
        bpy.data.curves,
        bpy.data.cameras,
        bpy.data.lights,
    ):
        for block in list(datablock):
            datablock.remove(block)


def paper_material():
    material = bpy.data.materials.new(name="Paper")
    material.use_nodes = True
    nodes = material.node_tree.nodes
    bsdf = next((node for node in nodes if node.type == "BSDF_PRINCIPLED"), None)
    if bsdf is None:
        raise RuntimeError("Could not find Principled BSDF node")
    bsdf.inputs["Base Color"].default_value = (0.98, 0.96, 0.90, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.82
    bsdf.inputs["Specular IOR Level"].default_value = 0.12
    material.use_backface_culling = False
    return material


def create_strip(name, width, height, thickness, parent, material):
    bpy.ops.mesh.primitive_cube_add()
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (width / 2.0, thickness / 2.0, height / 2.0)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.parent = parent
    obj.location = (0.0, 0.0, -height / 2.0)
    obj.data.materials.append(material)
    return obj


def create_cylinder(name, radius, depth, parent, material):
    bpy.ops.mesh.primitive_cylinder_add(vertices=48)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (radius, radius, depth / 2.0)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.rotation_euler = (0.0, math.radians(90), 0.0)
    obj.parent = parent
    obj.data.materials.append(material)
    return obj


def create_empty(name, parent=None, location=(0.0, 0.0, 0.0)):
    empty = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(empty)
    empty.empty_display_type = "PLAIN_AXES"
    empty.parent = parent
    empty.location = location
    return empty


def insert_keys(obj, data_path, frames_and_values):
    for frame, value in frames_and_values:
        setattr(obj, data_path, value)
        obj.keyframe_insert(data_path=data_path, frame=frame)


def main():
    clear_scene()
    scene = bpy.context.scene
    scene.frame_start = 1
    scene.frame_end = 96
    scene.render.fps = 24

    material = paper_material()

    root = create_empty("TicketRoot", location=(0.0, 0.0, 0.0))
    root.rotation_euler = (math.radians(-6.0), 0.0, 0.0)

    main_height = 1.58
    straight_height = 1.02
    wave_segments = [0.18, 0.18, 0.18, 0.18, 0.16, 0.14]
    thickness = 0.008
    width_main = 0.94
    width_tail = 0.82

    main_panel = create_strip("MainPanel", width_main, main_height, thickness, root, material)
    straight_pivot = create_empty("StraightPivot", parent=root, location=(0.0, 0.0, -main_height))
    straight = create_strip("StraightTail", width_tail, straight_height, thickness, straight_pivot, material)

    pivots = []
    prev = straight_pivot
    prev_height = straight_height
    for index, seg_height in enumerate(wave_segments, start=1):
        pivot = create_empty(
            f"WavePivot{index}",
            parent=prev,
            location=(0.0, 0.0, -prev_height),
        )
        segment = create_strip(f"WaveSeg{index}", width_tail, seg_height, thickness, pivot, material)
        pivots.append((pivot, segment, seg_height))
        prev = pivot
        prev_height = seg_height

    roll_pivot = create_empty(
        "RollPivot",
        parent=prev,
        location=(0.0, 0.02, -prev_height),
    )
    roll = create_cylinder("Roll", radius=0.12, depth=width_tail * 1.06, parent=roll_pivot, material=material)
    roll.location = (0.0, 0.0, 0.0)

    # Keep the printed part visible from the start; animate the trailing paper.
    main_panel.scale = (1.0, 1.0, 1.0)
    main_panel.keyframe_insert(data_path="scale", frame=1)
    main_panel.keyframe_insert(data_path="scale", frame=96)

    root.location = (0.0, 0.0, 0.18)
    root.keyframe_insert(data_path="location", frame=1)
    root.location = (0.0, 0.0, 0.0)
    root.keyframe_insert(data_path="location", frame=72)

    straight.scale = (1.0, 1.0, 0.18)
    straight.keyframe_insert(data_path="scale", frame=1)
    straight.scale = (1.0, 1.0, 0.76)
    straight.keyframe_insert(data_path="scale", frame=70)
    straight.scale = (1.0, 1.0, 1.0)
    straight.keyframe_insert(data_path="scale", frame=78)

    wave_angles = [-6.0, -12.0, -20.0, -32.0, -48.0, -66.0]
    wave_starts = [78, 80, 82, 84, 87, 90]
    wave_ends = [84, 86, 88, 91, 94, 96]
    for (pivot, segment, _), angle, start, end in zip(pivots, wave_angles, wave_starts, wave_ends):
        pivot.rotation_euler = (0.0, 0.0, 0.0)
        pivot.keyframe_insert(data_path="rotation_euler", frame=1)
        pivot.keyframe_insert(data_path="rotation_euler", frame=start)
        pivot.rotation_euler = (math.radians(angle), 0.0, 0.0)
        pivot.keyframe_insert(data_path="rotation_euler", frame=end)

        segment.scale = (1.0, 1.0, 0.02)
        segment.keyframe_insert(data_path="scale", frame=1)
        segment.keyframe_insert(data_path="scale", frame=start)
        segment.scale = (1.0, 1.0, 1.0)
        segment.keyframe_insert(data_path="scale", frame=end)

    roll.scale = (0.42, 0.42, 0.42)
    roll.keyframe_insert(data_path="scale", frame=1)
    roll.keyframe_insert(data_path="scale", frame=90)
    roll.scale = (1.0, 1.0, 1.0)
    roll.keyframe_insert(data_path="scale", frame=96)

    # A tiny settle after the roll completes.
    root.rotation_euler = (math.radians(-6.0), 0.0, 0.0)
    root.keyframe_insert(data_path="rotation_euler", frame=1)
    root.keyframe_insert(data_path="rotation_euler", frame=90)
    root.rotation_euler = (math.radians(-4.8), 0.0, 0.0)
    root.keyframe_insert(data_path="rotation_euler", frame=96)

    bpy.ops.object.select_all(action="DESELECT")
    root.select_set(True)
    main_panel.select_set(True)
    straight_pivot.select_set(True)
    straight.select_set(True)
    for pivot, segment, _ in pivots:
        pivot.select_set(True)
        segment.select_set(True)
    roll_pivot.select_set(True)
    roll.select_set(True)
    bpy.context.view_layer.objects.active = root

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    scene.frame_set(scene.frame_end)
    bpy.ops.export_scene.gltf(
        filepath=OUTPUT_PATH,
        export_format="GLB",
        use_selection=True,
        export_animations=True,
        export_bake_animation=True,
        export_yup=True,
    )


if __name__ == "__main__":
    main()
