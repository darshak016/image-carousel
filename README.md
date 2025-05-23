# Next.js Image Carousel

A modern, responsive image carousel built with Next.js, TypeScript, and Tailwind CSS. Features smooth transitions, touch support, keyboard navigation, and autoplay functionality.

## Features

- 🖼️ Smooth image transitions with fade and slide effects
- 🎯 Touch/swipe support for mobile devices
- ⌨️ Keyboard navigation (arrow keys and spacebar)
- 🎮 Play/pause autoplay functionality
- 📱 Fully responsive design
- 🎨 Beautiful UI with gradient backgrounds and glass-morphism effects
- 👍 Thumbnail navigation
- 🔄 Progress indicator for autoplay
- 🎯 Dot indicators for quick navigation

## Getting Started

1. Clone the repository:

```bash
git clone [your-repo-url]
cd my-next-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### Keyboard Controls

- `←` Previous image
- `→` Next image
- `Space` Toggle autoplay

### Touch Controls

- Swipe left: Next image
- Swipe right: Previous image

### Mouse Controls

- Click left/right arrows to navigate
- Click dots for direct navigation
- Click thumbnails for direct navigation
- Click play/pause button to control autoplay

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons

## Project Structure

```
src/
  app/
    page.tsx      # Main carousel component
    layout.tsx    # Root layout
    globals.css   # Global styles
public/
  ...            # Static assets
```

## Customization

### Adding/Modifying Images

Edit the `images` array in `src/app/page.tsx`:

```typescript
const images = [
  {
    id: 1,
    url: "your-image-url",
    title: "Image Title",
    description: "Image Description",
  },
  // Add more images...
];
```

### Styling

The project uses Tailwind CSS for styling. Modify the classes in the component or update the `tailwind.config.ts` file to customize the appearance.

## License

MIT

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
