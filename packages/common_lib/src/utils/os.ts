export const detectOS = () => {
  if ((navigator as any).userAgentData) {
    const platform = (navigator as any).userAgentData.platform.toLowerCase();
    if (platform.includes("mac")) {
      return "mac";
    } else if (platform.includes("win")) {
      return "windows";
    } else {
      return "other";
    }
  } else {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("mac")) {
      return "mac";
    } else if (userAgent.includes("win")) {
      return "windows";
    } else {
      return "other";
    }
  }
};
