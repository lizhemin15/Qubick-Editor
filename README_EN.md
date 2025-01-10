# Qubick-Editor
Visual editor component of Qubick software

## Project Description
A browser-based automation flow editor with a modern frosted glass interface. Supports modular drag-and-drop programming and can export to multiple programming languages.

## Implemented Features
- [x] Modern frosted glass style interface
- [x] Multiple interface themes (Frosted Glass, Eye Protection)
- [x] Custom backgrounds (Bing Wallpaper, Local Upload, URL)
- [x] Module drag-and-drop functionality
- [x] Multi-tab editing
- [x] Dynamic module configuration loading
- [x] JSON configuration import/export

## Development Plan
### Core Features Development
1. Code Block System
   - [ ] Block Shape Design
     - Different block types (hat, stack, boolean, etc.)
     - Block connection constraints
     - Block color categorization
   - [ ] Connection System
     - Magnetic snap effect
     - Connection point detection
     - Block spacing control
     - Visual feedback
   - [ ] Nesting System
     - C-shaped blocks nesting
     - Nesting depth indicators
     - Nested blocks dragging

2. Variable System
   - [ ] Variable Management
     - Variable type definition
     - Variable scope
     - Variable monitor
     - Visual representation
   - [ ] List Features
     - List creation and management
     - List operation blocks
     - Data display

3. Execution System
   - [ ] Code Execution Engine
     - Block parser
     - Execution order control
     - Execution state management
     - Breakpoint debugging
   - [ ] Real-time Preview
     - Execution visualization
     - Current block highlighting
     - Variable updates

4. Event System
   - [ ] Event Triggers
     - Start events
     - Keyboard events
     - Mouse events
     - Custom events
   - [ ] Event Listeners
     - Event registration
     - Event triggering
     - Event propagation

5. Workspace Management
   - [ ] Block Categories
     - Category panel
     - Search functionality
     - Favorite blocks
   - [ ] View Controls
     - Zoom functionality
     - Pan functionality
     - Grid alignment
     - Auto-arrange

6. Import/Export System
   - [ ] Project Management
     - Project save format
     - Import/export features
     - Version control
   - [ ] Code Conversion
     - Block to text conversion
     - Multi-language export
     - Code optimization

7. Custom Block System
   - [ ] Custom Block Editor
     - Parameter definition
     - Shape design
     - Function implementation
   - [ ] Block Library
     - Custom block saving
     - Block sharing
     - Version management

8. Debug Tools
   - [ ] Debug Features
     - Step execution
     - Variable monitoring
     - Breakpoint setting
     - Execution logs
   - [ ] Error Handling
     - Syntax error checking
     - Runtime error handling
     - Error notifications

9. UI/UX Enhancement
   - [ ] Interaction
     - Drag animations
     - Connection hints
     - Operation feedback
     - Keyboard shortcuts
   - [ ] Assistance
     - Block descriptions
     - Context help
     - Tutorial system
     - Multi-language support

### Development Priority
1. Basic block system and connections
2. Simple execution engine
3. Variable system
4. Event system
5. Debug features
6. UX optimization
7. Advanced features (custom blocks, project management)

## Features
Create anything through drag-and-drop, including but not limited to:
- Presentations (Slidev, Marp, etc.)
- Automation scripts (Python, JavaScript, etc.)
- Children's programming, embedded development (Scratch, MicroPython, etc.)
- Videos (Manim)
- Neural networks (TensorFlow, PyTorch, etc.)
- Algorithm implementation in multiple languages (Python, C, Java, etc.)
- Personal website generation (Hugo, Jekyll, etc.)
- Resume generation
- Project Page generation
- Application development (Streamlit, Electron, etc.)

## Tech Stack
- HTML5
- CSS3 (Frosted glass effect, Flex layout)
- JavaScript (Vanilla)
- Font Awesome 5.15.3 (Icons)
- Sortable.js (Drag-and-drop functionality)

## Interface Components
- Left Sidebar: Module list and categories
- Main Editor: Multi-tab editing support
- Right Sidebar: Parameter configuration and property settings

## User Guide

### Interface Operations
- Select modules from the left
- Drag modules to editor
- Double-click modules to edit
- Configure and save parameters

### Settings Guide
- Click settings icon in bottom left
- Choose interface mode
- Adjust interface parameters
- Set background image

### Data Management
- Use import button to load configurations
- Use export button to save configurations

## Module Development Guide
For module development, we use a visual editor-based approach. Everything in Qubick-Editor is a module (building block), supporting export to multiple programming languages.

### Module Types
1. Functional Programming Modules
   - Input variables
   - Output variables
   - Automatic variable type detection

2. Object-Oriented Programming Modules
   - Create instances
   - Call instances
   - Automatic property and method detection

### Basic Modules
- Sequential structure
- Loop structure
- Conditional structure

### Automation Features
- Automatic code variable detection
- Distinguish input, output, intermediate variables
- Detect class properties and methods
- AI-assisted multi-language adaptation

## Advantages
Through Qubick-Editor, save time and improve systematic thinking ability, focusing on the task at hand. In the CHATGPT era, framework building capability and systematic thinking will become core competencies.

## License
MIT

Copyright (c) 2025-present, Zhemin Li. 