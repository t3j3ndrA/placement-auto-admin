export const newCompanyStarter = {
  name: "",
  website: "",
  email: "",
  forBatch: new Date().getFullYear(),
  description: "",
  address: {
    city: "",
    district: "",
    state: "",
    postalCode: 0,
    completeAddress: "",
  },
  roles: [
    {
      name: "",
      avgPackage: 0.0,
      type: "full-time",
      mode: "on-site",
      bonds: 0.0,
      deadline: "",
      interviewDate: "",
      interviewMode: "",
      requirements: {
        cpi: 0.0,
        twelfthPerc: 0.0,
        tenthPerc: 0.0,
        diplomaPerc: 0.0,
        competitiveCoding: [],
        expectedSkills: "",
      },
    },
  ],
};
