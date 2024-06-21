"use server";

import dbConnect from "@/app/lib/dbConnect";
import User from "@/models/User";
import { getSession } from "@/app/lib/session";
import {
  UserData,
  UserDataCreate,
  UserDataUpdate,
} from "@/app/lib/definitions";

export async function fetchusers() {
  try {
    await dbConnect();
    const users = await User.find({});
    if (!users) {
      return { success: false, message: "Usuario no encontrado" };
    }
    const usersData: UserData[] = users.map((n) => ({
      id: n._id.toString(),
      name: n.name,
      email: n.email,
      password: n.password,
      discord: n.discord,
      telegram: n.telegram,
      allowemailprev: n.allowemailprev,
      allowemailcancel: n.allowemailcancel,
      allowemailnew: n.allowemailnew,
    }));
    return { success: true, message: usersData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar usuarios" };
  }
}

export async function fetchuser() {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) {
      return { success: false, message: "Error al cargar usuario" };
    }
    const user = await User.findOne({ _id: session.userId });
    if (!user) {
      return { success: false, message: "Usuario no encontrado" };
    }
    const userData: UserData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      telegram: user.telegram,
      discord: user.discord,
      allowemailprev: user.allowemailprev,
      allowemailcancel: user.allowemailcancel,
      allowemailnew: user.allowemailnew,
    };
    return { success: true, message: userData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar usuario" };
  }
}

export async function fetchuserid(id: string) {
  try {
    await dbConnect();
    const user = await User.findById(id);
    if (!user) {
      return { success: false, message: "Usuario no encontrado" };
    }
    const userData: UserData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      discord: user.discord,
      telegram: user.telegram,
      allowemailprev: user.allowemailprev,
      allowemailcancel: user.allowemailcancel,
      allowemailnew: user.allowemailnew,
    };
    return { success: true, message: userData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar usuario" };
  }
}

export async function createuser(userData: UserDataCreate) {
  try {
    await dbConnect();
    // comprobar si el email ya está registrado
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      return { success: false, message: "El email ya está registrado" };
    }
    let profile = null;
    if (userData.idUser) {
      profile = await fetchuserid(userData.idUser);
      if (!(profile as { success: boolean; message: UserData }).success)
        profile = null;
    }
    const user = new User({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      discord: userData.discord,
      telegram: userData.telegram,
      allowemailprev: userData.allowemailprev,
      allowemailcancel: userData.allowemailcancel,
      allowemailnew: userData.allowemailnew,
    });
    await user.save();
    return { success: true, message: "Usuario creado" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al crear usuario" };
  }
}

export async function deleteuser(id: string) {
  try {
    await dbConnect();
    const user = await User.findById(id);
    const session = await getSession();
    if (!user) {
      return { success: false, message: "Usuario no encontrado" };
    }
    if (!session) {
      return { success: false, message: "Error al eliminar usuario" };
    }
    if (session.userId === id) {
      return { success: false, message: "No puedes eliminarte a ti mismo" };
    }
    await User.deleteOne({
      _id: id,
    });
    return { success: true, message: "Usuario eliminado" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al eliminar usuario" };
  }
}

export async function updateuser(id: string, userData: UserDataUpdate) {
  try {
    await dbConnect();
    const user = await User.findById(id);
    const session = await getSession();
    if (!user) {
      return { success: false, message: "Usuario no encontrado" };
    }
    if (!session) {
      return { success: false, message: "Error al actualizar usuario" };
    }
    if (session.userId === id) {
      return { success: false, message: "No puedes actualizarte a ti mismo" };
    }
    let profile = null;
    if (userData.idUser) {
      profile = await fetchuserid(userData.idUser);
      if (!(profile as { success: boolean; message: UserData }).success)
        profile = null;
    }
    await User.updateOne(
      { _id: id },
      {
        name: userData.name,
        email: userData.email,
        discord: userData.discord,
        telegram: userData.telegram,
        allowemailprev: userData.allowemailprev,
        allowemailcancel: userData.allowemailcancel,
        allowemailnew: userData.allowemailnew,
      }
    );
    return { success: true, message: "Usuario actualizado" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al actualizar usuario" };
  }
}
