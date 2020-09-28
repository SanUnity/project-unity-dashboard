const TYPE = {
  MOBILE: "mobile",
  PHABLET: "phablet",
  TABLET: "tablet",
  WEB: "web"
};
const DisplayType = width => {
  if (width < 550) {
    return TYPE.MOBILE;
  } else if (width >= 550 && width < 768) {
    return TYPE.PHABLET;
  } else if (width >= 768 && width < 1100) {
    return TYPE.TABLET;
  } else {
    return TYPE.WEB;
  }
};
const isMobile = () => {
  return DisplayType(window.innerWidth) !== TYPE.WEB;
};

const isTablet = () => {
  return DisplayType(window.innerWidth) === TYPE.TABLET;
}

export default { TYPE, DisplayType, isMobile, isTablet };