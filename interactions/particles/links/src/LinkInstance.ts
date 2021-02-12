import {
    colorToRgb,
    getDistance,
    getLinkColor,
    ILink,
    IParticle,
    Container,
    IContainerPlugin,
    IDelta,
    Particle,
    drawLinkTriangle,
    drawLinkLine,
    IRgb,
} from "tsparticles-core";

export class LinkInstance implements IContainerPlugin {
    constructor(private readonly container: Container) {}

    drawParticle(context: CanvasRenderingContext2D, particle: Particle, delta: IDelta): void {
        const container = this.container;
        const particles = container.particles;
        const pOptions = particle.options;

        if (particle.links.length > 0) {
            context.save();
            const p1Links = particle.links.filter((l) => {
                const linkFreq = container.particles.getLinkFrequency(particle, l.destination);

                return linkFreq <= pOptions.links.frequency;
            });

            for (const link of p1Links) {
                const p2 = link.destination;

                if (pOptions.links.triangles.enable) {
                    const links = p1Links.map((l) => l.destination);
                    const vertices = p2.links.filter((t) => {
                        const linkFreq = container.particles.getLinkFrequency(p2, t.destination);

                        return linkFreq <= p2.options.links.frequency && links.indexOf(t.destination) >= 0;
                    });

                    if (vertices.length) {
                        for (const vertex of vertices) {
                            const p3 = vertex.destination;
                            const triangleFreq = particles.getTriangleFrequency(particle, p2, p3);

                            if (triangleFreq > pOptions.links.triangles.frequency) {
                                continue;
                            }

                            this.drawLinkTriangle(context, particle, link, vertex);
                        }
                    }
                }

                if (link.opacity > 0 && container.retina.linksWidth > 0) {
                    this.drawLinkLine(context, particle, link);
                }
            }

            context.restore();
        }
    }

    private drawLinkTriangle(ctx: CanvasRenderingContext2D, p1: IParticle, link1: ILink, link2: ILink): void {
        const container = this.container;
        const options = container.options;
        const p2 = link1.destination;
        const p3 = link2.destination;
        const triangleOptions = p1.options.links.triangles;
        const opacityTriangle = triangleOptions.opacity ?? (link1.opacity + link2.opacity) / 2;

        if (opacityTriangle <= 0) {
            return;
        }

        const pos1 = p1.getPosition();
        const pos2 = p2.getPosition();
        const pos3 = p3.getPosition();

        if (!ctx) {
            return;
        }

        if (
            getDistance(pos1, pos2) > container.retina.linksDistance ||
            getDistance(pos3, pos2) > container.retina.linksDistance ||
            getDistance(pos3, pos1) > container.retina.linksDistance
        ) {
            return;
        }

        let colorTriangle = colorToRgb(triangleOptions.color);

        if (!colorTriangle) {
            const linksOptions = p1.options.links;
            const linkColor =
                linksOptions.id !== undefined
                    ? container.particles.linksColors.get(linksOptions.id)
                    : container.particles.linksColor;

            colorTriangle = getLinkColor(p1, p2, linkColor);
        }

        if (!colorTriangle) {
            return;
        }

        drawLinkTriangle(
            ctx,
            pos1,
            pos2,
            pos3,
            options.backgroundMask.enable,
            options.backgroundMask.composite,
            colorTriangle,
            opacityTriangle
        );
    }

    private drawLinkLine(ctx: CanvasRenderingContext2D, p1: IParticle, link: ILink): void {
        const container = this.container;
        const options = container.options;
        const p2 = link.destination;
        let opacity = link.opacity;
        const pos1 = p1.getPosition();
        const pos2 = p2.getPosition();

        if (!ctx) {
            return;
        }

        let colorLine: IRgb | undefined;

        /*
         * particles connecting line color:
         *
         *  random: in blink mode : in every frame refresh the color would change
         *          hence resulting blinking of lines
         *  mid: in consent mode: sample particles color and get a mid level color
         *                        from those two for the connecting line color
         */

        const twinkle = p1.options.twinkle.lines;

        if (twinkle.enable) {
            const twinkleFreq = twinkle.frequency;
            const twinkleRgb = colorToRgb(twinkle.color);
            const twinkling = Math.random() < twinkleFreq;

            if (twinkling && twinkleRgb !== undefined) {
                colorLine = twinkleRgb;
                opacity = twinkle.opacity;
            }
        }

        if (!colorLine) {
            const linksOptions = p1.options.links;
            const linkColor =
                linksOptions.id !== undefined
                    ? container.particles.linksColors.get(linksOptions.id)
                    : container.particles.linksColor;

            colorLine = getLinkColor(p1, p2, linkColor);
        }

        if (!colorLine) {
            return;
        }

        const width = p1.linksWidth ?? container.retina.linksWidth;
        const maxDistance = p1.linksDistance ?? container.retina.linksDistance;

        drawLinkLine(
            ctx,
            width,
            pos1,
            pos2,
            maxDistance,
            container.canvas.size,
            p1.options.links.warp,
            options.backgroundMask.enable,
            options.backgroundMask.composite,
            colorLine,
            opacity,
            p1.options.links.shadow
        );
    }
}
