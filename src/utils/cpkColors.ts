/**
 * CPK (Corey-Pauling-Koltun) color scheme for molecular visualization
 * Standard colors used to represent different chemical elements
 */

export const CPK_COLORS: Record<string, number> = {
  H: 0xFFFFFF,  // Hydrogen - White
  C: 0x909090,  // Carbon - Gray
  N: 0x3050F8,  // Nitrogen - Blue
  O: 0xFF0D0D,  // Oxygen - Red
  F: 0x90E050,  // Fluorine - Green
  Cl: 0x1FF01F, // Chlorine - Green
  Br: 0xA62929, // Bromine - Brown
  I: 0x940094,  // Iodine - Purple
  P: 0xFF8000,  // Phosphorus - Orange
  S: 0xFFFF30,  // Sulfur - Yellow
  B: 0xFFB5B5,  // Boron - Pink
  Fe: 0xE06633, // Iron - Orange-red
  Cu: 0xC78033, // Copper - Brown
  Zn: 0x7D80B0, // Zinc - Gray-blue
  Au: 0xFFD123, // Gold - Gold
  Ag: 0xC0C0C0, // Silver - Silver
};

export const DEFAULT_ATOM_COLOR = 0xFF69B4; // Hot pink for unknown elements

export const ATOM_RADIUS: Record<string, number> = {
  H: 0.31,
  C: 0.76,
  N: 0.71,
  O: 0.66,
  F: 0.57,
  Cl: 0.99,
  Br: 1.14,
  I: 1.33,
  P: 1.07,
  S: 1.05,
  B: 0.84,
  Fe: 1.32,
  Cu: 1.32,
  Zn: 1.22,
  Au: 1.66,
  Ag: 1.53,
};

export const DEFAULT_ATOM_RADIUS = 0.8;

/**
 * Get the CPK color for an element
 * @param element - Chemical element symbol
 * @returns Hex color code
 */
export function getCPKColor(element: string): number {
  return CPK_COLORS[element] || DEFAULT_ATOM_COLOR;
}

/**
 * Get the atomic radius for an element (in Angstroms)
 * @param element - Chemical element symbol
 * @returns Atomic radius
 */
export function getAtomRadius(element: string): number {
  return ATOM_RADIUS[element] || DEFAULT_ATOM_RADIUS;
}
