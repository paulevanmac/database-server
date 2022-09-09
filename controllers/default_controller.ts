async function defaultController(_request: Request): Promise<Response> {
    const body = `Hello, World!`;
    return await new Promise<Response>((resolve) => {
        resolve(new Response(body, { status: 200 }));
    });
}

export { defaultController };
