// FIXME: check if e is a browser event?
const interactWithValue = fn => e => e && fn && fn(e.target.value);
export default interactWithValue;
