export default (menuitems, selectedAllergies) => {
  const safe = new Set();
  const mod = new Set();
  const cross = new Set();
  const unsafe = new Set();
  menuitems.forEach((menuitem) => {
    for (const allergytype of menuitem.allergytypes) {
      if (
        allergytype.allergyId in selectedAllergies &&
        selectedAllergies[allergytype.allergyId].selected &&
        allergytype.type === "Unsafe"
      ) {
        unsafe.add(menuitem.id);
        break;
      }
      if (
        allergytype.type === "Safe" ||
        !(allergytype.allergyId in selectedAllergies)
      ) {
        safe.add(menuitem.id);
      }
      if (allergytype.type === "Modifiable") {
        if (
          allergytype.allergyId in selectedAllergies &&
          selectedAllergies[allergytype.allergyId].selected
        ) {
          mod.add(menuitem.id);
        } else {
          safe.add(menuitem.id);
        }
      }
      if (allergytype.cross) {
        if (
          allergytype.allergyId in selectedAllergies &&
          selectedAllergies[allergytype.allergyId].selected
        ) {
          cross.add(menuitem.id);
          if (selectedAllergies[allergytype.allergyId].cross) {
            if (allergytype.crossMod) {
              mod.add(menuitem.id);
            } else {
              unsafe.add(menuitem.id);
            }
          }
        }
      }
    }
  });

  // const safeMenuitems = menuitems.filter(
  //   (menuitem) =>
  //     safe.has(menuitem.id) &&
  //     !unsafe.has(menuitem.id) &&
  //     !mod.has(menuitem.id) &&
  //     !cross.has(menuitem.id)
  // );
  // const modMenuitems = menuitems.filter(
  //   (menuitem) =>
  //     (cross.has(menuitem.id) && !unsafe.has(menuitem.id)) ||
  //     (mod.has(menuitem.id) && !unsafe.has(menuitem.id))
  // );

  const filteredMenuitems = [];
  menuitems.forEach((menuitem) => {
    if (
      safe.has(menuitem.id) &&
      !unsafe.has(menuitem.id) &&
      !mod.has(menuitem.id) &&
      !cross.has(menuitem.id)
    ) {
      filteredMenuitems.push({ type: "Safe", menuitem });
    } else if (
      (cross.has(menuitem.id) && !unsafe.has(menuitem.id)) ||
      (mod.has(menuitem.id) && !unsafe.has(menuitem.id))
    ) {
      filteredMenuitems.push({ type: "Mod", menuitem });
    }
  });
  return filteredMenuitems;
};
