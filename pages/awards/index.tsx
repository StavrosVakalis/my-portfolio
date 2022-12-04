import { useSession } from "next-auth/react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import Header from "../../components/Header";
import data from "../../data/portfolio.json";
import { ISOToDate, useIsomorphicLayoutEffect } from "../../utils";
import { getAllRecords } from "../../utils/api";

const Awards = ({ awards }) => {
    const showAwards = useRef(data.showAwards);
    const text = useRef();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const session = useSession();

    useIsomorphicLayoutEffect(() => {
        stagger(
            [text.current],
            { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
            { y: 0, x: 0, transform: "scale(1)" }
        );
        if (showAwards.current) stagger([text.current], { y: 30 }, { y: 0 });
        else router.push("/");
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    const createPublication = () => {
        if (process.env.NODE_ENV === "development") {
            fetch("/api/research", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(() => {
                // router.reload(window.location.pathname);
                router.reload();
            });
        } else {
            alert("This thing only works in development mode.");
        }
    };

    const deletePublication = (slug) => {
        if (process.env.NODE_ENV === "development") {
            fetch("/api/research", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    slug,
                }),
            }).then(() => {
                // router.reload(window.location.pathname);
                router.reload();
            });
        } else {
            alert("This thing only works in development mode.");
        }
    };
    return (
        <React.Fragment>
            <Head>
                <title>Awards</title>
            </Head>
            <div className="container mx-auto mb-10">
                <Header isAwards={true}></Header>
                <div className="mt-10">
                    <h1
                        ref={text}
                        className="mx-auto mob:p-2 text-bold text-6xl laptop:text-8xl w-full"
                    >
                        Awards.
                    </h1>
                    <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 justify-between gap-10">
                        {awards &&
                            awards.map((award) => (
                                <div
                                    className="cursor-pointer relative"
                                    key={award.slug}
                                    onClick={() => Router.push(`/awards/${award.slug}`)}
                                >
                                    <img
                                        className="w-full h-60 rounded-lg shadow-lg object-cover"
                                        src={award.image}
                                        alt={award.title}
                                    ></img>
                                    <h2 className="mt-5 text-4xl">{award.title}</h2>
                                    <p className="mt-2 opacity-50 text-lg">{award.preview}</p>
                                    <span className="text-sm mt-5 opacity-25">
                                        {ISOToDate(award.date)}
                                    </span>
                                    {process.env.NODE_ENV === "development" && mounted && (
                                        <div className="absolute top-0 right-0">
                                            {session.status !== 'authenticated' ?
                                                <></> :
                                                <Button
                                                    onClick={(e) => {
                                                        deletePublication(award.slug);
                                                        e.stopPropagation();
                                                    }}
                                                    type={"primary"}
                                                >
                                                    Delete
                                                </Button>}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            {
                process.env.NODE_ENV === "development" && mounted && (
                    <div className="fixed bottom-6 right-6">
                        {session.status !== 'authenticated' ?
                            <></> :
                            <Button onClick={createPublication} type={"primary"}>
                                Add New Award +{" "}
                            </Button>}
                    </div>
                )
            }
        </React.Fragment >
    )
}

export async function getStaticProps() {
    const awards = getAllRecords(
        "awards",
        [
            "slug",
            "title",
            "image",
            "preview",
            "author",
            "date",
        ]);

    return {
        props: {
            awards: [...awards],
        },
    };
}

export default Awards;