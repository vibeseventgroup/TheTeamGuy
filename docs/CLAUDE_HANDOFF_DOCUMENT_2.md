# The Team Guy — Frontend Development Status
## Claude Build Report | May 14, 2026

---

## 📋 EXECUTIVE SUMMARY

Claude has completed the **frontend project structure** and built **Screen 1 (Homepage)** as the MVP entry point. The frontend is now ready to integrate with Codex's backend API.

**Status:** Foundation complete, awaiting API endpoints from Codex

---

## 🏗️ PROJECT STRUCTURE CREATED

```
~/TheTeamGuy/
├── Website/                          (Frontend - React + Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   └── HomePage.jsx         ✅ COMPLETE
│   │   ├── components/              (Ready for Screens 2-12)
│   │   ├── api/
│   │   │   └── homepageAPI.js       ✅ COMPLETE
│   │   ├── assets/
│   │   │   └── images/
│   │   │       └── bryan.png        ✅ LOADED (2MB, transparent PNG)
│   │   ├── styles/
│   │   │   ├── HomePage.css         ✅ COMPLETE
│   │   │   └── global.css           ✅ COMPLETE
│   │   ├── App.jsx                  ✅ COMPLETE
│   │   └── main.jsx                 (Vite default, needs global.css import)
│   ├── public/
│   │   └── (Vite assets)
│   ├── package.json                 (Vite + React)
│   ├── vite.config.js
│   └── index.html
│
├── Codex/                            (Backend - Codex's responsibility)
│   └── (All database, API, auth, SMS, etc.)
│
└── (Project files & documentation)
```

---

## ✅ WHAT CLAUDE HAS BUILT

### 1. **Frontend Framework Setup**
- ✅ React + Vite project initialized
- ✅ Folder structure created (pages, components, api, assets, styles)
- ✅ Dark theme with orange accent (#FF6B00)
- ✅ Mobile-first responsive design

### 2. **Screen 1 — Homepage (Complete)**

**Component:** `HomePage.jsx`
- Dark background (#0a0a0a)
- Header with hamburger menu + 3-step progress indicator
- Hero section with Bryan's PNG image
- White speech bubble with orange border and highlight
- 4-button grid (2x2 layout) for vibe selection
- "Something else" input field at bottom with send icon
- Fully responsive, mobile-optimized
- All buttons ready for click handlers

**File Location:** `src/pages/HomePage.jsx`

**Styling:** `src/styles/HomePage.css`
- Dark theme implementation
- Orange accent colors
- Mobile responsive breakpoints
- Hover/active states
- Accessibility focus states

**Key Features:**
- Imports Bryan's PNG from assets
- Error handling with fallback button data
- Ready for API integration
- Comments in code for future developers

### 3. **API Integration Layer**

**File:** `src/api/homepageAPI.js`

**Current Functions:**
```javascript
getHomepageOptions()        // GET /api/homepage/options
submitCustomVibe(input)     // POST /api/vibes/custom
```

**Setup:**
- Uses environment variables for API URL (`VITE_API_URL`)
- Includes error handling and fallback behavior
- Response transformation for component compatibility
- Ready to extend with more endpoints

### 4. **Global Styles**

**File:** `src/styles/global.css`
- Dark theme CSS variables
- Typography hierarchy
- Responsive design utilities
- Animation classes
- Accessibility utilities
- Mobile safe area support

### 5. **App Router (Basic)**

**File:** `src/App.jsx`
- Simple entry point currently showing HomePage
- Ready for React Router integration
- Structured for future navigation setup

---

## 🔌 API CONTRACTS — What Claude Expects from Codex

### **Endpoint 1: Get Homepage Options**
```
GET /api/homepage/options
```

**Purpose:** Populate the 4-button grid on Screen 1

**Expected Response:**
```json
[
  {
    "option_id": 1,
    "label": "We're planning a team night",
    "icon": "calendar",
    "display_order": 1
  },
  {
    "option_id": 2,
    "label": "Need team bonding ideas",
    "icon": "users",
    "display_order": 2
  },
  {
    "option_id": 3,
    "label": "Organising a work event",
    "icon": "briefcase",
    "display_order": 3
  },
  {
    "option_id": 4,
    "label": "Need venue suggestions",
    "icon": "building",
    "display_order": 4
  }
]
```

**Status:** Awaiting implementation from Codex

---

### **Endpoint 2: Submit Custom Vibe (Optional)**
```
POST /api/vibes/custom
Body: { "custom_input": "string" }
```

**Purpose:** Handle the "Something else" input field

**Expected Response:**
```json
{
  "success": true,
  "message": "Custom vibe recorded"
}
```

**Status:** Awaiting implementation from Codex

---

## 📁 FILES DELIVERED TO CLAUDE'S OUTPUTS

All files are ready to be copied to your project. Files saved at `/outputs/`:

1. **SETUP_GUIDE.md** — Step-by-step integration instructions
2. **HomePage.jsx** — Homepage component
3. **HomePage.css** — Homepage styles
4. **homepageAPI.js** — API integration
5. **App.jsx** — Main app component
6. **global.css** — Global styles

---

## 🔧 INTEGRATION CHECKLIST

### What Frontend Developer (User) Needs to Do:

- [ ] Copy HomePage.jsx → `src/pages/`
- [ ] Copy HomePage.css → `src/styles/`
- [ ] Copy homepageAPI.js → `src/api/`
- [ ] Copy global.css → `src/styles/`
- [ ] Copy App.jsx → replace `src/App.jsx`
- [ ] Update `src/main.jsx` to import `./styles/global.css`
- [ ] Create `.env` file with `VITE_API_URL=http://localhost:3000/api`
- [ ] Verify `src/assets/images/bryan.png` exists (already copied)
- [ ] Run `npm run dev` and test at http://localhost:5173

### What Codex Developer Needs to Do:

- [ ] Implement `GET /api/homepage/options` endpoint
- [ ] Test endpoint returns correct JSON format
- [ ] Provide API URL to frontend (.env variable)
- [ ] Implement `POST /api/vibes/custom` (optional, for "Something else")
- [ ] Document any other endpoints needed for Screen 1

---

## 🎨 DESIGN SYSTEM IMPLEMENTED

**Colors:**
- Background: #0a0a0a (dark)
- Primary accent: #FF6B00 (orange)
- Text: #ffffff (white)
- Borders: rgba(255, 107, 0, 0.1) (subtle orange)

**Typography:**
- Font: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, etc.)
- Weights: 400 (regular), 500 (bold) — never 600 or 700
- Sizes: h1=32px, h2=24px, body=16px, small=14px

**Components:**
- Buttons: dark bg, orange border, orange icons, rounded corners
- Inputs: dark bg, subtle border, orange focus
- Speech bubbles: white bg, orange border, orange accent text
- Icons: orange, outlined style (SVG inline)

**Mobile:**
- 375px viewport width
- Safe area inset support for notch devices
- Touch-optimized button sizing
- Full-height responsive layout

---

## 📊 BUILD PRIORITY ROADMAP

**What Was Built (Phase 0):**
- ✅ Project structure
- ✅ Screen 1 (Homepage)
- ✅ API integration framework

**What's Next (Phase 1 — MVP Core):**
- [ ] Screen 2 (Vibe Selection)
- [ ] Screen 3 (Details Input)
- [ ] Screen 4 (Recommended Vibes)
- [ ] Screen 5 (Vibe Detail)
- [ ] Screen 6 (Booking/Enquiry + OTP)

**Then (Phase 2 — Team Features):**
- [ ] Screen 7 (Team Chat)
- [ ] Screen 8 (Team Posts)
- [ ] Screen 9 (Team Members)
- [ ] Screen 10 (Invite Members)
- [ ] Screen 11 (Messages/DM)
- [ ] Screen 12 (Profile)

**Then (Phase 3 — Admin Dashboard):**
- [ ] Admin Login
- [ ] Dashboard with stats
- [ ] Vibes Management
- [ ] Bookings Management
- [ ] Clubs, Teams, Users, Venues Management
- [ ] Messages & Reports

---

## 🚀 NEXT IMMEDIATE STEPS

### For Frontend Developer:
1. Copy all files to correct folders
2. Update main.jsx and .env
3. Run dev server and test Homepage
4. Wait for Codex to provide API endpoints

### For Codex Developer:
1. Implement `GET /api/homepage/options`
2. Test with Postman/Insomnia
3. Provide endpoint URL to frontend developer
4. Frontend can then test live API integration

### For Both:
1. Decide on API base URL (likely http://localhost:3000/api for local dev)
2. Set up CORS if needed for localhost testing
3. Plan daily sync schedule for integration

---

## 📝 NOTES FOR CODEX

### Database Tables Needed (From Schema):
The database schema provided shows these are already planned:
- `homepage_options` (or similar) — for the button options
- `vibes` — for vibe catalog
- `users` — for authentication
- `bookings` — for reservations
- `teams` — for team management
- `clubs` — for club management
- etc. (22 tables total)

Frontend is ready to consume the API — no changes needed to database schema.

### Environment Setup:
- Frontend: Node.js + Vite (requires npm, Node 14+)
- Backend: PHP/MySQL on Hostinger (Codex's setup)
- Communication: JSON over HTTP/HTTPS

### Testing:
- Frontend can be tested locally at http://localhost:5173
- Backend can be tested at http://localhost:3000/api (or deployed URL)
- CORS should allow requests from localhost:5173

---

## 🎯 HAND-OFF SUMMARY

**Frontend is ready to:**
- Display the homepage correctly
- Connect to Codex's API endpoints
- Handle loading states and errors
- Display fallback data if API fails
- Scale to 12+ screens with same pattern

**Codex should focus on:**
- Building the database schema (already planned)
- Creating API endpoints (starting with homepage options)
- Implementing OTP/SMS via Twilio
- Syncing with HubSpot
- Setting up authentication

**Both teams should:**
- Agree on API base URL for development
- Test endpoints together before scaling
- Document any response format changes
- Maintain this structure for consistency

---

## 📞 INTEGRATION HANDOFF

**Ready for:** Codex developer to begin backend API implementation

**Next Review:** Once Codex provides first API endpoint (GET /api/homepage/options)

**Questions?** Refer to:
- SETUP_GUIDE.md for integration steps
- HomePage.jsx comments for component logic
- homepageAPI.js for API call patterns

---

**Document Version:** 1.0  
**Created:** May 14, 2026  
**Status:** Complete & Ready for Integration  
**Prepared by:** Claude (Frontend)  
**For:** Codex (Backend)
