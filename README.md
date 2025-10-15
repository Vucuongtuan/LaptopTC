# 💻 LaptopTC - E-commerce Platform

A modern e-commerce platform specializing in gaming laptops, office laptops, and computer accessories built with Next.js 14.

## ✨ Key Features

- 🛒 **Full E-commerce**: Shopping cart, checkout, order management
- 🎮 **Diverse Products**: Gaming laptops, office laptops, mice, keyboards
- 👤 **User Authentication**: Registration, login, profile management
- 📱 **Responsive Design**: Optimized for all devices
- 🌙 **Dark/Light Mode**: Flexible theme switching
- 📊 **Admin Dashboard**: Product, order, and analytics management
- 📝 **Blog System**: Technology news and articles
- 🔍 **Smart Search**: Product search with debounce
- 📈 **Analytics**: Performance tracking with Vercel Analytics

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **Material-UI** - React component library

### State Management & Data Fetching
- **Redux Toolkit** - State management
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### UI/UX
- **Lucide React** - Icon library
- **Chart.js** - Data visualization
- **Embla Carousel** - Carousel component
- **Next Themes** - Theme switching

### Development Tools
- **ESLint** - Code linting
- **Autoprefixer** - CSS vendor prefixes
- **Sharp** - Image optimization

## 🚀 Installation & Setup

### System Requirements
- Node.js 18+ 
- npm/yarn/pnpm/bun

### Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the result.

### Production Build
```bash
npm run build
npm run start
```

## 📁 Project Structure

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── (auth)/            # Authentication routes
│   ├── blog/              # Blog pages
│   ├── details/           # Product details
│   ├── product/           # Product pages
│   ├── profile/           # User profile
│   └── thanhtoan/         # Checkout pages
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── header/           # Header component
│   ├── footer/           # Footer component
│   ├── Cart/             # Shopping cart
│   ├── loginAndResigter/ # Auth components
│   └── ...
├── api/                  # API layer
│   ├── admin/           # Admin APIs
│   ├── product/         # Product APIs
│   └── user/            # User APIs
├── lib/                 # Utilities
│   ├── store.ts         # Redux store
│   └── utils.ts         # Helper functions
├── types/               # TypeScript definitions
└── utils/               # Utility functions
```

## 🎯 Feature Details

### User Features
- Account registration/login
- Browse and search products
- Add products to cart
- Order checkout
- Personal profile management
- Read technology blog

### Admin Features
- Statistics dashboard
- Product management (CRUD)
- Order management
- User management
- Blog creation and editing
- Revenue charts

## 🔧 Available Scripts

- `npm run dev` - Run development server
- `npm run build` - Build for production
- `npm run start` - Run production server
- `npm run lint` - Check code with ESLint

## 📱 Responsive Design

Website optimized for:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🌐 SEO & Performance

- ✅ Server-side rendering (SSR)
- ✅ Static generation (SSG)
- ✅ Image optimization with Next.js Image
- ✅ Optimized meta tags
- ✅ Automatic sitemap
- ✅ Analytics tracking

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

- Website: [LaptopTC](http://localhost:3000)
- Email: contact@laptoptc.com

---

⭐ If this project is helpful, please give it a star!
