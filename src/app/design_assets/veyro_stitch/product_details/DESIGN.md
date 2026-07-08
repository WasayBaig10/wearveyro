---
name: High-Contrast Kinetic Minimalist
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#ffffff'
  on-tertiary: '#313030'
  tertiary-container: '#e5e2e1'
  on-tertiary-container: '#656464'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-xl:
    fontFamily: Syne
    fontSize: 80px
    fontWeight: '800'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Syne
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
spacing:
  unit: 4px
  container-margin: 20px
  gutter: 12px
  section-gap-lg: 80px
  section-gap-sm: 40px
---

## Brand & Style
The brand personality is high-fashion rebellion—a synthesis of brutalist structure and luxury polish. It targets a Gen-Z audience that values exclusivity, rapid-drop culture, and digital-native aesthetics. 

The design style is **Kinetic Minimalism**. It utilizes the "Apple-level" obsession with precision and whitespace but injects the raw, aggressive edge of streetwear through extreme contrast and tension. The UI should feel intentional, expensive, and slightly intimidating. Key characteristics include asymmetric compositions, 1px "razor" borders, and a rhythmic use of the Cyber Lime accent to guide the eye through a monochromatic environment.

## Colors
The palette is built on a "Total Dark" foundation to allow product photography and the accent color to vibrate.

- **Primary (Cyber Lime):** Reserved exclusively for critical actions (Add to Cart), price points, and active status indicators. It represents energy and "The Drop."
- **Secondary (Crisp White):** Used for primary typography and high-level structural borders to ensure maximum legibility against the dark void.
- **Tertiary (Velvet Black):** The canvas. This is a deep, rich black that provides a premium, infinite-depth feel.
- **Neutral (Carbon):** Used for secondary surfaces, input backgrounds, and subtle dividers to create soft hierarchy within the dark mode.

## Typography
Typography is used as a structural element. **Syne** provides a wide, aggressive stance for headlines, appearing almost architectural. **Plus Jakarta Sans** balances this with high-readability geometric forms for descriptions and metadata.

- **Scale:** Headlines should be oversized to create a "poster-like" feel on mobile.
- **Styling:** Use all-caps for labels and navigation items to lean into the streetwear "brand tag" aesthetic. 
- **Contrast:** Maintain a strict hierarchy where headlines are either White or Cyber Lime, and body copy is off-white or light gray to reduce eye strain.

## Layout & Spacing
This design system utilizes a **Bento-Grid** philosophy adapted for mobile-first responsiveness. 

- **The Grid:** A 12-column desktop grid collapsing to a 4-column mobile grid. Use asymmetric column spans (e.g., a 3-column image next to a 1-column vertical text string) to create visual tension.
- **Bento Modules:** Group related content into boxes defined by 1px borders. These modules should have varied aspect ratios.
- **Whitespace:** Use "Generous Void" spacing. Large gaps between sections (80px+) emphasize the exclusivity of the items.
- **Mobile Reflow:** On mobile, stack modules vertically but maintain thin borders between them to preserve the "grid-cell" appearance.

## Elevation & Depth
In line with the minimalist-brutalist aesthetic, this system eschews traditional shadows. Depth is communicated through **Tonal Layering** and **Thin Outlines**.

- **Level 0 (Background):** Velvet Black (#0A0A0A).
- **Level 1 (Cards/Modules):** Defined by a 1px solid border (#FFFFFF at 15% opacity or #FFFFFF for active states). No fill change.
- **Level 2 (Overlays/Modals):** A solid Carbon (#1A1A1A) fill with a 1px White border. 
- **The "Neon" Effect:** For primary CTAs, instead of a shadow, use a subtle 4px outer glow of Cyber Lime to make the element appear as if it is emitting light.

## Shapes
The shape language is **Strictly Geometric (Sharp)**. 

- **Corners:** All buttons, cards, and input fields must have a 0px border radius. This reinforces the "architectural" and "raw" feel of the brand.
- **Icons:** Use linear, 1.5px stroke weight icons. Avoid filled icons unless indicating an active state. Icons must also follow sharp-corner geometry.
- **Imagery:** Product photography should be clipped into sharp rectangular frames, often with varying aspect ratios (e.g., 4:5 for portraits, 1:1 for details).

## Components

- **Primary Button:** Solid Cyber Lime background, black text, 0px radius. On hover/active, text becomes white and background goes black with a 1px white border.
- **Secondary Button (Ghost):** 1px white border, white text, transparent background.
- **Inventory Chips:** Small, rectangular boxes with "Label-sm" typography. "In Stock" uses a Cyber Lime border; "Sold Out" is struck through with a 45-degree line.
- **Product Cards:** No background fill. A 1px border surrounds the image and text area as one monolithic block. Price is always highlighted in Cyber Lime.
- **Input Fields:** Bottom-border only (1px white). Label floats above in all-caps. Error state changes the bottom border to a vibrant red, but maintains the sharp geometry.
- **Status Bars:** For "Limited Drop" items, use a 2px height progress bar in Cyber Lime to show remaining stock percentage, emphasizing urgency.
- **Marquee:** A scrolling horizontal text component for announcements ("NEW DROP FRIDAY 10PM") using Syne in outline-only style.