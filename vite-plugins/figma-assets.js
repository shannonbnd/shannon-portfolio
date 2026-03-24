export function figmaAssetsPlugin() {
  return {
    name: 'figma-assets',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        return id
      }
    },
    load(id) {
      if (id.startsWith('figma:asset/')) {
        // Return a placeholder/dummy export for Figma assets
        return `export default ''`
      }
    },
  }
}
