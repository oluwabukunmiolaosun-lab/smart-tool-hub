const picker = document.getElementById("picker");
const preview = document.getElementById("preview");
const hex = document.getElementById("hex");
const rgb = document.getElementById("rgb");
const hsl = document.getElementById("hsl");

function hexToRgb(hexColor) {
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    return { r, g, b };
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;

        s = l > 0.5
            ? d / (2 - max - min)
            : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;

            case g:
                h = (b - r) / d + 2;
                break;

            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function updateColor() {

    const color = picker.value;

    preview.style.background = color;

    hex.value = color;

    const rgbValue = hexToRgb(color);

    rgb.value = `rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`;

    const hslValue = rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b);

    hsl.value = `hsl(${hslValue.h}, ${hslValue.s}%, ${hslValue.l}%)`;
}

picker.addEventListener("input", updateColor);

updateColor();

function copyHex() {

    navigator.clipboard.writeText(hex.value);

    alert("HEX code copied successfully!");
}
