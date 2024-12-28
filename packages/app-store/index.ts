const appStore = {
  // example: () => import("./example"),
  googlecalendar: () => import("./googlecalendar"),
  googlevideo: () => import("./googlevideo"),
  zoomvideo: () => import("./zoomvideo"),
};

const exportedAppStore: typeof appStore & {
  ["mock-payment-app"]?: () => Promise<typeof import("./mock-payment-app/index")>;
} = appStore;

if (process.env.MOCK_PAYMENT_APP_ENABLED !== undefined) {
  exportedAppStore["mock-payment-app"] = () => import("./mock-payment-app/index");
}

export default exportedAppStore;
