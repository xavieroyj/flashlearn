# FlashLearn Design Guidelines

## Brand Colors
- Primary: `#80e5e9` (Turquoise)
- Background: `#001213` (Dark Teal)
- Card Background: `#003738` (Deep Teal)

### Color Usage
- **Primary Actions**: `#80e5e9` for CTAs and key interactive elements
- **Backgrounds**: 
  - Main: `#001213` (Dark Teal)
  - Cards: `#003738` (Deep Teal)
  - Hover States: `#004D4E` (Lighter Teal)

### Color Classes
```tsx
// Primary Elements
className="text-primary" // Turquoise text
className="bg-primary" // Turquoise background

// Background Elements
className="bg-background" // Dark teal background
className="bg-card" // Deep teal card background

// Text Colors
className="text-foreground" // White text
className="text-muted-foreground" // Muted text
```

## Typography
### Fonts
- Headings: `Inter` (Medium)
- Body: `Inter` (Regular)

### Font Sizes
```tsx
// Headings
className="text-4xl md:text-5xl lg:text-6xl" // Hero heading
className="text-3xl md:text-4xl" // Section headings
className="text-2xl" // Card headings
className="text-xl" // Subsection headings

// Body Text
className="text-lg" // Large body text
className="text-base" // Regular body text
className="text-sm" // Small text
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
className="rounded-[20px] bg-[#003738] p-8"
```

### Buttons
```tsx
// Primary Button
className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12"

// Secondary Button
className="bg-[#004D4E] text-foreground hover:bg-[#004D4E]/90 rounded-full h-12"

// Outline Button
className="border border-muted-foreground/30 text-muted-foreground hover:bg-muted-foreground/10 rounded-full"
```

### Navigation
```tsx
// Navbar
className="fixed top-4 left-4 right-4 bg-card/60 backdrop-blur-xl rounded-full border border-white/10"

// Nav Items
className="text-sm text-muted-foreground hover:text-foreground transition-colors"
```

### Progress Bars
```tsx
// Container
className="w-full h-[2px] bg-[#004D4E]"

// Progress
className="h-full bg-primary rounded-full transition-all duration-500"
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
<div className="text-center max-w-3xl mx-auto mb-16">
  <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
    {title}
  </h2>
  <p className="text-lg text-muted-foreground">
    {description}
  </p>
</div>
```

### Feature Cards
```tsx
<div className="rounded-[20px] bg-card p-8">
  <div className="text-primary mb-4">
    {/* Icon */}
  </div>
  <h3 className="text-xl font-medium text-foreground mb-2">
    {title}
  </h3>
  <p className="text-muted-foreground">
    {description}
  </p>
</div>
```

### Stats Display
```tsx
<div className="text-center">
  <div className="text-4xl font-medium text-primary mb-2">
    {stat}
  </div>
  <div className="text-sm text-muted-foreground">
    {label}
  </div>
</div>
``` 