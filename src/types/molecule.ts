/**
 * Molecular data types for molviz
 */

export interface Atom {
  id: string;
  element: string;
  x: number;
  y: number;
  z: number;
}

export interface Bond {
  id: string;
  atom1Id: string;
  atom2Id: string;
  order?: number; // 1 = single, 2 = double, 3 = triple
}

export interface Molecule {
  id: string;
  name: string;
  atoms: Atom[];
  bonds: Bond[];
}
