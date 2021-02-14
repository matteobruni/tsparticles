import type { Container, ICoordinates, IDimension, IParticle } from "tsparticles-core";
import { Circle, CircleWarp, getDistance, getLinkRandomColor, ParticlesInteractorBase } from "tsparticles-core";
import { LinkParticle } from "./LinkParticle";

function getLinkDistance(
    pos1: ICoordinates,
    pos2: ICoordinates,
    optDistance: number,
    canvasSize: IDimension,
    warp: boolean
): number {
    let distance = getDistance(pos1, pos2);

    if (!warp || distance <= optDistance) {
        return distance;
    }

    const pos2NE = {
        x: pos2.x - canvasSize.width,
        y: pos2.y,
    };

    distance = getDistance(pos1, pos2NE);

    if (distance <= optDistance) {
        return distance;
    }

    const pos2SE = {
        x: pos2.x - canvasSize.width,
        y: pos2.y - canvasSize.height,
    };

    distance = getDistance(pos1, pos2SE);

    if (distance <= optDistance) {
        return distance;
    }

    const pos2SW = {
        x: pos2.x,
        y: pos2.y - canvasSize.height,
    };

    distance = getDistance(pos1, pos2SW);

    return distance;
}

export class Linker extends ParticlesInteractorBase {
    constructor(container: Container) {
        super(container, "links");
    }

    public isEnabled(particle: IParticle): boolean {
        return particle.options.links.enable;
    }

    public reset(): void {
        // do nothing
    }

    public interact(p1: LinkParticle): void {
        p1.links = [];

        const pos1 = p1.getPosition();
        const container = this.container;
        const canvasSize = container.canvas.size;

        if (pos1.x < 0 || pos1.y < 0 || pos1.x > canvasSize.width || pos1.y > canvasSize.height) {
            return;
        }

        const linkOpt1 = p1.options.links;
        const optOpacity = linkOpt1.opacity;
        const optDistance = p1.linksDistance ?? container.retina.linksDistance;
        const warp = linkOpt1.warp;
        const range = warp
            ? new CircleWarp(pos1.x, pos1.y, optDistance, canvasSize)
            : new Circle(pos1.x, pos1.y, optDistance);

        const query = container.particles.quadTree.query(range) as LinkParticle[];

        for (const p2 of query) {
            const linkOpt2 = p2.options.links;

            if (p1 === p2 || p2.spawning || p2.destroyed || !linkOpt2.enable || linkOpt1.id !== linkOpt2.id) {
                continue;
            }

            const pos2 = p2.getPosition();

            if (pos2.x < 0 || pos2.y < 0 || pos2.x > canvasSize.width || pos2.y > canvasSize.height) {
                continue;
            }

            const distance = getLinkDistance(pos1, pos2, optDistance, canvasSize, warp && linkOpt2.warp);

            if (distance > optDistance) {
                return;
            }

            /* draw a line between p1 and p2 */
            const opacityLine = (1 - distance / optDistance) * optOpacity;

            this.setColor(p1);

            if (
                p2.links.map((t) => t.destination).indexOf(p1) === -1 &&
                p1.links.map((t) => t.destination).indexOf(p2) === -1
            ) {
                p1.links.push({
                    destination: p2,
                    opacity: opacityLine,
                });
            }
        }
    }

    private setColor(p1: IParticle): void {
        const container = this.container;
        const linksOptions = p1.options.links;

        let linkColor =
            linksOptions.id === undefined
                ? container.particles.linksColor
                : container.particles.linksColors.get(linksOptions.id);

        if (!linkColor) {
            const optColor = linksOptions.color;

            linkColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);

            if (linksOptions.id === undefined) {
                container.particles.linksColor = linkColor;
            } else {
                container.particles.linksColors.set(linksOptions.id, linkColor);
            }
        }
    }
}
