export default (menuitem, selectedAllergies) => {
  const filteredAllergytypes = menuitem.allergytypes.filter(
    (allergytype) =>
      allergytype.allergyId in selectedAllergies &&
      selectedAllergies[allergytype.allergyId].selected
  );
  const data = {
    meetsRestrictions: [],
    modifiable: [],
    crossContact: [],
  };
  for (const allergytype of filteredAllergytypes) {
    console.log(allergytype);
    const [first, ...last] = allergytype.allergy.name;
    const allergyName = `${first.toUpperCase()}${last.join("")}`;
    if (allergytype.type === "Safe" && !allergytype.cross) {
      data.meetsRestrictions.push({ allergy: allergyName });
    } else if (allergytype.type === "Safe" && allergytype.cross) {
      data.meetsRestrictions.push({
        allergy: `${allergyName} (Cross Contact Warning)`,
      });
      let crossDescription = allergytype.crossDescripti;
      if (allergytype.crossMod) {
        crossDescription += allergytype.crossModDescri;
      }
      data.crossContact.push({
        allergy: allergyName,
        description: crossDescription,
      });
    } else if (allergytype.type === "Modifiable" && !allergytype.cross) {
      data.modifiable.push({
        allergy: allergyName,
        description: allergytype.modDescription,
      });
    } else if (allergytype.type === "Modifiable" && allergytype.cross) {
      data.modifiable.push({
        allergy: allergyName,
        description: `${allergytype.modDescription} (Cross Contact Warning)`,
      });
      let crossDescription = allergytype.crossDescripti;
      if (allergytype.crossMod) {
        crossDescription += allergytype.crossModDescri;
      }
      data.crossContact.push({
        allergy: allergyName,
        description: crossDescription,
      });
    }
  }
  return data;
};
