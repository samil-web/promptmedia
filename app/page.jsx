import Feed from "@components/Feed"
const Home = () => {
    return (
        <section className="w-full flex-col flex-center">
            <h1 className="head_text text-center">Discover & Share</h1>
            <br className="max-md:hidden" />
            <h2 className="orange_gradient head_text text-center">AI-Powered Prompts</h2>
            <p className="desc text-center">Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts</p>

            {/*Feed*/}
            <Feed />
        </section>

    )
}

export default Home