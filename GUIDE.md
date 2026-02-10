# Complete Step-by-Step Guide for IDX Broker Integration

## Phase 1: IDX Broker Account Setup (Do This First)

### Step 1: Log into IDX Broker Dashboard
1. Go to https://middleware.idxbroker.com/mgmt/login
2. Enter your username and password
3. Click "Sign In"

### Step 2: Get Your Account Information
1. Once logged in, look at the URL or your account settings
2. Note down your **Account ID** (usually looks like: `yourname` or `realestate360`)
3. Your IDX domain will be: `https://[YOUR_ACCOUNT_ID].idxbroker.com`

### Step 3: Create a Dynamic Wrapper
1. In the left sidebar, click **"Design"**
2. Click **"Wrappers"**
3. Click the **"Create New Wrapper"** button (or "+ New Wrapper")
4. Enter these settings:
   - **Wrapper Name**: `Main Website Wrapper`
   - **Wrapper Type**: Select **"Dynamic Wrapper"**
   - **Wrapper URL**: `https://realestate360.realtor/idx-wrapper/`
5. Click **"Save"**

### Step 4: Set the Wrapper as Default
1. Find your newly created wrapper in the list
2. Click the **star icon** (☆) next to it to make it the default wrapper
3. It should now show as "Default" in the status column

---

## Phase 2: Get Widget ID for Search/Map/Results

### Step 5: Your Widgets (Already Created)
You already have these widgets set up in your IDX Broker account:

| Widget ID | Name | Type | Used On |
|-----------|------|------|---------|
| **135839** | Featured Showcase | listings Showcase | `/listings` page |
| **135840** | Sold/Pending Showcase | listings Showcase | `/listings/sold` page |
| **135841** | Featured Slide Show | listings Carousel | (Optional: Homepage) |
| **135842** | Map Search | prime MapSearch | `/idx-wrapper` page |

### Step 6: Widget Assignment (Already Done)
The widgets have been configured in your code:

- **Map Search (135842)** → `/idx-wrapper` - Full search with map
- **Featured Showcase (135839)** → `/listings` - Featured properties
- **Sold/Pending Showcase (135840)** → `/listings/sold` - Sold properties

### Step 7: Code Already Updated
Your code has already been updated with the correct widget URLs:

**File: `src/pages/IdxWrapper.tsx`**
```typescript
script.src = 'https://realestate360.idxbroker.com/idx/customshowcasejs.php?widgetid=135842';
```

**File: `src/pages/Listings.tsx`**
```typescript
script.src = 'https://realestate360.idxbroker.com/idx/customshowcasejs.php?widgetid=135839';
```

**File: `src/pages/SoldListings.tsx`**
```typescript
script.src = 'https://realestate360.idxbroker.com/idx/customshowcasejs.php?widgetid=135840';
```

---

## Phase 3: Add Custom CSS for Dark Theme

### Step 7: Access Custom CSS in IDX Broker
1. In IDX Broker dashboard, click **"Design"** in left sidebar
2. Click **"Website"**
3. Click **"Custom CSS"** tab
4. You should see a large text area for CSS

### Step 8: Paste the Dark Mode CSS
Copy and paste this exact CSS into the Custom CSS text area:

```css
/* ============================================
   REAL ESTATE 360 - DARK MODE IDX STYLES
   ============================================ */

/* Force Dark Mode on IDX Container */
#idx-main-container {
    background-color: #000000 !important;
    color: #e0e0e0 !important;
}

/* Main Wrapper Background */
.IDX-wrapper {
    background-color: #000000 !important;
    color: #ffffff !important;
}

/* Listings Cards */
.IDX-resultsCell {
    background: #111111 !important;
    border: 1px solid #333333 !important;
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.1) !important; /* Gold glow */
    transition: all 0.3s ease !important;
}

.IDX-resultsCell:hover {
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.2) !important;
    transform: translateY(-2px) !important;
}

/* Property Address & Price */
.IDX-resultsAddress {
    color: #ffffff !important;
    font-family: 'Playfair Display', Georgia, serif !important;
    font-size: 16px !important;
}

.IDX-resultsPrice {
    color: #d4af37 !important; /* Gold color */
    font-family: 'Playfair Display', Georgia, serif !important;
    font-size: 20px !important;
    font-weight: 600 !important;
}

/* Property Details (beds, baths, sqft) */
.IDX-resultsBeds, 
.IDX-resultsBaths, 
.IDX-resultsSqft {
    color: #cccccc !important;
    font-family: 'Inter', system-ui, sans-serif !important;
}

/* Search Form Styling */
.IDX-quickSearchForm,
.IDX-searchForm {
    background-color: #111111 !important;
    border: 1px solid #333333 !important;
    padding: 20px !important;
    border-radius: 0px !important;
}

/* Input Fields */
.IDX-quickSearchForm input, 
.IDX-quickSearchForm select,
.IDX-searchForm input,
.IDX-searchForm select {
    background-color: #222222 !important;
    color: #ffffff !important;
    border: 1px solid #444444 !important;
    padding: 12px !important;
    font-family: 'Inter', system-ui, sans-serif !important;
}

.IDX-quickSearchForm input:focus,
.IDX-quickSearchForm select:focus {
    border-color: #d4af37 !important; /* Gold border on focus */
    outline: none !important;
}

/* Search Button */
.IDX-btn,
.IDX-searchButton {
    background-color: #d4af37 !important; /* Gold */
    color: #000000 !important;
    border: none !important;
    padding: 12px 24px !important;
    font-family: 'Inter', system-ui, sans-serif !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.1em !important;
    transition: all 0.3s ease !important;
}

.IDX-btn:hover,
.IDX-searchButton:hover {
    background-color: #b8962e !important; /* Darker gold */
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3) !important;
}

/* Map Container Dark Mode */
#IDX-mapContainer {
    filter: invert(90%) hue-rotate(180deg) !important; /* Dark mode for Google Maps */
}

/* Pagination */
.IDX-pagination {
    background-color: transparent !important;
}

.IDX-pagination a {
    color: #d4af37 !important; /* Gold */
    border: 1px solid #333333 !important;
    background-color: #111111 !important;
}

.IDX-pagination a:hover {
    background-color: #d4af37 !important;
    color: #000000 !important;
}

.IDX-pagination .active {
    background-color: #d4af37 !important;
    color: #000000 !important;
}

/* Loading States */
.IDX-loading {
    color: #d4af37 !important;
}

/* Links */
.IDX-wrapper a {
    color: #d4af37 !important; /* Gold links */
    transition: color 0.3s ease !important;
}

.IDX-wrapper a:hover {
    color: #ffffff !important;
    text-decoration: underline !important;
}

/* Labels and Text */
.IDX-wrapper label,
.IDX-wrapper .IDX-label {
    color: #cccccc !important;
    font-family: 'Inter', system-ui, sans-serif !important;
}

/* Error Messages */
.IDX-error {
    color: #ff4444 !important;
    background-color: #331111 !important;
    border: 1px solid #ff4444 !important;
    padding: 10px !important;
}

/* Success Messages */
.IDX-success {
    color: #00ff00 !important;
    background-color: #113311 !important;
    border: 1px solid #00ff00 !important;
    padding: 10px !important;
}
```

5. Click **"Save Changes"**

---

## Phase 4: Test Your Integration

### Step 9: Start Your Local Development Server
```bash
npm run dev
```

### Step 10: Test the Wrapper Page
1. Open your browser
2. Go to: `http://localhost:5173/idx-wrapper`
3. You should see:
   - Your Navigation at the top
   - A black content area in the middle (where IDX content will appear)
   - Your Footer at the bottom

### Step 11: Test the Listings Page
1. Go to: `http://localhost:5173/listings`
2. This page is now also set up as an IDX wrapper

### Step 12: Verify IDX Content Loads
1. If everything is configured correctly, IDX Broker content should load in the `#idx-start` to `#idx-stop` area
2. The content should have the dark theme applied

---

## Phase 5: Deploy to Production

### Step 13: Build Your Project
```bash
npm run build
```

### Step 14: Deploy to Your Hosting
- Upload the `dist/` folder to your web server
- Or deploy to Vercel/Netlify as usual

### Step 15: Verify Wrapper URL
1. Go back to IDX Broker dashboard
2. Navigate to **Design → Wrappers**
3. Verify your wrapper URL is set to:
   - **Wrapper URL**: `https://realestate360.realtor/idx-wrapper/`
4. Save changes if needed

---

## Phase 6: Troubleshooting

### If IDX Content Doesn't Load:

**Check 1: Verify Wrapper URL**
- Make sure the wrapper URL in IDX Broker exactly matches your actual URL
- Include `https://` and the full path `/idx-wrapper`

**Check 2: Check Browser Console**
- Open browser DevTools (F12)
- Look for JavaScript errors
- Check Network tab for failed requests

**Check 3: Verify Widget ID**
- Make sure you copied the correct Widget ID from IDX Broker
- Widget ID should be a number

**Check 4: CORS Issues**
- If you see CORS errors, contact IDX Broker support
- They may need to whitelist your domain

### If Styling Looks Wrong:

**Check 1: CSS Priority**
- Make sure your CSS uses `!important` (already included in the CSS I provided)
- Check if other CSS is overriding the IDX styles

**Check 2: Clear Cache**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Clear IDX Broker cache in their dashboard

---

## Phase 7: Additional Configuration (Optional)

### Add More Widgets
You can create multiple widgets for different purposes:
- Featured Listings widget for homepage
- Map Search widget for map view
- Advanced Search widget for detailed searches

Each widget will have its own Widget ID.

### Customize Further
You can modify the CSS in `src/index.css` to match your exact brand colors. The current setup uses:
- Black background (#000000)
- Gold accents (#d4af37)
- White text (#ffffff)
- Gray secondary text (#cccccc)

---

## Summary of Changes Made to Your Project

### Files Removed:
- `src/services/sparkApi.ts` - Spark API service
- `src/services/idxApi.ts` - IDX API service
- `api/` directory - Vercel serverless functions
- `server/` directory - Local proxy server
- `test-idx-api.js` - Test file

### Files Created:
- `src/pages/IdxWrapper.tsx` - Map Search wrapper (Widget 135842)
- `src/pages/SoldListings.tsx` - Sold/Pending listings (Widget 135840)

### Files Modified:
- `src/App.tsx` - Added routes for `/idx-wrapper` and `/listings/sold`
- `src/pages/Listings.tsx` - Featured Showcase wrapper (Widget 135839)
- `src/components/Footer.tsx` - Updated property links
- `src/index.css` - Added dark mode CSS for IDX
- `package.json` - Removed proxy scripts

### Widget Mapping:
| Route | Widget ID | Widget Name | Purpose |
|-------|-----------|-------------|---------|
| `/idx-wrapper` | 135842 | Map Search | Full MLS search with map |
| `/listings` | 135839 | Featured Showcase | Featured properties |
| `/listings/sold` | 135840 | Sold/Pending Showcase | Sold/pending properties |
| (Optional) | 135841 | Featured Slide Show | Carousel for homepage |

### Key Technical Details:
- The wrapper uses `#idx-start` and `#idx-stop` divs to mark where IDX Broker injects content
- Dynamic script loading loads the IDX widget JavaScript
- CSS uses `!important` to override IDX Broker's default styles
- Dark theme matches your Real Estate 360 brand colors
