const Footer = (): JSX.Element => {
  return (
    <footer className="px-16 sm:px-2">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-6 gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          <div className="col-span-2">
            <div className="text-teal-600">
              <span className="text-4xl font-semibold">VTC Computer</span>
            </div>

            <p className="mt-4 max-w-xs text-gray-500">
              Chuyên mua bán các sản phẩm laptop,chuột ,bàn phím và các linh
              kiện laptop khác
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">Facebook</span>
                  {/* <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                    </svg> */}
                </a>
              </li>
              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">Instagram</span>
                  {/* <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                    </svg> */}
                </a>
              </li>
              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">Twitter</span>
                  {/* <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                    </svg> */}
                </a>
              </li>
              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">GitHub</span>
                  {/* <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                    </svg> */}
                </a>
              </li>
              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">Dribbble</span>
                  {/* <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                    </svg> */}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-4 grid grid-cols-4 gap-8 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-2 md:grid-rows-2">
            <div>
              <p className="font-medium text-gray-900">Liên kết</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Laptop{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Chuột{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Bàn phím{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Linh kiện máy tính{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Tin tức công nghệ{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Công ty</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    About{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Góp ý & khiếu nại{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Tuyển dụng{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Liên hệ</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Contact{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    FAQs{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Live Chat{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Địa chỉ Cửa hàng</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>none</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          &copy; 2022. Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
