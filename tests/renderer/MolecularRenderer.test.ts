/**
 * Tests for MolecularRenderer
 */
import { MolecularRenderer } from '../../src/renderer/MolecularRenderer';
import { Molecule, Atom, Bond } from '../../src/types/molecule';
import { getCPKColor, getAtomRadius, DEFAULT_ATOM_COLOR, DEFAULT_ATOM_RADIUS } from '../../src/utils/cpkColors';

// Mock Three.js
jest.mock('three', () => {
  const actualThree = jest.requireActual('three');
  return {
    ...actualThree,
    WebGLRenderer: jest.fn().mockImplementation(() => ({
      setSize: jest.fn(),
      setPixelRatio: jest.fn(),
      render: jest.fn(),
      dispose: jest.fn(),
      domElement: document.createElement('canvas'),
    })),
  };
});

describe('MolecularRenderer', () => {
  let container: HTMLElement;
  let renderer: MolecularRenderer;

  beforeEach(() => {
    // Create a mock container
    container = document.createElement('div');
    container.style.width = '800px';
    container.style.height = '600px';
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (renderer) {
      renderer.dispose();
    }
    document.body.removeChild(container);
  });

  describe('initialization', () => {
    it('should create a renderer with default options', () => {
      renderer = new MolecularRenderer({ container });
      expect(renderer).toBeDefined();
      expect(renderer.getScene()).toBeDefined();
      expect(renderer.getCamera()).toBeDefined();
    });

    it('should create a renderer with custom background color', () => {
      renderer = new MolecularRenderer({ container, backgroundColor: 0xff0000 });
      expect(renderer).toBeDefined();
    });
  });

  describe('molecule rendering', () => {
    const testMolecule: Molecule = {
      id: 'water',
      name: 'Water',
      atoms: [
        { id: 'O1', element: 'O', x: 0, y: 0, z: 0 },
        { id: 'H1', element: 'H', x: 0.96, y: 0, z: 0 },
        { id: 'H2', element: 'H', x: -0.24, y: 0.93, z: 0 },
      ],
      bonds: [
        { id: 'B1', atom1Id: 'O1', atom2Id: 'H1', order: 1 },
        { id: 'B2', atom1Id: 'O1', atom2Id: 'H2', order: 1 },
      ],
    };

    it('should render a molecule', () => {
      renderer = new MolecularRenderer({ container });
      expect(() => renderer.renderMolecule(testMolecule)).not.toThrow();
    });

    it('should clear previous molecule when rendering new one', () => {
      renderer = new MolecularRenderer({ container });
      renderer.renderMolecule(testMolecule);
      renderer.renderMolecule(testMolecule);
      const group = renderer.getMoleculeGroup();
      // Should have 3 atoms + 2 bonds = 5 children
      expect(group.children.length).toBe(5);
    });
  });

  describe('camera controls', () => {
    it('should reset camera position', () => {
      renderer = new MolecularRenderer({ container });
      const camera = renderer.getCamera();
      camera.position.set(10, 10, 10);
      renderer.resetCamera();
      expect(camera.position.x).toBe(0);
      expect(camera.position.y).toBe(0);
      expect(camera.position.z).toBe(20);
    });
  });

  describe('disposal', () => {
    it('should dispose without errors', () => {
      renderer = new MolecularRenderer({ container });
      expect(() => renderer.dispose()).not.toThrow();
    });
  });
});

describe('CPK Colors', () => {
  it('should return correct color for known elements', () => {
    expect(getCPKColor('H')).toBe(0xffffff);
    expect(getCPKColor('C')).toBe(0x909090);
    expect(getCPKColor('N')).toBe(0x3050f8);
    expect(getCPKColor('O')).toBe(0xff0d0d);
  });

  it('should return default color for unknown elements', () => {
    expect(getCPKColor('Unknown')).toBe(DEFAULT_ATOM_COLOR);
    expect(getCPKColor('X')).toBe(DEFAULT_ATOM_COLOR);
  });
});

describe('Atom Radii', () => {
  it('should return correct radius for known elements', () => {
    expect(getAtomRadius('H')).toBe(0.31);
    expect(getAtomRadius('C')).toBe(0.76);
    expect(getAtomRadius('N')).toBe(0.71);
    expect(getAtomRadius('O')).toBe(0.66);
  });

  it('should return default radius for unknown elements', () => {
    expect(getAtomRadius('Unknown')).toBe(DEFAULT_ATOM_RADIUS);
    expect(getAtomRadius('X')).toBe(DEFAULT_ATOM_RADIUS);
  });
});
