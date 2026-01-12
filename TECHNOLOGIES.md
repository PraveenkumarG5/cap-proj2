# Technologies Used

This document outlines the core technologies used in the Banking Teller 360 Portal, with a special focus on Tailwind CSS.

## 1. Backend: Spring Boot & Ecosystem
- **Spring Boot 3.x**: The framework for building the production-ready application.
- **Spring Data JPA**: For database interactions using Hibernate under the hood. It simplifies CRUD operations and complex queries.
- **H2 Database**: An embedded relational database engine. We use it in file mode to persist data between restarts without needing a separate server.
- **Jakarta Validation**: Used for checking data integrity ensuring we don't process invalid transaction requests.

## 2. Frontend: React & Ecosystem
- **React 18**: The library for building the user interface. We use Functional Components and Hooks (`useState`, `useEffect`) for state management.
- **Vite**: The build tool. It is significantly faster than CRA (Create React App) because it leverages native ES modules during development.
- **TypeScript**: Adds static typing to JavaScript, reducing bugs and improving developer experience with better autocomplete.
- **Axios**: A promise-based HTTP client for making requests to the backend API.

## 3. Deep Dive: Tailwind CSS

Tailwind CSS is a **utility-first CSS framework**. Instead of writing custom CSS classes like `.btn-primary` and then defining `background-color`, `padding`, etc., in a separate file, you use pre-defined utility classes directly in your HTML/JSX.

### Why Tailwind?
1.  **Speed**: You don't have to switch context between HTML and CSS files.
2.  **Consistency**: It provides a design system out of the box (spacing, colors, typography). You won't end up with 50 different shades of blue.
3.  **Smaller Bundle Size**: In production, Tailwind scans your code and only includes the CSS classes you actually used.

### How it works in this project
We use **Tailwind v4**, which simplifies configuration even further.

#### 1. Configuration
In `frontend/src/index.css`, we import the framework:
```css
@import "tailwindcss";
```
This single line pulls in all the utilities.

#### 2. Utility Class Examples
Here is how we use it in the `AccountCard` component:

```tsx
<div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
```

-   `bg-white`: Sets `background-color: #ffffff`.
-   `p-6`: Sets `padding: 1.5rem` (Space scale 6 = 1.5rem = 24px).
-   `rounded-xl`: Sets `border-radius: 0.75rem`.
-   `shadow-sm`: Adds a small box-shadow.
-   `border border-slate-200`: Adds a 1px border with a specific slate-gray color.

#### 3. Responsive Design
Tailwind makes mobile-first design easy using prefixes:
-   `md:grid-cols-2`: On medium screens (768px+) and larger, use 2 columns.
-   `grid-cols-1`: On mobile (default), use 1 column.

#### 4. States
We also handle interaction states using prefixes like `hover:` and `focus:`:

```tsx
<button className="bg-blue-600 hover:bg-blue-700 ...">
```
This automatically changes the background color when the user hovers over the button.

### Styling vs Traditional CSS
**Traditional CSS**:
```css
/* style.css */
.card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```
**Tailwind**:
```html
<div class="bg-white p-5 rounded-lg shadow">
```

While the HTML looks "busier", the maintenance burden is much lower because you stop fighting with the global cascade of CSS stylesheets.
