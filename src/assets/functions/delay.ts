import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";

const setDelay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const setNormalDelay = () => setDelay(DELAY_IN_MS)

const setShortDelay = () => setDelay(SHORT_DELAY_IN_MS)

export default setDelay;
export { setNormalDelay, setShortDelay };
