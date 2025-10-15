import { getDataLaptop } from "@/api/product/index.api";
import FormAdd from "./formAdd";

async function InsertProduct() {
  const { data } = await getDataLaptop(1);
  return (
    <main className="h-auto">
      <nav
        className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
        navbar-main
        navbar-scroll="true"
      >
        <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
          <nav>
            <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
              <li className="text-sm leading-normal">
                <a className="opacity-50 text-slate-700" href="javascript:;">
                  Pages
                </a>
              </li>
              <li
                className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']"
                aria-current="page"
              >
                Laptop
              </li>
            </ol>
            <h1 className="text-2xl py-2">Thêm sản phẩm Laptop</h1>
          </nav>
        </div>
      </nav>
      <div className="w-full px-2 h-auto">
        <FormAdd />
      </div>
    </main>
  );
}

export default InsertProduct;
