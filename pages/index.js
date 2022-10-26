import { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Link from "next/link";
import Button from "../components/Button/index";
// Data
import data from "../data/portfolio.json";
import { ISOToDate, useIsomorphicLayoutEffect } from "../utils/";
import { getAllPosts } from "../utils/api";

export async function getStaticProps() {
  const posts = getAllPosts([
    "slug",
    "title",
    "image",
    "preview",
    "author",
    "date",
  ]);

  return {
    props: {
      posts: [...posts],
    },
  };
}
export default function Home({ posts }) {
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();
  const text = useRef();
  const [mounted, setMounted] = useState(false);


  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [text.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative">
      <Head>
        <title>{data.name}</title>
      </Head>
      <div className="fixed bottom-5 right-5">
        <Link legacyBehavior href="/edit">
          <Button type="primary">Edit Data</Button>
        </Link>
      </div>
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10 ">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5 select-none"
            >
              {data.headerTaglineOne}
            </h1>
            <h1
              ref={textTwo}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5 select-none"
            >
              {data.headerTaglineTwo}
            </h1>
            <h1
              ref={textThree}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5 select-none"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5 select-none"
            >
              {data.headerTaglineFour}
            </h1>
          </div>

          <Socials className="mt-2 laptop:mt-5" />
        </div>
        {/* <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <h1 className="text-2xl text-bold">Work.</h1>
          <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
            {data.projects.map((project) => (
              <WorkCard
                key={project.id}
                img={project.imageSrc}
                name={project.title}
                description={project.description}
              />
            ))}
          </div>
        </div> */}

        <>
          <div className="container mx-auto mb-10">
            <div className="mt-10">
              <h1
                ref={text}
                className="tablet:m-10 text-2xl text-bold"
              >
                Research Projects.
              </h1>
              <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
                {posts &&
                  posts.map((post, idx) => {
                    if (idx > 2) return
                    return (
                      <div
                        className="cursor-pointer relative"
                        key={post.slug}
                        onClick={() => Router.push(`/blog/${post.slug}`)}
                      >
                        <img
                          className="w-full h-60 rounded-lg shadow-lg object-cover"
                          src={post.image}
                          alt={post.title}
                        ></img>
                        <h2 className="mt-5 text-4xl">{post.title}</h2>
                        <p className="mt-2 opacity-50 text-lg">{post.preview}</p>
                        <span className="text-sm mt-5 opacity-25">
                          {ISOToDate(post.date)}
                        </span>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
          {process.env.NODE_ENV === "development" && mounted && (
            <div className="fixed bottom-6 right-6">
              {process.env.NODE_ENV === "development" ?
                <></> :
                <Button onClick={createBlog} type={"primary"}>
                  Add New Post +{" "}
                </Button>}
            </div>
          )}
        </>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="tablet:m-10 text-2xl text-bold">Experience.</h1>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
          <h1 className="tablet:m-10 text-2xl text-bold">About.</h1>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
            {data.aboutpara}
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
