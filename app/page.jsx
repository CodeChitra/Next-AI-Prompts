import Feed from "@components/Feed";

const Home = () => {

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Promptly AI
        <br />
        <span className="purple_gradient text-center">
          Your Portal to Infinite Creativity!
        </span>
      </h1>
      <p className="desc text-center">
        Dive into a World of AI-Powered Creativity with Our Prompt Playground – Where Curiosity and Technology Collide!
      </p>

      <Feed />
    </section>
  )
}

export default Home;
