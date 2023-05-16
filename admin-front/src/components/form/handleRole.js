export const handleAddRole = (e, rolesWatch, setValue) => {
  e.preventDefault();
  let role = {
    name: "",
    avgPackage: 0,
    type: "",
    mode: "",
    bonds: 0,
    deadline: "",
    interviewDate: "",
    interviewMode: "",
    requirements: {
      cpi: 0,
      twelfthPerc: 0,
      competitiveCoding: [],
      expectedSkills: "",
    },
  };
  let roles = rolesWatch;

  roles.push(role);
  setValue("roles", roles);
};

export const handleRemoveRole = (e, roleIndex, rolesWatch, setValue) => {
  e.preventDefault();

  let roles = rolesWatch;
  roles = roles.filter((role, index) => index !== roleIndex);
  setValue("roles", roles);
};
