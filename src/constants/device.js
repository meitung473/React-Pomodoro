/**
 * for meadia query stuff
 */
export const sizes = {
    xxl: 1440,
    xl: 996,
    md: 768,
    sm: 576,
};
//
const prefix = "@media screen and (min-width: {size}px)";

/**
 * combine size and string
 * br = {size : prefix + size}
 */
export const br = Object.keys(sizes).reduce((p, n) => {
    p[n] = prefix.replace("{size}", sizes[n]);
    return p;
}, {});
