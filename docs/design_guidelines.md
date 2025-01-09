# FlashLearn Design Guidelines

## Brand Colors
- Primary: `#80e5e9` (Turquoise)
- Background: `#000910` (Dark Navy)
- Card Background: `#001213` (Dark Teal)
- Accent Gradient: `from-[#80e5e9] to-[#4cc9cd]`

### Color Usage
- **Primary Actions**: `#80e5e9` for CTAs and key interactive elements
- **Backgrounds**: 
  - Main: `#000910` with noise texture
  - Cards: `#001213` with subtle glow
  - Hover States: `#004D4E` (Lighter Teal)
- **Gradients**:
  - Primary: `bg-gradient-to-r from-[#80e5e9] to-[#4cc9cd]`
  - Glow: `bg-[#80e5e9]/10 blur-[100px]`

### Color Classes
```tsx
// Primary Elements
className="text-primary" // Turquoise text
className="bg-primary" // Turquoise background

// Background Elements
className="bg-background" // Dark navy background
className="bg-card" // Dark teal card background

// Gradient Text
className="bg-gradient-to-r from-[#80e5e9] to-[#4cc9cd] text-transparent bg-clip-text"

// Glow Effects
className="relative before:absolute before:inset-0 before:bg-primary/20 before:blur-xl before:-z-10"
```

## Typography
### Fonts
- Headings: `Inter` (SemiBold - 600)
- Body: `Inter` (Regular - 400)

### Font Sizes
```tsx
// Headings
className="text-4xl md:text-5xl lg:text-6xl font-semibold" // Hero heading
className="text-3xl md:text-4xl font-semibold" // Section headings
className="text-2xl font-semibold" // Card headings
className="text-xl font-medium" // Subsection headings

// Body Text
className="text-lg text-muted-foreground/80" // Large body text
className="text-base text-muted-foreground/70" // Regular body text
className="text-sm text-muted-foreground/60" // Small text
```

## Layout & Spacing
### Container
```tsx
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
```

### Section Spacing
```tsx
className="py-24" // Section padding
className="space-y-8" // Vertical spacing between elements
className="gap-8" // Grid gap
```

### Grid System
```tsx
// Basic grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"

// Two-column layout
className="grid md:grid-cols-2 gap-8"
```

## Components

### Cards
```tsx
// Basic Card
className="rounded-[20px] bg-card p-8 relative overflow-hidden"

// Glowing Card
className="rounded-[20px] bg-card p-8 relative overflow-hidden before:absolute before:inset-0 before:bg-primary/5 before:blur-xl before:-z-10"

// Feature Card
className="rounded-[20px] bg-gradient-to-b from-card to-card/50 p-8 border border-white/[0.05]"
```

### Buttons
```tsx
// Primary Button
className="bg-gradient-to-r from-[#80e5e9] to-[#4cc9cd] text-primary-foreground hover:opacity-90 rounded-full h-12 px-8 transition-all"

// Secondary Button
className="bg-[#004D4E] text-foreground hover:bg-[#004D4E]/90 rounded-full h-12 px-8"

// Outline Button
className="border border-white/10 text-muted-foreground hover:bg-white/5 rounded-full h-12 px-8 transition-all"

// Glass Button
className="bg-white/5 backdrop-blur-lg border border-white/10 text-foreground hover:bg-white/10 rounded-full h-12 px-8"
```

### Navigation
```tsx
// Navbar
className="fixed top-4 left-4 right-4 bg-background/60 backdrop-blur-xl rounded-full border border-white/[0.05]"

// Nav Items
className="text-sm text-muted-foreground/70 hover:text-foreground transition-colors"
```

### Background Effects
```tsx
// Noise Texture
className="before:absolute before:inset-0 before:bg-noise-pattern before:opacity-[0.03] before:bg-repeat"

// Gradient Overlay
className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"

// Glow Effect
className="absolute -z-10 blur-[100px] bg-primary/10 rounded-full w-[200px] h-[200px]"
```

## Motion & Animations
### Fade In Up
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

### Stagger Children
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}
```

## Design Principles
1. **Dark Theme First**: Design for dark mode as primary experience
2. **Consistent Spacing**: Use standardized spacing units
3. **Progressive Enhancement**: Add subtle animations and transitions
4. **Responsive Design**: Mobile-first approach
5. **Visual Hierarchy**: Clear distinction between different levels of information

## Best Practices
1. Use semantic HTML elements
2. Maintain consistent spacing
3. Implement proper hover states
4. Ensure accessibility standards
5. Use motion sparingly
6. Keep text hierarchy clear
7. Maintain proper contrast ratios

## Component Patterns

### Section Headers
```tsx
<div className="text-center max-w-3xl mx-auto mb-16 relative">
  <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-primary/10 blur-[100px] rounded-full" />
  <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-[#80e5e9] to-[#4cc9cd] text-transparent bg-clip-text mb-4">
    {title}
  </h2>
  <p className="text-lg text-muted-foreground/80">
    {description}
  </p>
</div>
```

### Feature Cards
```tsx
<div className="rounded-[20px] bg-gradient-to-b from-card to-card/50 p-8 border border-white/[0.05] relative overflow-hidden group">
  <div className="absolute -z-10 opacity-0 group-hover:opacity-100 transition-opacity inset-0 bg-primary/5 blur-xl" />
  <div className="text-primary mb-4">
    {/* Icon */}
  </div>
  <h3 className="text-xl font-medium text-foreground mb-2">
    {title}
  </h3>
  <p className="text-muted-foreground/70">
    {description}
  </p>
</div>
```

### Stats Display
```tsx
<div className="text-center relative">
  <div className="absolute -z-10 inset-0 bg-primary/5 blur-xl opacity-50" />
  <div className="text-4xl font-semibold bg-gradient-to-r from-[#80e5e9] to-[#4cc9cd] text-transparent bg-clip-text mb-2">
    {stat}
  </div>
  <div className="text-sm text-muted-foreground/70">
    {label}
  </div>
</div>
```

### Image Treatment
```tsx
// Image Container
className="relative rounded-[20px] overflow-hidden border border-white/[0.05]"

// Image Overlay
className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
``` 