/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // OS surface
        paper:           "#FBFAF6",
        "os-bg":         "#EEF0EA",
        "os-bg-deep":    "#E1E5DA",
        "os-grid":       "#D7DBD2",
        "os-chrome":     "#E7E8E1",
        // Text
        charcoal:        "#102033",
        ink:             "#667085",
        muted:           "#98A2B3",
        // Surface
        "surface-soft":  "#F6F7F1",
        "surface-white": "#FFFDF7",
        // Borders / lines
        line:            "#CCD1C5",
        // Brand
        navy:            "#082B4C",
        "brand-green":   "#16A34A",
        // Action
        "action-primary":"#0B5FFF",
        "action-hover":  "#0847C2",
        // Button
        "btn-charcoal":  "#1F2328",
        "btn-charcoal-h":"#111827",
        // State
        success:         "#22C55E",
        warning:         "#F59E0B",
        danger:          "#DC2626",
        info:            "#0EA5E9",
        // App: CRM
        "crm":           "#2563EB",
        "crm-deep":      "#1E3A8A",
        "crm-soft":      "#DBEAFE",
        "crm-graph":     "#60A5FA",
        // App: Cocina
        "cocina":        "#B91C1C",
        "cocina-deep":   "#7F1D1D",
        "cocina-soft":   "#FEE2E2",
        "cocina-accent": "#FB7185",
        // App: Clínica
        "clinica":       "#0F766E",
        "clinica-deep":  "#134E4A",
        "clinica-soft":  "#CCFBF1",
        "clinica-accent":"#38BDF8",
        // App: Operación
        "ops":           "#334155",
        "ops-deep":      "#0F172A",
        "ops-soft":      "#E2E8F0",
        "ops-alert":     "#F59E0B",
        // Legacy aliases (keep for existing JSX)
        indigo:          "#2563EB",
        "indigo-soft":   "#DBEAFE",
        ember:           "#B91C1C",
        "ember-soft":    "#FEE2E2",
        teal:            "#0F766E",
        "teal-soft":     "#CCFBF1",
        slate:           "#334155",
        // Mac traffic lights
        "green-sys":     "#28C840",
        "amber-sys":     "#FEBC2E",
        "red-sys":       "#FF5F57",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        window:      "0 24px 80px rgba(16,32,51,0.16)",
        panel:       "0 12px 36px rgba(16,32,51,0.10)",
        card:        "0 6px 24px rgba(16,32,51,0.09)",
        "card-hover":"0 12px 40px rgba(16,32,51,0.15)",
        system:      "0 18px 50px rgba(16,32,51,0.08)",
        icon:        "0 14px 32px rgba(16,32,51,0.18), inset 0 1px 0 rgba(255,255,255,0.55)",
      },
    },
  },
  plugins: [],
};
