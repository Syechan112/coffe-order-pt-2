# DESIGN.md — Visual Style Guidelines

## Design Direction

Use a clean, modern, premium, minimalist visual style inspired by the provided design reference.

The goal is to adopt its visual language only, not replicate its layout, content, components, or page structure.

## 1. Color Palette

Use a restrained palette dominated by white, soft gray, dark charcoal, and a single blue accent.

- Primary background: `#FFFFFF`
- Outer background: `#E9EDF3`
- Secondary surface: `#F7F8FA`
- Primary text: `#171717`
- Secondary text: `#777D86`
- Muted text: `#A0A5AD`
- Accent color: `#2F80ED`
- Subtle borders: `#EDEFF2`

Keep the interface predominantly white and neutral. Use the accent color selectively for emphasis and interactive states.

Do not introduce additional accent colors without a functional reason. Avoid excessive gradients, saturated backgrounds, and unnecessary decorative color effects.

## 2. Typography

Use a modern sans-serif typeface such as Poppins, Inter, or Manrope.

- Headings: bold, prominent, and tightly spaced.
- Body text: regular weight with comfortable line height.
- Secondary text: smaller, muted, and visually subordinate.
- Navigation and labels: compact, clean, and medium-weight.
- Buttons: clear, readable, and moderately weighted.

Use typography to establish hierarchy instead of relying on decorative elements.

Prefer compact heading line heights of `1.05–1.2` and body line heights of `1.5–1.7`.

Avoid excessive font weights, unnecessary uppercase text, and inconsistent typography scales.

## 3. Spacing and Whitespace

Use generous whitespace to create a calm, uncluttered, premium appearance.

- Maintain consistent spacing between related elements.
- Separate unrelated content with larger spacing.
- Keep text blocks readable and appropriately constrained.
- Avoid cramped layouts and excessive content density.
- Use consistent horizontal alignment where appropriate.
- Preserve visual breathing room around important elements.

Whitespace should improve hierarchy and readability, not create arbitrary empty areas.

## 4. Shapes and Border Radius

Use soft, rounded geometry throughout the interface.

- Large visual surfaces: `24–32px`
- Medium containers and images: `14–20px`
- Small controls: `8–14px`
- Pill-shaped buttons: optional, when appropriate to the existing design
- Circular icon controls: `50%`

Apply border radius consistently according to the size and purpose of each element.

Avoid mixing unrelated shape styles or making every element excessively rounded.

## 5. Surfaces, Borders, and Shadows

Prefer flat surfaces and subtle separation over pronounced elevation.

- Use white as the default surface.
- Use very light gray for secondary backgrounds.
- Keep borders thin and low contrast.
- Use shadows sparingly.
- Avoid heavy outlines and excessive nested containers.
- Avoid applying shadows to every card or section.

Create visual separation primarily through spacing, alignment, and background contrast.

## 6. Imagery

When the existing project uses images, maintain a clean, high-quality, editorial presentation.

- Prefer high-resolution imagery.
- Use intentional image cropping.
- Preserve the main subject with appropriate `object-fit` and `object-position`.
- Use consistent aspect ratios for visually related images.
- Apply rounded corners consistently.
- Avoid unnecessary borders, filters, overlays, and decorative frames.

Do not introduce new images, illustrations, or image-based sections solely to imitate the reference.

## 7. Buttons and Controls

Keep interactive elements compact, clean, and visually consistent.

- Primary actions may use the blue accent or dark charcoal.
- Secondary actions should have less visual emphasis.
- Use appropriate contrast between text and background.
- Apply subtle hover and focus transitions.
- Maintain consistent padding, radius, and typography.
- Make focus states clearly visible.

Avoid excessive gradients, oversized controls, unnecessary icons, and inconsistent button styles.

## 8. Icons

Use a consistent, minimal line-icon style.

- Prefer simple outlines.
- Keep icon dimensions and stroke weights consistent.
- Use neutral colors by default.
- Apply the accent color selectively.
- Include icons only when they improve clarity or usability.

Do not add decorative icons merely to fill empty space.

## 9. Interaction and Motion

Use subtle, smooth transitions to make the interface feel refined.

- Hover transitions: approximately `150–220ms`.
- Standard UI transitions: approximately `200–300ms`.
- Use gentle color, opacity, and transform changes.
- Avoid excessive movement and distracting animation.
- Preserve usability when reduced motion is enabled.

Interactions should feel responsive without drawing unnecessary attention.

## 10. Responsive Styling

Preserve the same visual identity across desktop, tablet, and mobile.

- Maintain consistent typography and spacing principles.
- Reduce spacing proportionally on smaller screens.
- Preserve readability and appropriate touch targets.
- Prevent horizontal overflow.  
- Keep image proportions intentional.
- Ensure controls remain accessible.
- Adapt existing layouts naturally instead of forcing desktop styling onto mobile.

## 11. Visual Consistency

Apply the design language consistently across the entire project.

- Reuse existing design tokens where possible.
- Keep colors, typography, radii, borders, and transitions consistent.
- Avoid unnecessary one-off styles.
- Prefer simple visual treatments over decorative complexity.
- Maintain clear hierarchy without introducing excessive cards or containers.

## 12. Constraints for AI Implementation

**This document defines visual styling only.**

When applying these guidelines to an existing project:

1. Preserve the existing page structure, content, features, and user flows.
2. Preserve the existing framework, architecture, data models, and business logic.
3. Do not copy the reference website's layout, content, branding, or specific component arrangements.
4. Do not add, remove, or reorganize sections simply to resemble the reference.
5. Do not invent new features or change application behavior.
6. Apply the visual style to the project's existing components and layouts.
7. Reuse existing components and styling conventions whenever practical.
8. Make responsive and accessibility improvements without changing the intended functionality.

The final result should retain the original project's identity and functionality while adopting the reference's minimalist aesthetic, neutral palette, strong typography, generous whitespace, rounded geometry, and restrained use of color.