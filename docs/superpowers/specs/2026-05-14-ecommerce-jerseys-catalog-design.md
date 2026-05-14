# Design Spec: Soccer Jersey Ecommerce Catalog

## 1. Overview
A premium, modern, and rounded ecommerce catalog for soccer jerseys. The focus is on a high-end visual experience (Light Mode), easy filtering, and an advanced "WhatsApp Order Management" flow.

## 2. Visual Identity (V3 - Light Mode Retro)
- **Theme**: Premium Light Mode (#fdfdfd background).
- **Inspiration**: Classic jerseys of Sevilla (White/Red), Betis (Green/White), and Real Madrid (White/Gold).
- **Style**:
    - **Corners**: Very rounded (border-radius: 24px).
    - **Glassmorphism**: Light transparency and backdrop-filter blur for Header and Modals.
    - **Shadows**: Very soft, subtle shadows (rgba(0,0,0,0.05)) for a "clean" look.
- **Typography**: Inter / Roboto (Sans-serif, clean and elegant weights).

## 3. Core Features
- **Product Catalog**:
    - Filter by Team, League, and Retro category.
    - Text search for jerseys.
    - Dynamic product cards with hover effects.
- **Product Details (Modals)**:
    - Detailed description.
    - Size selection (S, M, L, XL).
    - **Customization**: Option to add Name/Number and Patches.
    - **Size Guide**: Measure table for each size.
- **Shopping Cart**:
    - Persistent cart (localStorage).
    - Float/Sticky cart icon with item count.
- **Advanced WhatsApp Order Management**:
    - **Pre-Order Form**: Collects Name, City, and Delivery Method before sending.
    - **Order ID Generation**: Unique code (e.g., #JERSEY-742) for each session/order.
    - **WhatsApp Redirection**: Formats a professional message:
        - "Hola! Nuevo pedido #ID de [Nombre] desde [Ciudad]"
        - "Productos: [Lista con tallas y dorsales]"
        - "Total: [Precio]"
    - **Order Summary**: View and "Copy to Clipboard" functionality.
- **Trust & Engagement**:
    - Related Products section.
    - Stock badges (Limited Edition, Low Stock, Pre-order).
    - FAQ section (Quality, Shipping, Care).
    - Testimonials/Social Proof carousel.
- **Contact**: Simple contact form for general inquiries.

## 4. Technical Architecture
- **Framework**: Next.js (App Router).
- **Styling**: Vanilla CSS with CSS Variables for theme consistency.
- **State**: React Context or Zustand for cart and order info.
- **Data Layer**:
    - Initial data in `data/jerseys.ts`.
    - Abstracted service layer `services/productService.ts` for future scalability.
- **Images**: High-quality placeholders or generated assets.

## 5. Scope & Constraints
- No real payment gateway integration.
- No user accounts (authentication).
- WhatsApp is the primary fulfillment channel.

## 6. Success Criteria
- Page loads in under 2 seconds.
- Fully responsive (Mobile-first).
- Elegant, retro-inspired light UI.
- Professional-looking WhatsApp order messages.
