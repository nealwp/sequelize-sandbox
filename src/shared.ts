import { Request, Router } from 'express';

function getHATEOSLinks(req: Request, router: Router) {
    const links: { href: string, rel: string }[] = [];
    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
    router.stack.forEach((layer) => {
        if (!layer.route) {
            return
        }
        const path = layer.route.path;
        // @ts-expect-error  methods exists on route, idk why it says it doesnt
        const methods = Object.keys(layer.route.methods);
        methods.forEach(method => {
            links.push({
                rel: `${method.toUpperCase()} ${path}`,
                href: `${baseUrl}${path}`
            })
        })
    });

    return links;
}

export default { getHATEOSLinks };
