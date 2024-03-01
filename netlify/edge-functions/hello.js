// export default () => new Response("Hello world");
export default async () => {
    return new Response("Hello, World!", {
      headers: { "content-type": "text/html" }
    });
  };
  
export const config = { path: "/test" };