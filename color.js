const PALETTES = {
  rose: {
    name: "Rose",
    colors: ["#C06C84", "#F67280", "#F8B195", "#355C7D", "#6C5B7B"],
    refs: [
      { label: "Stationery inspiration (placeholder)", href: "#" },
      { label: "Floral inspiration (placeholder)", href: "#" },
      { label: "Typography pairing (placeholder)", href: "#" },
      { label: "Table decor moodboard (placeholder)", href: "#" },
    ],
  },
  sage: {
    name: "Sage",
    colors: ["#A3B18A", "#DAD7CD", "#588157", "#3A5A40", "#344E41"],
    refs: [
      { label: "Sage/neutral invitation ideas (placeholder)", href: "#" },
      { label: "Greenery decor references (placeholder)", href: "#" },
      { label: "Minimalist layout examples (placeholder)", href: "#" },
    ],
  },
  navy: {
    name: "Navy",
    colors: ["#0B1320", "#1C2541", "#3A506B", "#5BC0BE", "#F4F1DE"],
    refs: [
      { label: "Navy + teal palette examples (placeholder)", href: "#" },
      { label: "Elegant dark theme invitations (placeholder)", href: "#" },
      { label: "Button/CTA design references (placeholder)", href: "#" },
    ],
  },
  champagne: {
    name: "Champagne",
    colors: ["#F7E7CE", "#EAD2AC", "#C9A227", "#5D4037", "#FAF3E0"],
    refs: [
      { label: "Warm neutral wedding palettes (placeholder)", href: "#" },
      { label: "Gold foil stationery ideas (placeholder)", href: "#" },
      { label: "Candlelit decor moodboard (placeholder)", href: "#" },
    ],
  },
  lavender: {
    name: "Lavender",
    colors: ["#CDB4DB", "#FFC8DD", "#FFAFCC", "#BDE0FE", "#A2D2FF"],
    refs: [
      { label: "Pastel palette invitations (placeholder)", href: "#" },
      { label: "Lavender floral inspiration (placeholder)", href: "#" },
      { label: "Soft gradients UI references (placeholder)", href: "#" },
    ],
  },
};

function getPaletteKey() {
  const params = new URLSearchParams(window.location.search);
  return params.get("palette") || "rose";
}

const key = getPaletteKey();
const palette = PALETTES[key] || PALETTES.rose;

document.getElementById("paletteName").textContent = palette.name;

const swatchesEl = document.getElementById("swatches");
palette.colors.forEach((hex) => {
  const d = document.createElement("div");
  d.className = "swatch";
  d.style.background = hex;
  d.title = hex;
  swatchesEl.appendChild(d);
});

document.getElementById("hexList").textContent = palette.colors.join("  •  ");

const refsEl = document.getElementById("refs");
palette.refs.forEach((r) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = r.href;
  a.textContent = r.label;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  li.appendChild(a);
  refsEl.appendChild(li);
});
