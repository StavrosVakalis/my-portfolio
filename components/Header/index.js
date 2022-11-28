import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../Button";
// import Brightness7Rounded from '@mui/icons-material/Brightness7Rounded'
// import Brightness2Icon from '@mui/icons-material/Brightness2';
import { Avatar } from "@nextui-org/react";
// Data
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll = undefined, handleAboutScroll = undefined, isBlog = false, isAwards = false, isPublications = false }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { name, showBlog, showResume, showAwards, showPublications } = data;

  useEffect(() => {
    setMounted(true);
    setTheme("light");
  }, []);

  return (
    <>
      <Popover className="block tablet:hidden mt-5">
        {({ open }) => (
          <>
            <div className="flex items-center justify-center p-2 laptop:p-0">
              <h1
                onClick={() => router.push("/")}
                className="font-medium p-2 laptop:p-0 link"
              >
                {name}
              </h1>

              <div className="flex items-center">
                {/* {data.darkMode && (
                  <div className="p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 hover:bg-slate-600 text-white hover:scale-105 active:scale-100  tablet:first:ml-0 cursor-pointer">
                    <Brightness7Rounded onClick={() => setTheme(theme === "dark" ? "light" : "dark")} />
                  </div>
                )} */}
              </div>
            </div>
            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${theme === "dark" ? "bg-slate-600" : "bg-[#f5f5f5]"
                } shadow-md rounded-md`}
            >
              (
              <div className="grid grid-cols-1">
                <div className="pr-4 first:ml-1">
                  <Avatar
                    onClick={() => router.push("/")}
                    size={"xl"}
                    src="/avatar.jpg"
                  />
                </div>
                <Button onClick={() => router.push("/")}>Home</Button>
                {/* <Button onClick={() => router.push("/")} classes="first:ml-1">
                    Home
                  </Button> */}
                {showBlog && (
                  <Button onClick={() => router.push("/research")}>
                    Research
                  </Button>
                )}
                {
                  showAwards && (
                    <Button onClick={() => router.push("/awards")}>
                      Awards
                    </Button>
                  )
                }
                {
                  showPublications && (
                    <Button onClick={() => router.push("/publications")}>
                      Publications
                    </Button>
                  )
                }
                {showResume && (
                  <Button
                    onClick={() => router.push("/resume")}
                    classes="first:ml-1"
                  >
                    Resume
                  </Button>
                )}
                <Button
                  onClick={() => window.open("mailto:vakalis@usf.edu")}
                >
                  Contact
                </Button>
              </div>
              )
            </Popover.Panel>
          </>
        )}
      </Popover>
      <div
        className={`mt-10 hidden pt-2 flex-row items-center justify-between sticky ${theme === "light" && "bg-transparent"
          } dark:text-white top-0 z-10 tablet:flex`}
      >
        <h1
          onClick={() => router.push("/")}
          className="font-medium cursor-pointer mob:p-2 laptop:p-0"
        >
          {name}
        </h1>
        {(
          <div className="flex font-medium">
            <Avatar
              size={"xl"}
              src="/avatar.jpg"
            />
            <Button onClick={() => router.push("/")}>Home</Button>
            {showBlog && (
              <Button onClick={() => router.push("/research")}>Research</Button>
            )}
            {showResume && (
              <Button
                onClick={() => router.push("/resume")}
                classes="first:ml-1"
              >
                Resume
              </Button>
            )}
            {
              showAwards && (
                <Button onClick={() => router.push("/awards")}>
                  Awards
                </Button>
              )
            }
            {
              showPublications && (
                <Button onClick={() => router.push("/publications")}>
                  Publications
                </Button>
              )
            }
            <Button onClick={() => window.open("mailto:vakalis@usf.edu")}>
              Contact
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
