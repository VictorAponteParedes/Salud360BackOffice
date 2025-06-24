export const RoutesView = {
  //patient
  patients: "/patients/list",
  patientDetail: "patients/:id",
  createPatient: "/patients/create",

  //doctor
  doctors: "/doctors/list",
  createDoctor: "/doctors/create",

  //appoitment
  appointmentList: "/appointment/list",
  appointmentCreate: "/appointment/create",

  //hospital
  hospitals: "/hospitals",
  listHospital: 'hospitalList',
  hospitalDetail: "hospitals/:id",

  //analysis
  analysis: "/analysis/create",
  analysisList: "/analysis/list",

  usersRoles: "/users-roles",
  notifications: "/notifications",
  reports: "/reports",
  settings: "/settings",
  dashboard: "/",

  //Auth
  login: "/auth/login",
  forgotPassword: "/auth/forgotPassword",
  verifyCode: "/auth/verifyCode",


  languages: "/languages",

  //Specialties
  specialties: "/specialties",
};