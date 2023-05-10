import uniqid from "uniqid";

const isGlobalMenu = [
  {
    id: uniqid(),
    text: "North America",
    submenu: [
      { id: uniqid(), text: "U.S." },
      { id: uniqid(), text: "Canada" },
      { id: uniqid(), text: "Mexico" },
    ],
  },
  {
    id: uniqid(),
    text: "Europe",
    submenu: [
      { id: uniqid(), text: "Germany" },
      { id: uniqid(), text: "France" },
      { id: uniqid(), text: "U.K." },
      { id: uniqid(), text: "Italy" },
      { id: uniqid(), text: "Spain" },
      { id: uniqid(), text: "Rest of Europe" },
    ],
  },
  {
    id: uniqid(),
    text: "Asia Pacific",
    submenu: [
      { id: uniqid(), text: "China" },
      { id: uniqid(), text: "Japan" },
      { id: uniqid(), text: "India" },
      { id: uniqid(), text: "South Korea" },
      { id: uniqid(), text: "South-East Asia " },
      { id: uniqid(), text: "Rest of Asia Pacific" },
    ],
  },
  {
    id: uniqid(),
    text: "Latin America ",
    submenu: [
      { id: uniqid(), text: "Brazil" },
      { id: uniqid(), text: "Argentina" },
      { id: uniqid(), text: "Rest of Latin America" },
    ],
  },
  {
    id: uniqid(),
    text: "The Middle-East and Africa",
    submenu: [
      { id: uniqid(), text: "GCC Countries" },
      { id: uniqid(), text: "South Africa" },
      { id: uniqid(), text: "Rest of Middle-East Africa " },
    ],
  },
];

const isNordic = [
  {
    id: uniqid(),
    text: "North America",
    submenu: [
      { id: uniqid(), text: "U.S." },
      { id: uniqid(), text: "Canada" },
      { id: uniqid(), text: "Mexico" },
      { id: uniqid(), text: "Rest of North America" },
    ],
  },
  {
    id: uniqid(),
    text: "Europe",
    submenu: [
      { id: uniqid(), text: "Germany" },
      { id: uniqid(), text: "France" },
      { id: uniqid(), text: "U.K." },
      { id: uniqid(), text: "Italy" },
      { id: uniqid(), text: "Spain" },
      { id: uniqid(), text: "Rest of Europe" },
    ],
  },
  {
    id: uniqid(),
    text: "Nordic Countries",
    submenu: [
      { id: uniqid(), text: "Denmark" },
      { id: uniqid(), text: "Finland" },
      { id: uniqid(), text: "Iceland" },
      { id: uniqid(), text: "Sweden" },
      { id: uniqid(), text: "Norway" },
    ],
  },
  {
    id: uniqid(),
    text: "Benelux Union",
    submenu: [
      { id: uniqid(), text: "Belgium" },
      { id: uniqid(), text: "The Netherlands" },
      { id: uniqid(), text: "Luxembourg" },
    ],
  },
  {
    id: uniqid(),
    text: "Asia Pacific",
    submenu: [
      { id: uniqid(), text: "China" },
      { id: uniqid(), text: "Japan" },
      { id: uniqid(), text: "India" },
      { id: uniqid(), text: "New Zealand " },
      { id: uniqid(), text: "Australia " },
      { id: uniqid(), text: "South Korea " },
      { id: uniqid(), text: "Rest of Asia Pacific" },
    ],
  },
  {
    id: uniqid(),
    text: "Southeast Asia",
    submenu: [
      { id: uniqid(), text: "Indonesia" },
      { id: uniqid(), text: "Thailand" },
      { id: uniqid(), text: "Malaysia" },
      { id: uniqid(), text: "Singapore" },
    ],
  },
  {
    id: uniqid(),
    text: "Latin America",
    submenu: [
      { id: uniqid(), text: "Brazil" },
      { id: uniqid(), text: "Mexico" },
      { id: uniqid(), text: "Rest of Latin America " },
    ],
  },
  {
    id: uniqid(),
    text: "The Middle-East and Africa",
    submenu: [
      { id: uniqid(), text: "GCC Countries" },
      { id: uniqid(), text: "South Africa" },
      { id: uniqid(), text: "Rest of Middle-East Africa " },
    ],
  },
];

const segmentOptions = ["Main Segment", "Sub Segment"];
const menuOptions = [
  { filename: "March 23 Sample_Report", url: "/March 23 Sample_Report.docx" },
  { filename: "Global Metaverse Market, 2017 - 2032", url: "/SECOND_Sample_Global Metaverse Market, 2017 - 2032.docx" },
];

export { isGlobalMenu, isNordic, segmentOptions, menuOptions };
