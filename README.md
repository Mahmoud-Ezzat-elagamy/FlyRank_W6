# Interactive Motion State Demonstration

A modern React + Motion (`motion/react`) application built with Vite and Tailwind CSS showcasing production-grade micro-interactions, state transitions, and staggered animations.

🌐 **Live Demo**: [https://Mahmoud-Ezzat-elagamy.github.io/FlyRank_W6/](https://Mahmoud-Ezzat-elagamy.github.io/FlyRank_W6/)

---

## 🎭 UI & Interaction States Explained

The application illustrates how to orchestrate complex UI states cleanly using Motion:

```
[ Entrance ] ──> [ Idle ] ──┬── [ Hover / Focus / Tap ]
                            ├── [ Loading ]
                            └── [ Error State ] ──> [ Generate Again ]
                                      │
                                  [ Success ]
                                      │
                                      ▼
                           [ Staggered Numbers ]
```

### 1. Entrance State (`initial` & `animate`)
* **Trigger**: Component mounting on initial page load.
* **Behavior**: Starts invisible and offset (`opacity: 0, y: 30, scale: 0.85`) and transitions smoothly to its resting position (`opacity: 1, y: 0, scale: 1`) using a custom cubic-bezier easing curve `[0.16, 1, 0.3, 1]`.
* **Design Rationale**: By isolating the entrance on the component itself and driving event animations through `useAnimate`, the entrance animation executes **only once** on load and never re-triggers unexpectedly during subsequent state changes.

### 2. Idle State
* **Appearance**: Vibrant cyan-to-blue gradient (`bg-linear-to-r from-cyan-500 to-blue-600`), readable white typography, rounded container card.
* **Label**: `"generate nums"`

### 3. Hover & Focus States
* **Hover (`whileHover`)**: Smoothly scales up to `1.05x` to invite click interaction.
* **Focus (`whileFocus`)**: Scales to `1.05x` with an accessible green focus ring (`boxShadow: 0 0 0 4px rgba(34, 197, 94, 0.3)`), ensuring keyboard accessibility (Tab navigation).
* **Tap / Press (`whileTap`)**: Compresses slightly to `0.95x` to mimic physical button tactile feedback.

### 4. Loading State (`disabled={loading}`)
* **Trigger**: User clicks "generate nums" while awaiting the simulated network response (1600ms).
* **Behavior**:
  - Button is disabled (`disabled={loading}`) to prevent race conditions or double submissions.
  - Hover and tap scale animations are disabled.
  - Reduced opacity (`opacity: 50%`) with `cursor-not-allowed`.
  - Button text updates to `"generating..."`.

### 5. Error State (Network Failure Simulation)
* **Trigger**: When the "Simulate network error" trigger is checked and generation fails.
* **Behavior**:
  - **Vibration Motion**: Button executes an imperative horizontal shake on the X-axis (`x: [0, -10, 10, -8, 8, -6, 6, -3, 3, 0]`) over 1 second via Motion's `useAnimate` hook.
  - **Danger Color**: Transitions to danger red/rose (`bg-rose-600 shadow-rose-600/30`).
  - **Call to Action**: Label updates to `"generate again"`.
  - **Feedback Box**: Displays the error message in the output container.

### 6. Success & Staggered Sequence State
* **Trigger**: Successful array resolution.
* **Behavior**: The numbers appear inside the container sequentially rather than all at once.
  - Parent container uses `transition: { staggerChildren: 0.08 }`.
  - Each number pill springs up from `opacity: 0, scale: 0.5, y: 15` to full size and opacity with an 80ms delay between items.
  - `key={JSON.stringify(data)}` ensures the stagger effect replays cleanly on every new generation.

---

## 🚀 How to Deploy to GitHub Pages

### Automatic Deployment via GitHub Actions (Recommended)

This repository includes a preconfigured workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. **Commit and Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: setup MotionTest and GitHub Pages deployment"
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages in your Repository Settings**:
   - Go to your repository on GitHub: `https://github.com/Mahmoud-Ezzat-elagamy/FlyRank_W6`
   - Click **Settings** (tab on top) → **Pages** (in the left sidebar under *Code and automation*).
   - Under **Build and deployment** → **Source**, select:
     👉 **GitHub Actions**
   - That's it! Every time you push to `main`, GitHub Actions will build and deploy the site automatically.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```
