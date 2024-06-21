//----------------------------------------------
//user
//----------------------------------------------

export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  discord: string;
  telegram: string;
  allowemailprev: boolean;
  allowemailcancel: boolean;
  allowemailnew: boolean;
}

export interface UserDataCreate {
  name: string;
  email: string;
  password: string;
  discord: string;
  telegram: string;
  allowemailprev: boolean;
  allowemailcancel: boolean;
  allowemailnew: boolean;
  idUser: string;
}

export interface UserDataUpdate {
  name: string;
  email: string;
  discord: string;
  telegram: string;
  allowemailprev: boolean;
  allowemailcancel: boolean;
  allowemailnew: boolean;
  idUser: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  email: string;
  name: string;
  password: string;
  repeatpassword: string;
  allowemail: boolean;
}

export interface ChangePasswordFormData {
  oldpassword: string;
  password: string;
  repeatpassword: string;
}

export interface ProfileFormData {
  name: string;
  email: string;
  telegram: string;
  discord: string;
}

export interface NotificationFormData {
  allowemailprev: boolean;
  allowemailcancel: boolean;
  allowemailnew: boolean;
}

export interface userId {
  id: string;
}

export interface userName {
  name: string;
}

export interface WelcomeBannerProps {
  title: string;
  subtitle: string;
}

