import "./globals.css";

export const metadata = {
  title: "Deuce — ATP/WTA Tour Tracker & Ranking Lab",
  description:
    "Follow the ATP & WTA top 100 and see exactly what every result means for the rankings.",
};

// Set the theme before first paint to avoid a flash. Defaults to light,
// respecting a saved choice or the OS preference.
const themeScript = `(function(){try{var t=localStorage.getItem('deuce.theme');if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
