/* eslint-disable-next-line */
const clone = (original: any) => {
    return JSON.parse(JSON.stringify(original));
}
export default clone;