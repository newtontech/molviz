# MolViz 🧪

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/platform-Linux%20%7C%20Windows%20%7C%20macOS-blue)](https://github.com/newtontech/molviz/releases)

**MolViz** is a cross-platform molecular visualization and editing tool, inspired by VESTA and Materials Studio.

## Features ✨

- 🎨 **3D Molecular Visualization** - Interactive 3D rendering of molecular structures
- ✏️ **Atom Editing** - Add, remove, and modify atoms
- 🔄 **Cross-Platform** - Runs on Linux, Windows, and macOS
- 📁 **Multiple Formats** - Supports XYZ, PDB, CIF formats
- 🌐 **Web-Based** - Built with Electron and Three.js

## Screenshots

> 📸 Screenshots will be added when the 3D rendering engine is complete.

## Installation

### From Source

```bash
git clone https://github.com/newtontech/molviz.git
cd molviz
npm install
npm start
```

### Pre-built Binaries

Download from [Releases](https://github.com/newtontech/molviz/releases)

## Usage

```bash
# Open a molecule file
molviz molecule.xyz

# Or start the application
molviz
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run start

# Build for production
npm run make
```

## Roadmap

- [x] Project initialization
- [ ] 3D rendering engine (Three.js)
- [ ] Atom and bond visualization
- [ ] File format support (XYZ, PDB)
- [ ] Atom editing features
- [ ] Camera controls
- [ ] Export functionality

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

## License

[MIT](LICENSE) © OpenQuantumChemistry

## Acknowledgments

- Inspired by [VESTA](https://jp-minerals.org/vesta/en/)
- Built with [Electron](https://www.electronjs.org/) and [Three.js](https://threejs.org/)
