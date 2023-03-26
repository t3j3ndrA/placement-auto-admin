export const handleAddCP = (e, roleIndex, rolesWatch, setValue) => {
  e.preventDefault();

  let newCP = {
    platform: "",
    stars: 0,
    ratings: 0,
  };

  let roles = rolesWatch;
  roles[roleIndex]?.requirements.competitiveCoding.push(newCP);
  console.log("added cp ", roles[roleIndex]);
  setValue("roles", roles);
};

export const handleRemoveCP = (e, roleIndex, cpIndex, rolesWatch, setValue) => {
  e.preventDefault();

  let competitiveCoding = rolesWatch[
    roleIndex
  ].requirements.competitiveCoding.filter((cpItem, index) => index !== cpIndex);

  let roles = rolesWatch;
  roles[roleIndex].requirements.competitiveCoding = competitiveCoding;
  setValue("roles", roles);
};
