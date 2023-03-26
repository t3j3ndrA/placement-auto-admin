export const handleAddCP = (e, cpWatch, setValue) => {
  e.preventDefault();

  let newCP = {
    platform: "",
    stars: 0,
    ratings: 0,
  };
  let cps = cpWatch;
  cps.push(newCP);
  setValue("competitiveCoding", cps);
};

export const handleRemoveCP = (e, cpIndex, cpWatch, setValue) => {
  e.preventDefault();

  let newCps = cpWatch.filter((cpItem, index) => index !== cpIndex);
  setValue("competitiveCoding", newCps);
};
