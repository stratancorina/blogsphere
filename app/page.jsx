import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
      Hi and welcome to      
        <span className="blue_gradient text-center"> BlogSphere</span>
        <br className="max-md:hidden" />
      </h1>
      <p className="desc text-center">
      Dive deep into my thoughts, stories and ideas.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
