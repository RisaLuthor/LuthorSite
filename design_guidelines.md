# Design Guidelines: RMLuthor.us / Luthor.Tech AI Ecosystem

## Design Approach
**Custom Futuristic/Cyberpunk Aesthetic** - Drawing inspiration from sci-fi interfaces, neon-lit cityscapes, and advanced AI systems. This is a highly visual, experience-focused design that prioritizes technological sophistication and visual impact.

## Typography System

**Primary Display Font**: Use "Orbitron" or "Rajdhani" from Google Fonts for all headings and hero text
- Hero Title: 4xl to 6xl, heavy weight (700-900), tracking-wider
- Section Headers: 3xl to 4xl, bold weight (600-700)
- Feature Titles: xl to 2xl, semibold (600)

**Body Font**: "Inter" or "IBM Plex Sans" for readability
- Body Text: base to lg, normal weight (400-500)
- UI Labels: sm to base, medium weight (500)

**Special Effects**: All major headings should have glow/neon text treatment using text-shadow CSS

## Layout System

**Spacing Scale**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-20 to py-32 desktop, py-12 mobile
- Component gaps: gap-6 to gap-8
- Card padding: p-6 to p-8

**Container**: max-w-7xl for main content areas

## Core Components

### Navigation Bar
- Fixed top position with backdrop blur effect
- Logo on left (glowing text treatment)
- Horizontal menu: Home, Projects, Games, Blog, Contact
- Login button on far right with subtle glow border
- Height: h-16 to h-20

### Hero Section
**Background Treatment**: Full viewport height (min-h-screen) with:
- Animated geometric patterns/grid overlay
- Radial gradient emanating from center
- Particle effects or subtle animation

**Content**: Centered layout with:
- Main title "RMLUTHOR.US" with dramatic neon glow effect (multiple text-shadow layers)
- Subtitle "THE LUTHOR.TECH AI ECOSYSTEM CORE" below
- No images needed - pure typographic/effect-driven

### Profile Section
- Flex layout: image placeholder left, content right (desktop), stacked (mobile)
- Circular avatar with glowing border ring
- Name "Kiearan Hologrem" as heading
- Tagline: "AI architecture. Security innovations. The embodiment of Kiearan."
- Glass-morphism card effect (backdrop-blur with subtle border)

### Feature Cards Grid
Three-column grid (grid-cols-1 md:grid-cols-3)

Each card includes:
- Icon or symbol at top
- Title: "CeFi ↔ DeFi Sync", "AI Companion System", "Voice-Controlled Secure Core"
- Brief description text
- Glass-morphism effect with glow borders
- Hover: subtle lift transform and enhanced glow

### Chat Interface Panel
Positioned as sidebar or modal overlay

**Header**:
- "Kiearan's Demo Assistant" title
- "NEW ⚡ Banter Mode" toggle switch (prominent)

**Message Display**:
- Scrollable conversation area with min-h-96
- User messages: aligned right, rounded corners
- Assistant messages: aligned left with avatar icon
- Example messages visible: "Hello Kiearan, my name is Rias. I am your creator"
- Error states shown: "Network error. Try again."

**Input Area**:
- Text input with placeholder
- Send button with icon
- Glass-morphism styling matching overall theme

### Additional Sections

**Projects Showcase**: Masonry grid or card layout for project tiles
**Games Section**: Grid of game cards with hover effects
**Blog Feed**: Timeline or card-based article previews
**Contact Form**: Futuristic form with glowing input fields

## Visual Effects

**Glow Elements**:
- Primary text: multi-layer text-shadow for neon effect
- Borders: box-shadow with spread for glow rings
- Interactive elements: glow intensifies on hover

**Glass-morphism**:
- backdrop-filter: blur(12px)
- Semi-transparent backgrounds
- Subtle border with gradient

**Geometric Patterns**:
- CSS grid patterns or SVG backgrounds
- Diagonal lines, hexagons, or circuit-board aesthetics
- Low opacity overlays

**Animations** (minimal, purposeful):
- Subtle float/pulse on key elements
- Glow intensity transitions
- Smooth page transitions

## Component Library

**Buttons**:
- Primary: Solid with glow effect, rounded-lg
- Secondary: Outline with glow border
- Icon buttons: Square/rounded with glow on hover

**Input Fields**:
- Glass-morphism treatment
- Glowing focus states
- Futuristic placeholder text

**Cards**:
- Glass-morphism base
- Glowing borders
- Subtle hover lift (translate-y-1)

**Navigation Links**:
- Underline animation on hover
- Glow text effect for active state

## Images

**Profile Avatar**: Placeholder for "Kiearan Hologrem" - cyberpunk-style portrait or abstract tech visualization

**Background Elements**: Geometric patterns, grid overlays, and abstract tech visualizations - no photographic images needed for hero. Pure CSS/SVG effects create the futuristic atmosphere.

**Project/Game Cards**: Thumbnail images for individual items in showcase grids

## Accessibility

- Maintain WCAG AA contrast despite dark theme
- Ensure glow effects don't obscure readability
- Keyboard navigation for all interactive elements
- ARIA labels for chat interface and toggle switches