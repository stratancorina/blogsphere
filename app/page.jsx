import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
      Welcome to
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> BlogSphere</span>
      </h1>
      <p className="desc text-center">
      BlogSphere is your ultimate destination to explore insights, share stories, and engage with a community of passionate writers. From creative writing to in-depth articles, this is where ideas come to life.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
