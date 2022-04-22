const assert = require("assert");

const filterMenuItems = (menuitems, selectedAllergies) => {
  const safe = new Set();
  const mod = new Set();
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
  const safeMenuitems = menuitems.filter(
    (menuitem) =>
      safe.has(menuitem.id) && !unsafe.has(menuitem.id) && !mod.has(menuitem.id)
  );
  const modMenuitems = menuitems.filter(
    (menuitem) => mod.has(menuitem.id) && !unsafe.has(menuitem.id)
  );
  return { safeMenuitems, modMenuitems };
};

describe("RegExp keyword matching", () => {
  it("All menuitems safe when allergytypes are all safe", async () => {
    const menuitems = [
      {
        id: "0",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
      {
        id: "1",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
      {
        id: "2",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
    ];
    const selectedAllergies = {
      0: { selected: true, cross: false },
      1: { selected: true, cross: false },
      2: { selected: true, cross: false },
    };
    const { safeMenuitems, modMenuitems } = filterMenuItems(
      menuitems,
      selectedAllergies
    );

    assert.deepEqual(
      safeMenuitems.map(({ id }) => id),
      ["0", "1", "2"]
    );
    assert.equal(modMenuitems.length, 0);
  });
  it("Modifiable menuitems are in mod and removed from safe", async () => {
    const menuitems = [
      {
        id: "0",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Modifiable",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
      {
        id: "1",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
      {
        id: "2",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
    ];
    const selectedAllergies = {
      0: { selected: true, cross: false },
      1: { selected: true, cross: false },
      2: { selected: true, cross: false },
    };
    const { safeMenuitems, modMenuitems } = filterMenuItems(
      menuitems,
      selectedAllergies
    );

    assert.deepEqual(
      safeMenuitems.map(({ id }) => id),
      ["1", "2"]
    );
    assert.deepEqual(
      modMenuitems.map(({ id }) => id),
      ["0"]
    );
  });
  it("Unsafe menuitems are not in safe or mod", async () => {
    const menuitems = [
      {
        id: "0",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Unsafe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
      {
        id: "1",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
      {
        id: "2",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
    ];
    const selectedAllergies = {
      0: { selected: true, cross: false },
      1: { selected: true, cross: false },
      2: { selected: true, cross: false },
    };
    const { safeMenuitems, modMenuitems } = filterMenuItems(
      menuitems,
      selectedAllergies
    );

    assert.deepEqual(
      safeMenuitems.map(({ id }) => id),
      ["1", "2"]
    );
    assert.equal(modMenuitems.length, 0);
  });
  it("Unsafe menuitems are safe if not in selected allergies", async () => {
    const menuitems = [
      {
        id: "0",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Unsafe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
      {
        id: "1",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
      {
        id: "2",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
    ];
    const selectedAllergies = {
      0: { selected: false, cross: false },
      1: { selected: true, cross: false },
      2: { selected: true, cross: false },
    };
    const { safeMenuitems, modMenuitems } = filterMenuItems(
      menuitems,
      selectedAllergies
    );

    assert.deepEqual(
      safeMenuitems.map(({ id }) => id),
      ["0", "1", "2"]
    );
    assert.equal(modMenuitems.length, 0);
  });
  it("Cross contaminated menuitems are safe if not sensitive", async () => {
    const menuitems = [
      {
        id: "0",
        allergytypes: [
          {
            allergyId: "0",
            cross: true,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
      {
        id: "1",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
      {
        id: "2",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
    ];
    const selectedAllergies = {
      0: { selected: true, cross: false },
      1: { selected: true, cross: false },
      2: { selected: true, cross: false },
    };
    const { safeMenuitems, modMenuitems } = filterMenuItems(
      menuitems,
      selectedAllergies
    );

    assert.deepEqual(
      safeMenuitems.map(({ id }) => id),
      ["0", "1", "2"]
    );
    assert.equal(modMenuitems.length, 0);
  });
  it("Cross contaminated menuitems are unsafe if sensitive", async () => {
    const menuitems = [
      {
        id: "0",
        allergytypes: [
          {
            allergyId: "0",
            cross: true,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
      {
        id: "1",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
      {
        id: "2",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
    ];
    const selectedAllergies = {
      0: { selected: true, cross: true },
      1: { selected: true, cross: false },
      2: { selected: true, cross: false },
    };
    const { safeMenuitems, modMenuitems } = filterMenuItems(
      menuitems,
      selectedAllergies
    );

    assert.deepEqual(
      safeMenuitems.map(({ id }) => id),
      ["1", "2"]
    );
    assert.equal(modMenuitems.length, 0);
  });
  it("Cross contaminated menuitems are modifiable if sensitive and cross modifiable", async () => {
    const menuitems = [
      {
        id: "0",
        allergytypes: [
          {
            allergyId: "0",
            cross: true,
            crossMod: true,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
      {
        id: "1",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
      {
        id: "2",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
    ];
    const selectedAllergies = {
      0: { selected: true, cross: true },
      1: { selected: true, cross: false },
      2: { selected: true, cross: false },
    };
    const { safeMenuitems, modMenuitems } = filterMenuItems(
      menuitems,
      selectedAllergies
    );

    assert.deepEqual(
      safeMenuitems.map(({ id }) => id),
      ["1", "2"]
    );
    assert.deepEqual(
      modMenuitems.map(({ id }) => id),
      ["0"]
    );
  });
  it("Cross contaminated menuitems are modifiable if sensitive and cross modifiable", async () => {
    const menuitems = [
      {
        id: "0",
        allergytypes: [
          {
            allergyId: "0",
            cross: true,
            crossMod: true,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Modifiable",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Unsafe",
          },
        ],
      },
      {
        id: "1",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Unsafe",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
        ],
      },
      {
        id: "2",
        allergytypes: [
          {
            allergyId: "0",
            cross: false,
            crossMod: false,
            type: "Safe",
          },
          {
            allergyId: "1",
            cross: false,
            crossMod: false,
            type: "Modifiable",
          },
          {
            allergyId: "2",
            cross: false,
            crossMod: false,
            type: "Modifiable",
          },
        ],
      },
    ];
    const selectedAllergies = {
      0: { selected: true, cross: true },
      1: { selected: true, cross: false },
      2: { selected: true, cross: false },
    };
    const { safeMenuitems, modMenuitems } = filterMenuItems(
      menuitems,
      selectedAllergies
    );

    assert.equal(safeMenuitems.length, 0);
    assert.deepEqual(
      modMenuitems.map(({ id }) => id),
      ["2"]
    );
  });
});
