import { Container } from "@/components/layout/Container";

export const getStaticProps = async (ctx) => {
  return {
    props: {
      noWrappers: true,
    },
  };
};

export default function PageNotAvailable() {
  return (
    <>
      <header className="bg-black text-white-fg px-8 py-6">
        <h1 className="text-h3 uppercase">Neptune Mutual</h1>
      </header>
      <Container className="py-28">
        <img
          src="/unavailable.png"
          alt="Access Denied"
          className="block w-52 h-52 mx-auto"
        />
        <h2 className="text-h3 leading-10 font-sora font-bold text-center my-6">
          Oops, Neptune Mutual is not available in your region
        </h2>
        <p className="text-dimmed-fg text-center mt-2">
          Enter your email and we will notify when Neptune Mutual is available
        </p>
        <form className="mt-6 max-w-md mx-auto">
          <input
            type="email"
            name="email"
            id="email"
            required
            className="block w-full py-3 pl-4 border border-ash-border rounded-lg"
            placeholder="Enter email address"
          />
          <button
            type="submit"
            className="bg-primary text-white-fg uppercase text-h5 font-bold mt-6 py-5 px-10 block w-full rounded-lg"
          >
            subscribe
          </button>
        </form>
      </Container>
    </>
  );
}