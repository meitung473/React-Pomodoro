export const theme = {
    primary: {
        Default: "hsl(174, 42%, 65%,1)",
        Dark: "hsl(175, 32%, 46%,1)",
        Tint: "hsl(174, 79%, 76%,1)",
    },
    secondary: {
        Default: "hsl(262, 47%, 55%,1)",
        Tint: "hsl(263, 85%, 74%,1)",
    },
    Warn: {
        active: "hsl(34, 100%, 50%,1)",
        inactive: "hsl(0, 0%, 88%,1)",
    },
    text: {
        light: "hsl(0, 0%, 76%,1)",
        dark: "hsl(0, 1%, 20%,1)",
    },
    greyscale: createGreyscale(10),
};

/**
 * 產生 0 - 1000 的灰階
 * @param {Number} scaleoffset
 * @returns 回傳物件  black_ 0~1000
 */
function createGreyscale(scaleoffset) {
    let b = "hsla(0, 0%, {x}%, 1)";
    return Array.from({ length: scaleoffset + 1 }).reduce((p, n, i) => {
        let key = `black_${(scaleoffset - i) * 100}`;
        n = b.replace("{x}", i * 10);
        p[key] = n;
        return p;
    }, {});
}
/**
 * color opacity
 * @param {String} color hsla
 * @param {Number} opacity 0 ~ 1
 * @returns
 */
export function adjustOpacity(color, opacity) {
    return color.replace(/(\d.?)\)$/, `${opacity})`);
}
