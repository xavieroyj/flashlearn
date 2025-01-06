# FlashLearn Design Guidelines

## Brand Colors
- Primary: `#50e3c2` (Turquoise)
- Secondary: `#6366f1` (Indigo)
- Accent: `#f471b5` (Pink)

### Color Usage
- **Primary Actions**: `#50e3c2` for main CTAs and key interactive elements
- **Collaborative Features**: `#6366f1` for social and collaborative elements
- **Organization/Personal Features**: `#f471b5` for personal and organizational elements

### Background Colors
- Main Background: `#f8f9fa` (Light Gray)
- Card Background: `white`
- Feature Icon Backgrounds:
  - Turquoise: `bg-[#e6fff9]` with `text-[#50e3c2]`
  - Indigo: `bg-[#eef2ff]` with `text-[#6366f1]`
  - Pink: `bg-[#fce7f3]` with `text-[#f471b5]`

## Typography
### Fonts
- Headings: `Outfit` (Bold)
- Body: `Inter` (Regular)

### Font Sizes
- Hero Heading: `text-4xl sm:text-5xl lg:text-6xl`
- Section Headings: `text-3xl sm:text-4xl`
- Feature Cards Title: `text-xl`
- Body Text: `text-[15px]` or `text-lg`
- Navigation: `text-sm`

## Spacing
- Section Padding: `py-24`
- Container Max Width: `max-w-7xl`
- Grid Gap: `gap-6`
- Card Padding: `p-8`
- Icon Container: `w-12 h-12`
- Icons: `w-6 h-6`

## Components

### Cards
```tsx
className="bg-white rounded-3xl p-8 shadow-sm"
```

### Feature Icons
```tsx
<div className={`w-12 h-12 ${bgColor} rounded-2xl flex items-center justify-center mb-6`}>
  <Icon className={`w-6 h-6 ${iconColor}`} />
</div>
```

### Buttons
- Primary:
```tsx
className="bg-[#50e3c2] hover:bg-[#3bc5a7] text-white rounded-full px-8 py-6"
```
- Secondary:
```tsx
className="border-2 border-white/25 rounded-full px-6"
```

### Navigation
- Dark Theme:
```tsx
className="bg-black/90 backdrop-blur-md border border-white/10 rounded-full"
```

## Layout
### Grid System
- Mobile: Single column
- Tablet: Two columns `md:grid-cols-2`
- Desktop: Three columns `lg:grid-cols-3`

### Container
```tsx
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
```

## Design Principles
1. **Clean & Minimal**: Use white space effectively, avoid clutter
2. **Consistent Spacing**: Maintain rhythm with standardized spacing units
3. **Visual Hierarchy**: Clear distinction between different levels of information
4. **Responsive Design**: Fluid layouts that work across all device sizes
5. **Subtle Animations**: Enhance user experience without being distracting
6. **Accessibility**: Maintain good contrast ratios and readable text sizes

## Component Patterns

### Section Headers
```tsx
<div className="text-center max-w-3xl mx-auto mb-16">
  <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-slate-900 mb-4">
    {title}
  </h2>
  <p className="text-lg text-slate-600 font-inter">
    {description}
  </p>
</div>
```

### Feature Cards
```tsx
<div className="bg-white rounded-3xl p-8 shadow-sm">
  <div className="icon-container">
    {/* Icon */}
  </div>
  <h3 className="title">
    {/* Title */}
  </h3>
  <p className="description">
    {/* Description */}
  </p>
</div>
```

## Best Practices
1. Always use semantic HTML elements
2. Maintain consistent spacing throughout
3. Use the defined color palette
4. Follow the typography scale
5. Implement responsive designs
6. Use animations sparingly and purposefully
7. Ensure all interactive elements have hover states
8. Maintain accessibility standards 