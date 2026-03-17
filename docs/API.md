# MolViz API Documentation

## Overview

MolViz is a cross-platform molecular visualization tool built with Electron and Three.js.

## Architecture

```
┌─────────────────────────────────────┐
│           Electron Shell            │
├─────────────────────────────────────┤
│          React UI Layer             │
├─────────────────────────────────────┤
│      Three.js Rendering Engine      │
├─────────────────────────────────────┤
│     Molecular Data Processing       │
└─────────────────────────────────────┘
```

## Modules

### Core Modules (Planned)

- **renderer** - Three.js based 3D rendering
- **molecule** - Molecular structure handling
- **formats** - File format parsers (XYZ, PDB, CIF)
- **editor** - Atom editing functionality
- **export** - Export to various formats

## API Reference

*Documentation will be added as modules are implemented.*

## Development

See [CONTRIBUTING.md](../CONTRIBUTING.md) for development guidelines.
