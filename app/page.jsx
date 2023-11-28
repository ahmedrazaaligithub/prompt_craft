import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Inspired Creativity</span>
      </h1>
      <p className="desc text-center">
        Explore creativity at its best with PromptCraft! Our modern AI prompts
        are your key to innovative ideas and project excellence.
      </p>
      <Feed/>
    </section>
  );
};

export default Home;
