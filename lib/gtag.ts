// Google Analytics 4 Event Tracking Helper

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "set",
      actionOrTargetId: string,
      config?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: any;
      }
    ) => void;
    dataLayer?: any[];
  }
}

export const sendGAEvent = (
  action: string,
  category: string,
  label: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
