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

const Publications = ({ publications }) => {
    const showPublications = useRef(data.showPublications);
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
        if (showPublications.current) stagger([text.current], { y: 30 }, { y: 0 });
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
                <title>Publications</title>
            </Head>
            <div className="container mx-auto mb-10">
                <Header isPublications={true}></Header>
                <div className="mt-10">
                    <h1
                        ref={text}
                        className="mx-auto mob:p-2 text-bold text-6xl laptop:text-8xl w-full"
                    >
                        Publications.
                    </h1>
                    <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
                        {publications &&
                            publications.map((publication) => (
                                <div
                                    className="cursor-pointer relative"
                                    key={publication.slug}
                                    onClick={() => Router.push(`/publications/${publication.slug}`)}
                                >
                                    <img
                                        className="w-full h-60 rounded-lg shadow-lg object-cover"
                                        src={publication.image}
                                        alt={publication.title}
                                    ></img>
                                    <h2 className="mt-5 text-4xl">{publication.title}</h2>
                                    <p className="mt-2 opacity-50 text-lg">{publication.preview}</p>
                                    <span className="text-sm mt-5 opacity-25">
                                        {ISOToDate(publication.date)}
                                    </span>
                                    {process.env.NODE_ENV === "development" && mounted && (
                                        <div className="absolute top-0 right-0">
                                            {session.status !== 'authenticated' ?
                                                <></> :
                                                <Button
                                                    onClick={(e) => {
                                                        deletePublication(publication.slug);
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
                                Add New Publication +{" "}
                            </Button>}
                    </div>
                )
            }
        </React.Fragment >
    )
}

export async function getStaticProps() {
    const publications = getAllRecords(
        "publications",
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
            publications: [...publications],
        },
    };
}

export default Publications;