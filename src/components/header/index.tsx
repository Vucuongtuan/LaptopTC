import { Container } from "@mui/material";
import { IMenuItem } from "@/types/ui/index.types";
import NavBar from "./navbar";
const menuLaptop: IMenuItem[] = [
  {
    id: 1,
    href: "/product/laptop?hang=Asus&id_brand=658a6f57a729dca615ea5d08",
    title: "Asus",
    models: ["Asus ROG", "Asus TUF", "Zenbook", "Zepherus"],
  },
  {
    id: 2,
    href: "/product/laptop?hang=Acer&id_brand=658a701fa729dca615ea5d09",
    title: "Acer",
    models: ["Acer Nitro", "Swift", "Aspire", "Predator"],
  },
  {
    id: 3,
    href: "/product/laptop?hang=Lenovo&id_brand=658a70eca729dca615ea5d0c",
    title: "Lenovo",
    models: ["Legion Gaming", "Yoga", "ThinkPad", "ThinkBook"],
  },
  {
    id: 4,
    href: "/product/laptop/gigabyte",
    title: "Gigabyte",
    models: ["Gigabyte Gaming G", "Gigabyte Gaming A"],
  },
  {
    id: 5,
    href: "/product/laptop?hang=MSI&id_brand=658a712ea729dca615ea5d0d",
    title: "MSI",
    models: ["Prestige", "MSI Gaming", "Modern"],
  },
  {
    id: 6,
    href: "/product/laptop?hang=HP&id_brand=658a70baa729dca615ea5d0b",
    title: "HP",
    models: ["Envy", "Victus", "ProBook", "Pavilion"],
  },
  {
    id: 7,
    href: "/product/laptop/dell",
    title: "Dell",
    models: ["Inspiron", "G15", "Alienware"],
  },
  {
    id: 8,
    href: "/product/laptop?hang=Apple&id_brand=65e72c32132ad64c06821434",
    title: "Apple",
    models: ["Macbook", "Macbook Air", "Macbook Pro"],
  },
];
const menuMouse: IMenuItem[] = [
  {
    id: 1,
    href: "/product/chuot/asus",
    title: "Chuột Asus",
    models: ["Chuột Asus ROG", "Chuột Asus TUF"],
  },
  {
    id: 2,
    href: "/product/chuot/logitech",
    title: "Chuột Logitech",
    models: ["Chuột Logitech G Pro", "Chuột Logitech M"],
  },
  {
    id: 3,
    href: "/product/chuot/razer ",
    title: "Chuột Razer ",
    models: [
      "Chuột Razer  Basilisk ",
      "Chuột Razer  Orochi ",
      "Chuột Razer  Cobra Pro",
    ],
  },
  {
    id: 4,
    href: "/product/chuot/corsair",
    title: "Chuột Corsair",
    models: ["Chuột Sabre ", "Chuột Gigabyte Katar "],
  },
];

const Header = () => {
  return (
    <header className="w-full h-[90px]  shadow-lg  text-black sm:h-[60px]">
      <Container>
        <NavBar menuLaptop={menuLaptop} menuMouse={menuMouse} />
      </Container>
    </header>
  );
};

export default Header;
