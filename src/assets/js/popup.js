export function createPopupWin(
  pageURL,
  pageTitle,
  popupWinWidth,
  popupWinHeight
) {
  const left = (screen.width - popupWinWidth) / 2;
  const top = (screen.height - popupWinHeight) / 4;

  window.open(
    pageURL,
    pageTitle,
    "resizable=yes, width=" +
      popupWinWidth +
      ", height=" +
      popupWinHeight +
      ", top=" +
      top +
      ", left=" +
      left
  );
}
