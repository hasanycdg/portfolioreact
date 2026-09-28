// Single source for the legal pages.
export const legal = {
  name: "Hasan Yücedag",
  city: "6020 Innsbruck",
  country: "Österreich",
  email: "yucedagh1@gmail.com",
  phone: "+43 660 2499111",
  business: "Webdesign, Web- und Softwareentwicklung",
  // Trade licence details (Gewerbe). null = no trade licence, section is hidden.
  trade: null as { licence: string; gisa: string; authority: string; chamber: string } | null,
  // UID number, if one has been issued.
  vatId: null as string | null,
  updated: "September 2026",
};
