# CoffeeJoy (Single Page Website)

This project is a landing page for a coffee shop, designed with a mobile-first
approach and strict adherence to responsiveness and semantic standards.

## 📋 Project Overview (MVP)

### Technical Requirements

- **Responsive Design**:
  - **Strategy**: Mobile First (using `min-width`).
  - **Breakpoints**:
    - Mobile: Fluid from `320px`, adaptive from `375px`.
    - Tablet: `768px`.
    - Desktop: `1440px`.
- **Validation**:
  - HTML must pass [W3C Validator](https://validator.w3.org/).
  - CSS must pass [W3C CSS Validator](https://jigsaw.w3.org/css-validator/).
- **Semantics**: Strict HTML5 semantic structure.
- **Code Style**: Formatted with Prettier.
- **Normalization**: `modern-normalize` must be included.

### Graphics & Assets

- **Images**:
  - Optimization required for both vector and raster graphics.
  - Retina support (x1, x2) for all background and content images.
  - Optimized loading (lazy loading where appropriate).
- **Icons**:
  - SVG format required for logos and icons.
  - SVG icons implemented via sprites.
- **Favicon**: Must be included.

---

## 🏗️ Project Structure

The single-page application consists of the following sections:

### 1. Header

- **Content**: Logo (SVG) and Site Navigation.
- **Behavior**: Navigation links are anchors jumping to respective sections.

### 2. Hero

- **Headings**: Main title (H1) “Savor the Essence of Specialty Coffee”.
- **Content**: Descriptive text.
- **Background**: Responsive background image.
- **Actions**: “Learn More” button linking to the **Quality** section.

### 3. Welcome

- **Headings**: Section title “Our Journey: Passion for Quality Coffee”.
- **Content**: Description text (positioned to the right of the title).
- **Actions**: “Find location” link (with SVG icon) pointing to the **Location**
  section.
- **Images**: Content image displayed below the “Find location” link.

### 4. Quality

- **Headings**: Section title “Why CoffeeJoy Stands Out from the Rest”.
- **Content**:
  - Description text below the title.
  - List (`<ul>`) of 3 advantages (Articles).
  - Each article includes: Content Image, Title, Description.

### 5. Experience

- **Headings**: Section title “Coffee Moments”.
- **Content**: Short description.
- **Gallery**: Photo list (`<ul>`) implemented with Flexbox.
- **Images**: Content images.

### 6. Subscribe

- **Headings**: Section title “Join Our Coffee Community”.
- **Content**: Short description and a content image.
- **Form**:
  - Email input field with a label.
  - HTML5 validation (required attribute).
  - “Subscribe” button (`type="submit"`).

### 7. Testimonials

- **Headings**: Section title “What our visitors say”.
- **Content**: List (`<ul>`) of reviews.
- **Card Structure**:
  - Rating stars (SVG icons).
  - Review text.
  - Author name.

### 8. Location

- **Headings**: Section title “Location”.
- **Content**: Description text.
- **Contacts**: List (`<ul>`) containing:
  - Email (clickable `mailto:`).
  - Phone (clickable `tel:`).
  - Address.
  - All with SVG icons.
- **Map**:
  - Embedded Google Map iframe (Address: _263 Newbury St, Boston, MA 02116,
    USA_).
  - "Get Directions" link pointing to Google Maps.

### 9. Footer

- **Content**:
  - Logo.
  - Anchor navigation links (`<ul>`).
  - Social Media links (`<ul>`, open in new tab):
    - [Facebook](https://www.facebook.com/)
    - [Instagram](https://www.instagram.com/)
    - [X](https://x.com/)
  - Consumer rights protection info.
- **Icons**: SVG format for social networks.

### 10. Mobile Menu

- **Layout**: Width matches layout, Height occupies full viewport (`100vh`).
- **State**: Hidden by default. Visible when `is-open` class is added.
