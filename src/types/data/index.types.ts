export interface IApiBanner {
  _id: string;
  thumbnail: string;
  description: string;
}

export interface IApiProduct {
  _id: string;
  name: string;
  total: number;
  description: string;
  thumbnail: string[];
  totalPurchases: number;
  product_brand: string;
  product_category: string;
  discount_percent: number;
  create_product: string;
  update_product: string;
  inventory: number;
  details: {
    connector: string[];
    card_graphics: string;
    cpu: string;
    hard_drive: string;
    pin: string;
    ram: string;
    screen: string;
    audio: string;
    brands: string;
    cam: string;
    keyboard: string;
    size: string;
    system: string;
    weight: string;
    wifi_bluetooth: string;
  };
  create_date: string;
}
export interface IApiMouse {
  _id: string;
  name: string;
  total: number;
  guarantee: string;
  description: string;
  totalPurchases: string | number;
  thumbnail: string[];
  details: {
    color: string;
    polling_rate: string;
    connector: string[];
    manufacturer: string;
    microprocessor: string;
    similar: string;
    battery: string;
    max_acceleration: string;
    max_speed: string;
    sensor: string;
    size: string;
    weight: string[];
    wireless_technology: string;
  };
  discount_percent: number;
  inventory: number;
  product_type__mouse: string;
  product_brand: string;
  product_content: string;
  create_date: string;
}
export interface IApiKeyboard {
  _id: string;
  name: string;
  total: number;
  thumbnail: string[];
  description: string;
  totalPurchases: string | number;
  layout: string;
  switch_key: string;
  pin?: null | string;
  personal: string;
  foam?: null | string;
  weight: string;
  size: string;
  connector: string[];
  configuration?: null | string;
  keycap: string;
  support: string;
  accessory: string;
  software: string;
  compatibility: string;
  discount_percent: number;
  inventory: number;
  product_type_keybourd: string;
  product_brand: string;
  create_date: string;
}

export interface IBrand {
  _id: string;
  name: string;
  description: string;
  type: string | string[];
  thumbnail: string;
}

export type TButtonAddToCart = {
  _id: number | string;
  name: string;
  thumbnail: string;
  description: string;
  total: number;
};
export type ProductCardProps = {
  data: IApiProduct[] | IApiKeyboard[] | IApiMouse[];
};
