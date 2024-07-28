import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  return (
    <>
      <nav className="bg-background w-full flex relative justify-between items-center mx-auto px-8 h-20">
        <div className="inline-flex">
          <a className="_o6689fn" href="/">
            <div>
              <svg
                className="fill-black/85 dark:fill-white/75"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#000"
                version="1.1"
                viewBox="0 0 412 412"
                xmlSpace="preserve"
              >
                <path d="M206 0C92.411 0 0 92.411 0 206s92.411 206 206 206 206-92.411 206-206S319.589 0 206 0zm0 380c-95.944 0-174-78.057-174-174 0-95.944 78.056-174 174-174s174 78.056 174 174c0 95.943-78.056 174-174 174z"></path>
                <path d="M206 80c-69.477 0-126 56.523-126 126s56.523 126 126 126c23.45 0 45.42-6.447 64.243-17.65l-8.818-9.138a18.104 18.104 0 01-4.096 5.92 18.174 18.174 0 01-12.684 5.119c-7.452-.022-14.061-4.458-16.885-11.3l-2.833-6.866A94.069 94.069 0 01206 300c-51.832 0-94-42.168-94-94s42.168-94 94-94 94 42.168 94 94a93.91 93.91 0 01-2.486 21.508l7.137 3.246a18.22 18.22 0 0110.692 17.235 18.22 18.22 0 01-11.632 16.418l8.691 9.008C324.806 253.908 332 230.779 332 206c0-69.477-56.523-126-126-126z"></path>
                <path d="M206.836 188.056c2.619 0 5.157.549 7.543 1.63l29.5 13.421C242.398 183.473 226.012 168 206 168c-20.987 0-38 17.013-38 38 0 19.822 15.18 36.092 34.548 37.837l-12.602-30.546c-2.879-6.977-1.229-14.873 4.205-20.114a18.168 18.168 0 0112.685-5.121z"></path>
                <path d="M278.439 258.434l21.138-7.991a3.277 3.277 0 002.109-2.951 3.267 3.267 0 00-1.912-3.082l-90.251-41.06a3.272 3.272 0 00-3.624.625 3.266 3.266 0 00-.752 3.597l37.815 91.657a3.26 3.26 0 003.011 2.022 3.27 3.27 0 003.024-2.005l8.741-20.84 32.472 33.649a3.266 3.266 0 004.621.082l15.995-15.435a3.266 3.266 0 00.081-4.621l-32.468-33.647z"></path>
              </svg>
            </div>
          </a>
        </div>

        <div className="flex-initial">
          <div className="flex justify-end items-center relative">
            <div className="flex mr-4 items-center">
              <a
                className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full"
                href="#"
              ></a>
              <div className="block relative">
                <div
                  className="py-2 px-3 relative "
                >
                {/* <button
                  className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full relative "
                > */}
                  <div className="flex items-center h-5">
                    <div className="_xpkakx">
                      <ModeToggle />
                    </div>
                  </div>
                </div>
                {/* </button> */}
              </div>
            </div>

            <div className="block">
              <div className="inline relative">
                <button
                  type="button"
                  className="inline-flex items-center relative px-2 border rounded-full hover:shadow-sm"
                >
                  <div className="pl-1">
                    <svg
                      className="fill-black/85 dark:fill-white/75 w-4 h-4 mr-0"
                      fill="#000000"
                      width="16px"
                      height="16px"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        id="Group_15"
                        data-name="Group 15"
                        transform="translate(-237.999 -393.695)"
                      >
                        <rect
                          id="Rectangle_42"
                          data-name="Rectangle 42"
                          width={32}
                          height={4}
                          transform="translate(237.999 393.695)"
                        />
                        <rect
                          id="Rectangle_43"
                          data-name="Rectangle 43"
                          width={32}
                          height={4}
                          transform="translate(237.999 407.695)"
                        />
                        <rect
                          id="Rectangle_44"
                          data-name="Rectangle 44"
                          width={32}
                          height={4}
                          transform="translate(237.999 421.695)"
                        />
                      </g>
                    </svg>
                  </div>

                  <div className="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-5">
                    <svg
                      className="fill-black/85 dark:fill-white/75"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      style={{
                        display: "block",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end login --> */}
      </nav>
    </>
  )
}
