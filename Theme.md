## 🎨 Color Tokens (use with `bg-*`, `text-*`, `border-*`, `fill-*`, `stroke-*`)

| Token | CSS value |
|-------|-----------|
| davy-gray | #50514F |
| davy-gray-subtle | #3F3F3E |
| davy-gray-highlight | #666765 |
| maize | #FFED65 |
| maize-subtle | #E6D23E |
| maize-highlight | #FFF289 |
| aero | #41BBD9 |
| aero-subtle | #359FB7 |
| aero-highlight | #6CD5EA |
| slate-blue | #7D53DE |
| slate-blue-subtle | #693BC2 |
| slate-blue-highlight | #9678E4 |
| ghost-white | #FAFAFF |
| ghost-white-subtle | #E6E6F2 |
| ghost-white-highlight | #FFFFFF |
| glass-light | rgba(255,255,255,0.1) |
| glass-dark | rgba(0,0,0,0.3) |
| dark (bg only) | #010308 |

**Example**  
```html
<div class="bg-maize text-davy-gray p-4 rounded">Color example</div>
```

---

## 💡 Box-Shadow (Glow) Utilities

| Class | Box-shadow value |
|-------|-----------------|
| shadow-glow-maize | 0 0 8px #FFED65aa, 0 0 16px #FFED6555 |
| shadow-glow-maize-subtle | 0 0 4px #E6D23Eaa, 0 0 8px #E6D23E55 |
| shadow-glow-maize-highlight | 0 0 12px #FFF289aa, 0 0 24px #FFF28955 |
| shadow-glow-aero | 0 0 8px #41BBD9aa, 0 0 16px #41BBD955 |
| shadow-glow-aero-subtle | 0 0 4px #359FB7aa, 0 0 8px #359FB755 |
| shadow-glow-aero-highlight | 0 0 12px #6CD5EAaa, 0 0 24px #6CD5EA55 |
| shadow-glow-slate-blue | 0 0 8px #7D53DEaa, 0 0 16px #7D53DE55 |
| shadow-glow-slate-blue-subtle | 0 0 4px #693BC2aa, 0 0 8px #693BC255 |
| shadow-glow-slate-blue-highlight | 0 0 12px #9678E4aa, 0 0 24px #9678E455 |
| shadow-glow-glass-light | 0 0 8px rgba(255,255,255,0.1) 0 0 16px rgba(255,255,255,0.1) |
| shadow-glow-glass-dark | 0 0 8px rgba(0,0,0,0.3) 0 0 16px rgba(0,0,0,0.3) |

*Add `-inset` to any glow class for an inset variant.*

**Example**  
```html
<button class="shadow-glow-aero hover:shadow-glow-aero-highlight px-4 py-2 rounded">Glow button</button>
```

---

## 🔲 Outline Utilities

| Class | CSS value |
|-------|-----------|
| outline-davy-gray | 2px solid #50514F |
| outline-davy-gray-subtle | 2px solid #3F3F3E |
| outline-davy-gray-highlight | 2px solid #666765 |
| outline-maize | 2px solid #FFED65 |
| outline-maize-subtle | 2px solid #E6D23E |
| outline-maize-highlight | 2px solid #FFF289 |
| outline-aero | 2px solid #41BBD9 |
| outline-aero-subtle | 2px solid #359FB7 |
| outline-aero-highlight | 2px solid #6CD5EA |
| outline-slate-blue | 2px solid #7D53DE |
| outline-slate-blue-subtle | 2px solid #693BC2 |
| outline-slate-blue-highlight | 2px solid #9678E4 |
| outline-ghost-white | 2px solid #FAFAFF |
| outline-ghost-white-subtle | 2px solid #E6E6F2 |
| outline-ghost-white-highlight | 2px solid #FFFFFF |

**Example**  
```html
<input class="outline-none focus:outline-maize-highlight p-2 rounded" placeholder="Outlined on focus" />
```
---

## 🌫️ Glass & Blur Utilities

| Utility | CSS value |
|---------|-----------|
| bg-glass-light | rgba(255,255,255,0.1) |
| bg-glass-dark | rgba(0,0,0,0.3) |
| backdrop-blur-xs | backdrop-filter: blur(2px) |
| backdrop-blur-sm | backdrop-filter: blur(5px) |
| backdrop-blur-md | backdrop-filter: blur(10px) |

**Example**  
```html
<div class="bg-glass-light backdrop-blur-md p-4 rounded-lg">Glass panel</div>`
```

---

## 🚀 Combined Example
```html
<article class="max-w-sm mx-auto p-6
               bg-davy-gray text-ghost-white
               shadow-glow-aero-highlight rounded-lg
               bg-glass-dark backdrop-blur-sm
               border border-maize-subtle
               hover:shadow-glow-maize
               transition-shadow duration-300">
  <h2 class="text-2xl font-bold mb-3">Futuristic Card</h2>
  <p class="mb-4">Combining all your custom Tailwind utilities.</p>
  <button class="btn-primary">Activate</button>
</article>
```
```css
/* CSS (with @apply) */
.btn-primary {
  @apply px-4 py-2 transition duration-200
         text-maize-subtle bg-davy-gray
         border border-maize-subtle
         shadow-glow-maize-highlight
         hover:shadow-glow-maize-inset;
}
```