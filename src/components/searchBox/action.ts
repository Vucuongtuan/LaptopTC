export default async function ActionSearch() {
  const data = await fetch("https://vtc-be-laptop.onrender.com/all-product", {
    method: "GET",
  });
  return data;
}
