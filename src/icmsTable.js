export const icmsTable = {};
const ufs = ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];
const origRules = {
  "AC":19,"AL":19,"AM":20,"AP":18,"BA":20.5,"CE":20,"DF":20,
  "ES":17,"GO":19,"MA":22.5,"MG":18,"MS":17,"MT":17,"PA":19,
  "PB":20,"PR":19.5,"PE":20.5,"PI":22.5,"RN":20,"RS":17,
  "RO":19.5,"RR":20,"SC":17,"SP":18,"SE":20,"TO":20
};
ufs.forEach(orig => {
  icmsTable[orig] = {};
  ufs.forEach(dest => {
    const base = ["GO","MA","MT","MS","PA","PB","PR","PE","PI","RN","RS","RO","RR","SC","SE","TO", "AC","AM","AP","CE","DF","ES"].includes(dest) ? 7 : 12;
    icmsTable[orig][dest] = origRules[orig] || base;
  });
});