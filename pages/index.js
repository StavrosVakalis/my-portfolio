import { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
// import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Link from "next/link";
import Button from "../components/Button/index";
// Data
import data from "../data/portfolio.json";
import { ISOToDate, useIsomorphicLayoutEffect } from "../utils/";
import { getAllRecords } from "../utils/api";
import { useRouter } from "next/router";

export async function getStaticProps() {
  const posts = getAllRecords(
    "posts"
    , [
      "slug",
      "title",
      "image",
      "preview",
      "author",
      "date",
    ]);

  const awards = getAllRecords(
    "awards"
    , [
      "slug",
      "title",
      "image",
      "preview",
      "author",
      "date",
    ]);

  const publications = getAllRecords(
    "publications"
    , [
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
      awards: [...awards],
      publications: [...publications]
    },
  };
}
export default function Home({ posts, awards, publications }) {
  // const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();
  const text = useRef();
  const [mounted, setMounted] = useState(false);
  const Router = useRouter();


  // // Handling Scroll
  // const handleWorkScroll = () => {
  //   window.scrollTo({
  //     top: workRef.current.offsetTop,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // };

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
      {
        process.env.NODE_ENV === 'development' ?
          <div className="fixed bottom-5 right-5">
            <Link legacyBehavior href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div> :
          <></>
      }
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          // handleWorkScroll={handleWorkScroll}
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
            {data.headerTaglineTwo ?
              <h1
                ref={textTwo}
                className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5 select-none"
              >
                {data.headerTaglineTwo}
              </h1> :
              <></>
            }
          </div>

          <Socials className="mt-2 laptop:mt-5" />
        </div>


        <div className="mt-10 laptop:mt-20 p-2 laptop:p-0" ref={aboutRef}>
          <h1 className="tablet:m-10 text-2xl text-bold">About.</h1>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
            {data.aboutpara}
          </p>
        </div>

        {/* Research section */}
        <>
          <div className="container mx-auto mb-20 mt-20">
            <div className="mt-10">
              <h1
                ref={text}
                className="tablet:m-10 text-2xl text-bold"
              >
                Research Preview.
              </h1>
              <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
                {posts &&
                  posts.map((post, idx) => {
                    if (idx > 2) return
                    return (
                      <div
                        className="cursor-pointer relative hover:scale-95 active:scale-100 transition-all"
                        key={post.slug}
                        onClick={() => Router.push(`/research/${post.slug}`)}
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

        {/* Awards section */}
        <>
          <div className="container mx-auto mb-20 mt-20">
            <div className="mt-10">
              <h1
                ref={text}
                className="tablet:m-10 text-2xl text-bold"
              >
                Awards Preview.
              </h1>
              <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
                {awards &&
                  awards.map((a, idx) => {
                    if (idx > 2) return
                    return (
                      <div
                        className="cursor-pointer relative hover:scale-95 active:scale-100 transition-all"
                        key={a.slug}
                        onClick={() => Router.push(`/awards/${a.slug}`)}
                      >
                        <img
                          className="w-full h-60 rounded-lg shadow-lg object-cove"
                          src={a.image}
                          alt={a.title}
                        ></img>
                        <h2 className="mt-5 text-4xl">{a.title}</h2>
                        <p className="mt-2 opacity-50 text-lg">{a.preview}</p>
                        <span className="text-sm mt-5 opacity-25">
                          {ISOToDate(a.date)}
                        </span>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </>


        {/* Publications section */}
        <>
          <div className="container mx-auto mb-20 mt-20">
            <div className="mt-10">
              <h1
                ref={text}
                className="tablet:m-10 text-2xl text-bold"
              >
                Research Preview.
              </h1>
              <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
                {publications &&
                  publications.map((p, idx) => {
                    if (idx > 2) return
                    return (
                      <div
                        className="cursor-pointer relative hover:scale-95 active:scale-100 transition-all"
                        key={p.slug}
                        onClick={() => Router.push(`/publications/${p.slug}`)}
                      >
                        <img
                          className="w-full h-60 rounded-lg shadow-lg object-cover"
                          src={p.image}
                          alt={p.title}
                        ></img>
                        <h2 className="mt-5 text-4xl">{p.title}</h2>
                        <p className="mt-2 opacity-50 text-lg">{p.preview}</p>
                        <span className="text-sm mt-5 opacity-25">
                          {ISOToDate(p.date)}
                        </span>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </>

        {/* <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
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
        </div> */}

        <Footer />
      </div>
    </div>
  );
}
