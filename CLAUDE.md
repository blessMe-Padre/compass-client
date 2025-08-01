# CodeViz Research Context

> **Note**: This file contains research context from CodeViz. Most recent contexts are at the bottom.

---

## Research Query

,,,

*Session: 0bf1181d92c9ddcb127f588e1c426795 | Generated: 7/6/2025, 1:12:07 PM*

### Analysis Summary

# Project Overview: Compass Client

## High-Level Architecture
The **Compass Client** is a Next.js application designed to provide an e-commerce frontend. It follows a component-based architecture, separating concerns into distinct modules for pages, reusable UI components, API interactions, state management, and utility functions.

*   **Next.js Application**: The core framework, handling routing, server-side rendering (SSR), and API routes. Configured via [next.config.mjs](next.config.mjs) and [jsconfig.json](jsconfig.json).
*   **Pages**: Define the various routes and views of the application, located under [app/(pages)/](app/(pages)/).
*   **Components**: Reusable UI elements that build up the pages, found in [app/components/](app/components/).
*   **API Routes**: Serverless functions within Next.js that handle backend logic and data fetching, residing in [app/api/](app/api/).
*   **State Management**: Centralized data stores for application-wide state, implemented in [app/store/](app/store/).
*   **Utilities**: Helper functions and custom React hooks used across different parts of the application, located in [app/utils/](app/utils/) and [app/hooks/](app/hooks/).
*   **Public Assets**: Static files like images and icons, served from the [public/](public/) directory.

## Core Application Structure
The foundational elements of the Next.js application are:
*   **Next.js Configuration**: The main configuration for the Next.js project is defined in [next.config.mjs](next.config.mjs). Project dependencies and scripts are managed in [package.json](package.json). JavaScript configuration is in [jsconfig.json](jsconfig.json).
*   **Root Layout and Global Styles**: The main application layout is defined in [app/layout.js](app/layout.js), which wraps all pages. Global CSS styles are applied via [app/globals.css](app/globals.css), and SCSS mixins are available in [app/mixins.scss](app/mixins.scss).
*   **Not Found Page**: A custom 404 page is provided by [app/not-found.jsx](app/not-found.jsx) with its specific styling in [app/not-found.module.scss](app/not-found.module.scss).

## Pages
*   **Purpose**: To define the distinct routes and content displayed to the user. Each directory under [app/(pages)/](app/(pages)/) typically represents a unique route or a group of related routes.
*   **Internal Structure**: Most pages follow a consistent structure, containing a [page.jsx](app/(pages)/about/page.jsx) (or [page.js](app/page.js) for the root), a [ContentPage.jsx](app/(pages)/about/ContentPage.jsx) for rendering the main content, and a [style.module.scss](app/(pages)/about/style.module.scss) for page-specific styling.
*   **Authentication Pages**: Pages related to user authentication (login, registration, dashboard, search) are grouped under [app/(pages)/(auth)/](app/(pages)/(auth)/).
*   **Examples**: Key page sections include [about](app/(pages)/about/), [catalog](app/(pages)/catalog/), [cart](app/(pages)/cart/), [checkout](app/(pages)/checkout/), and [contacts](app/(pages)/contacts/).

## Components
*   **Purpose**: To encapsulate reusable UI logic and presentation, promoting modularity and maintainability.
*   **Internal Structure**: Each component resides in its own directory within [app/components/](app/components/), containing its JSX/JS file and often a dedicated SCSS module for styling.
*   **Key Components**:
    *   **Navigation & Layout**: Includes the [Header](app/components/Header/), [Footer](app/components/Footer/), [Breadcrumbs](app/components/Breadcrumbs/), and [PageMenu](app/components/PageMenu/).
    *   **Forms & User Input**: Such as [AskForm](app/components/AskForm/), [FilterForm](app/components/FilterForm/), [Forms](app/components/Forms/), [FormsCheckout](app/components/FormsCheckout/), [ReviewsForm](app/components/ReviewsForm/), and [UserForm](app/components/UserForm/).
    *   **Product & Cart Display**: Components like [CardItem](app/components/CardItem/), [ProductsList](app/components/ProductsList/), [CartInfo](app/components/CartInfo/), [CartItem](app/components/CartItem/), [MiniCart](app/components/MiniCart/), and [PromocodComponent](app/components/PromocodComponent/).
    *   **Feedback & Interaction**: Includes [Popup](app/components/Popup/), [PopupReviews](app/components/PopupReviews/), [PopupText](app/components/PopupText/), and [Notification](app/components/Notification/).
    *   **Utilities & Visuals**: Such as [Clipboard](app/components/Clipboard/), [ContentRenderer](app/components/ContentRenderer/), [Counter](app/components/Counter/), [Preloader](app/components/Preloader/), [Search](app/components/Search/), [StarRating](app/components/StarRating/), [TableSize](app/components/TableSize/), and [Timer](app/components/Timer/).

## API Routes
*   **Purpose**: To provide server-side endpoints for data fetching, form submissions, and integration with external services. These are Next.js API routes, running as serverless functions.
*   **Internal Structure**: Organized by domain within [app/api/](app/api/), with subdirectories for specific functionalities like [cdek](app/api/cdek/), [notification](app/api/notification/), and [payment](app/api/payment/).
*   **External Relationships**: These routes are typically consumed by frontend pages and components using client-side data fetching mechanisms (e.g., `fetch` or a data fetching library) to interact with databases or third-party APIs.

## State Management
*   **Purpose**: To manage the global state of the application, ensuring data consistency and accessibility across different components and pages.
*   **Internal Structure**: State slices are defined in individual files within [app/store/](app/store/). Examples include [cartStore.js](app/store/cartStore.js) for shopping cart data, [userStore.js](app/store/userStore.js) for user-related information, and [filterStore.js](app/store/filterStore.js) for filtering options.
*   **External Relationships**: Components and pages subscribe to these stores to react to state changes and dispatch actions to update the state.

## Utility Functions and Hooks
*   **Purpose**: To provide common, reusable logic that doesn't directly relate to UI rendering or state management.
*   **Utility Functions**: Located in [app/utils/](app/utils/), these include functions for data fetching (e.g., [fetchData.jsx](app/utils/fetchData.jsx)), data transformation (e.g., [getProductWordForm.js](app/utils/getProductWordForm.js)), and API interactions (e.g., [getAllProducts.js](app/utils/getAllProducts.js), [updateUserDateService.js](app/utils/updateUserDateService.js)).
*   **Custom Hooks**: Defined in [app/hooks/](app/hooks/), such as [useCartTotals.js](app/hooks/useCartTotals.js), which encapsulate reusable stateful logic for React components.
*   **External Relationships**: These functions and hooks are imported and utilized by pages, components, and API routes to perform common tasks and abstract complex logic.

## Public Assets
*   **Purpose**: To store static files that are directly served by the web server, such as images, icons, and other media.
*   **Internal Structure**: The [public/](public/) directory contains various assets, often organized into subdirectories like [public/icons/](public/icons/) for SVG icons, [public/remove/](public/remove/) for placeholder images, and [public/top/](public/top/) for specific promotional images.
*   **External Relationships**: These assets are referenced directly in HTML or CSS by their path relative to the `public` directory and are loaded by the browser.

