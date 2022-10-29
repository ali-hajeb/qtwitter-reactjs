/**
 * Get random color
 * @param colors Array of color hexs
 * @returns A random color from provided color list
 */
function randomColor(colors: string[]) {
  return colors[Math.floor(Math.random() * colors.length)];
}

export default randomColor;
