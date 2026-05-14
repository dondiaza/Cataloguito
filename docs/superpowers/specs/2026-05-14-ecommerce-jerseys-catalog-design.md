# Design Spec: Soccer Jersey Ecommerce Catalog

## 1. Overview
A premium, modern, and rounded ecommerce catalog for soccer jerseys. The focus is on a high-end visual experience, easy filtering, and a "WhatsApp Checkout" flow since real payments are not required yet.

## 2. Visual Identity (V2 - Modern/Rounded)
- **Theme**: Premium Dark Mode (#0a0a0a background).
- **Accents**: Electric Green to Cyan gradient for interactive elements.
- **Style**:
    - **Corners**: Very rounded (border-radius: 24px).
    - **Glassmorphism**: Backdrop-filter blur and transparency for Header and Modals.
    - **Shadows**: Soft, multi-layered shadows for depth.
- **Typography**: Inter / Roboto (Sans-serif, bold for headings).

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
- **Checkout Flow (WhatsApp)**:
    - Formats cart content into a text message.
    - Redirects to WhatsApp with the pre-filled message.
- **Trust & Engagement**:
    - Related Products section.
    - Stock badges (Limited Edition, Low Stock, Pre-order).
    - FAQ section (Quality, Shipping, Care).
    - Testimonials/Social Proof carousel.
- **Contact**: Simple contact form for general inquiries.

## 4. Technical Architecture
- **Framework**: Next.js (App Router).
- **Styling**: Vanilla CSS with CSS Variables.
- **State**: React Context or Zustand for cart management.
- **Data Layer**:
    - Initial data in `data/jerseys.ts` (JSON-like structure).
    - Abstracted service layer `services/productService.ts` for future scalability (SQL/NoSQL).
- **Images**: High-quality placeholders or generated assets (Premium feel).

## 5. Scope & Constraints
- No real payment gateway integration.
- No user accounts (authentication) for now.
- Static data source with easy-to-update structure.

## 6. Success Criteria
- Page loads in under 2 seconds.
- Fully responsive (Mobile-first design).
- "Wow" factor on first visual impression.
- Working WhatsApp checkout flow.
