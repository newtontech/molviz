import * as THREE from 'three';
import { Molecule, Atom, Bond } from '../types/molecule';
import { getCPKColor, getAtomRadius } from '../utils/cpkColors';

export interface MolecularRendererConfig {
  container: HTMLElement;
  width?: number;
  height?: number;
  backgroundColor?: number;
  enableControls?: boolean;
}

/**
 * Three.js-based molecular renderer
 * Supports ball-and-stick visualization with CPK coloring
 */
export class MolecularRenderer {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private container: HTMLElement;
  private moleculeGroup: THREE.Group;
  private animationId: number | null = null;
  private isDisposed = false;

  constructor(config: MolecularRendererConfig) {
    this.container = config.container;
    const width = config.width || this.container.clientWidth;
    const height = config.height || this.container.clientHeight;

    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(config.backgroundColor || 0x1a1a2e);

    // Create camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 20);

    // Create WebGL renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    // Setup lighting
    this.setupLighting();

    // Create molecule group
    this.moleculeGroup = new THREE.Group();
    this.scene.add(this.moleculeGroup);

    // Start render loop
    this.startRenderLoop();

    // Handle window resize
    window.addEventListener('resize', this.handleResize);
  }

  private setupLighting(): void {
    // Ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Directional light for depth perception
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    this.scene.add(directionalLight);

    // Additional directional light from opposite side
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-10, -10, -10);
    this.scene.add(directionalLight2);
  }

  /**
   * Render a molecule using ball-and-stick representation
   * @param molecule - The molecule to render
   */
  renderMolecule(molecule: Molecule): void {
    if (this.isDisposed) return;

    // Clear previous molecule
    this.clearMolecule();

    // Create atoms (balls)
    molecule.atoms.forEach(atom => {
      const atomMesh = this.createAtomMesh(atom);
      this.moleculeGroup.add(atomMesh);
    });

    // Create bonds (sticks)
    molecule.bonds.forEach(bond => {
      const bondMesh = this.createBondMesh(bond, molecule.atoms);
      if (bondMesh) {
        this.moleculeGroup.add(bondMesh);
      }
    });

    // Center and scale the molecule
    this.centerAndScaleMolecule();
  }

  /**
   * Create a 3D mesh for an atom
   */
  private createAtomMesh(atom: Atom): THREE.Mesh {
    const radius = getAtomRadius(atom.element);
    const color = getCPKColor(atom.element);

    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: color,
      shininess: 100,
      specular: 0x444444,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(atom.x, atom.y, atom.z);
    mesh.userData = { atomId: atom.id, element: atom.element };

    return mesh;
  }

  /**
   * Create a 3D mesh for a bond
   */
  private createBondMesh(bond: Bond, atoms: Atom[]): THREE.Mesh | null {
    const atom1 = atoms.find(a => a.id === bond.atom1Id);
    const atom2 = atoms.find(a => a.id === bond.atom2Id);

    if (!atom1 || !atom2) return null;

    const start = new THREE.Vector3(atom1.x, atom1.y, atom1.z);
    const end = new THREE.Vector3(atom2.x, atom2.y, atom2.z);
    const distance = start.distanceTo(end);

    // Create cylinder geometry for bond
    const geometry = new THREE.CylinderGeometry(0.15, 0.15, distance, 12);
    const material = new THREE.MeshPhongMaterial({ color: 0x666666 });

    const mesh = new THREE.Mesh(geometry, material);

    // Position and orient the bond
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mesh.position.copy(midpoint);

    // Align cylinder with bond direction
    const direction = new THREE.Vector3().subVectors(end, start).normalize();
    const axis = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, direction);
    mesh.setRotationFromQuaternion(quaternion);

    mesh.userData = { bondId: bond.id };

    return mesh;
  }

  /**
   * Center the molecule in the view and scale appropriately
   */
  private centerAndScaleMolecule(): void {
    if (this.moleculeGroup.children.length === 0) return;

    // Calculate bounding box
    const box = new THREE.Box3().setFromObject(this.moleculeGroup);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Center the molecule
    this.moleculeGroup.position.sub(center);

    // Calculate scale to fit in view
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 10;
    const scale = targetSize / maxDim;

    this.moleculeGroup.scale.setScalar(scale);
  }

  /**
   * Clear the current molecule from the scene
   */
  clearMolecule(): void {
    while (this.moleculeGroup.children.length > 0) {
      const child = this.moleculeGroup.children[0];
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose());
        } else {
          child.material.dispose();
        }
      }
      this.moleculeGroup.remove(child);
    }
  }

  /**
   * Reset camera to default position
   */
  resetCamera(): void {
    this.camera.position.set(0, 0, 20);
    this.camera.lookAt(0, 0, 0);
    this.camera.up.set(0, 1, 0);
  }

  /**
   * Get camera controls for external manipulation
   */
  getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  /**
   * Get the scene for advanced customization
   */
  getScene(): THREE.Scene {
    return this.scene;
  }

  /**
   * Get the molecule group for transformations
   */
  getMoleculeGroup(): THREE.Group {
    return this.moleculeGroup;
  }

  /**
   * Handle window resize
   */
  private handleResize = (): void => {
    if (this.isDisposed) return;

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  /**
   * Start the render loop
   */
  private startRenderLoop(): void {
    const render = (): void => {
      if (this.isDisposed) return;

      this.animationId = requestAnimationFrame(render);
      this.renderer.render(this.scene, this.camera);
    };

    render();
  }

  /**
   * Dispose of the renderer and clean up resources
   */
  dispose(): void {
    this.isDisposed = true;

    window.removeEventListener('resize', this.handleResize);

    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }

    this.clearMolecule();
    this.renderer.dispose();

    if (this.renderer.domElement.parentNode === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

export default MolecularRenderer;
