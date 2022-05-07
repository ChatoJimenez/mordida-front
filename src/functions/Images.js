import bebidaImg from "../assets/bebida.png";
import complementoImg from "../assets/complemento.png";
import desayunoImg from "../assets/desayuno.png";
import tortaImg from "../assets/torta.png";
import createImg from "../assets/plus.png";
import totalImg from "../assets/money.png";
import editImg from "../assets/edit.png";
import dayImg from "../assets/day.png";
import monthImg from "../assets/month.png";
import menuImg from "../assets/menu.png";
import adminImg from "../assets/admin.png";

const images = {
  admin: adminImg,
  beverage: bebidaImg,
  complement: complementoImg,
  menu: menuImg,
  food: desayunoImg,
  torta: tortaImg,
  create: createImg,
  total: totalImg,
  edit: editImg,
  today: dayImg,
  month: monthImg,
};

const getImageByType = (product) => {
  return images[product.type];
};

const getImageByRoute = (route) => {
  return images[route];
};

export { getImageByType, getImageByRoute };
