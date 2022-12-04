import React, { useRef, useState } from "react";
import { getBySlug, getAllRecords } from "../../utils/api";
import Header from "../../components/Header";
import ContentSection from "../../components/ContentSection";
import Footer from "../../components/Footer";
import Head from "next/head";
import { useIsomorphicLayoutEffect } from "../../utils";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import BlogEditor from "../../components/BlogEditor";
import { useRouter } from "next/router";

const Awards = ({ award }) => {
    const [showEditor, setShowEditor] = useState(false);
    const textOne = useRef();
    const textTwo = useRef();
    const router = useRouter();

    useIsomorphicLayoutEffect(() => {
        stagger([textOne.current, textTwo.current], { y: 30 }, { y: 0 });
    }, []);

    return (
        <>
            <Head>
                <title>{"Research - " + award.title}</title>
                <meta name="description" content={award.preview} />
            </Head>
            <div className="container mx-auto mt-10">
                <Header isAwards={true} />
                <div className="mt-10 flex flex-col">
                    <img
                        className="w-full h-96 rounded-lg shadow-lg object-cover"
                        src={award.image}
                    ></img>
                    <h1
                        ref={textOne}
                        className="mt-10 text-4xl mob:text-2xl laptop:text-6xl text-bold"
                    >
                        {award.title}
                    </h1>
                    <h2
                        ref={textTwo}
                        className="mt-2 text-xl max-w-4xl text-darkgray opacity-50"
                    >
                        {award.tagline}
                    </h2>
                </div>
                <ContentSection content={award.content}></ContentSection>
                <Footer />
            </div>
            {process.env.NODE_ENV === "development" && (
                <div className="fixed bottom-6 right-6">
                    <Button onClick={() => setShowEditor(true)} type={"primary"}>
                        Edit this research
                    </Button>
                </div>
            )}

            {showEditor && (
                <BlogEditor
                    post={award}
                    close={() => setShowEditor(false)}
                    refresh={() => router.reload()}
                />
            )}
        </>
    );
};

export async function getStaticProps({ params }) {
    const award = getBySlug("awards", params.slug, [
        "date",
        "slug",
        "preview",
        "title",
        "tagline",
        "preview",
        "image",
        "content",
    ]);

    return {
        props: {
            award: {
                ...award,
            },
        },
    };
}

export async function getStaticPaths() {
    const awards = getAllRecords("awards", ["slug"]);

    return {
        paths: awards.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            };
        }),
        fallback: false,
    };
}
export default Awards;
