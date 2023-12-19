export const partyVotesData = [
  {
    year: "1996",
    candidate: ["A", "B", "C"],
    values: [500, 400, 300],
    color: ["fill-role-blue", "fill-role-orange", "fill-role-green"],
  },
  {
    year: "2000",
    candidate: ["A", "B", "C"],
    values: [300, 200, 100],
    color: ["fill-role-blue", "fill-role-orange", "fill-role-green"],
  },
  {
    year: "2004",
    candidate: ["A", "B", "C"],
    values: [400, 300, 300],
    color: ["fill-role-blue", "fill-role-orange", "fill-role-green"],
  },
  {
    year: "2008",
    candidate: ["A", "B", "C"],
    values: [600, 100, 500],
    color: ["fill-role-blue", "fill-role-orange", "fill-role-green"],
  },
  {
    year: "2016",
    candidate: ["A", "B", "C"],
    values: [400, 200, 500],
    color: ["fill-role-blue", "fill-role-orange", "fill-role-green"],
  },
  {
    year: "2020",
    candidate: ["A", "B", "C"],
    values: [400, 300, 400],
    color: ["fill-role-blue", "fill-role-orange", "fill-role-green"],
  },
];

export const lineChartData = [
  {
    candidate: "A",
    values: [
      { year: "1996", value: 42 },
      { year: "2000", value: 30 },
      { year: "2004", value: 20 },
      { year: "2008", value: 34 },
      { year: "2012", value: 49 },
      { year: "2016", value: 32 },
      { year: "2020", value: 25 },
    ],
    fillColor: "fill-role-blue",
    strokeColor: "stroke-role-blue",
  },
  {
    candidate: "B",
    values: [
      { year: "1996", value: 20 },
      { year: "2000", value: 20 },
      { year: "2004", value: 51 },
      { year: "2008", value: 34 },
      { year: "2012", value: 26 },
      { year: "2016", value: 29 },
      { year: "2020", value: 32 },
    ],
    fillColor: "fill-role-orange",
    strokeColor: "stroke-role-orange",
  },
  {
    candidate: "C",
    values: [
      { year: "1996", value: 20 },
      { year: "2000", value: 10 },
      { year: "2004", value: 40 },
      { year: "2008", value: 30 },
      { year: "2012", value: 42 },
      { year: "2016", value: 22 },
      { year: "2020", value: 35 },
    ],
    fillColor: "fill-role-green",
    strokeColor: "stroke-role-green",
  },
];

export const partysData = [
  { name: "蝙蝠黨", color: "bg-role-blue" },
  { name: "弓箭黨", color: "bg-role-orange" },
  { name: "木棍黨", color: "bg-role-green" },
];

export const votesPercentageData = [
  {
    party: "AA黨",
    name: "候選人A",
    value: 50,
    votes: "1111",
    fillColor: "fill-role-blue",
    bgColor: "bg-role-blue",
    image: "./figures/person_vampire_3d_default 1.png",
  },
  {
    party: "BB黨",
    name: "候選人B",
    value: 30,
    votes: "1111",
    fillColor: "fill-role-orange",
    bgColor: "bg-role-orange",
    image: "./figures/man_elf_3d_medium-light 1.png",
  },
  {
    party: "CC黨",
    name: "候選人C",
    value: 20,
    votes: "1111",
    fillColor: "fill-role-green",
    bgColor: "bg-role-green",
    image: "./figures/troll_3d 1.png",
  },
];

export const totalVotes = {
  投票數: 123456789,
  投票率: 66.234,
  有效票數: 123456700,
  無效票數: 89,
};
