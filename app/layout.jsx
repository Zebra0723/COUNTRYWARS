import "./globals.css";

export const metadata = {
  title: "Deuce — ATP/WTA Tour Tracker & Ranking Lab",
  description:
    "Follow the ATP & WTA top 100 and see exactly what every result means for the rankings.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
